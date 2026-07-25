import React, { useState } from 'react';
import { Settings as SettingsIcon, Building, MapPin, Mail, Shield, Save } from 'lucide-react';
import { CompanyOverview } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskFileNum } from '../utils/privacy';

interface SettingsViewProps {
  company: CompanyOverview;
  onUpdateCompany: (updated: Partial<CompanyOverview>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  company,
  onUpdateCompany,
}) => {
  const { privacyMode } = usePrivacy();
  const [name, setName] = useState(company.name);
  const [delawareFile, setDelawareFile] = useState(company.delawareFileNumber);
  const [agentName, setAgentName] = useState(company.registeredAgent.name);
  const [agentAddress, setAgentAddress] = useState(company.registeredAgent.address);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompany({
      name,
      delawareFileNumber: delawareFile,
      registeredAgent: {
        ...company.registeredAgent,
        name: agentName,
        address: agentAddress,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-hd">Company Profile & Registered Agent Settings</h2>
        <p className="text-xs text-mut mt-1">
          Entity information and registered agent contact details
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-semibold">
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-hd border-b border-slate-100 pb-2">
            Corporate Entity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-body mb-1">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-hd outline-none focus:border-blue-600 focus:bg-white transition font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-body mb-1">Delaware State File #</label>
              <input
                type="text"
                value={privacyMode ? maskFileNum(delawareFile, true) : delawareFile}
                onChange={(e) => setDelawareFile(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-hd outline-none focus:border-blue-600 focus:bg-white transition font-medium font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-hd border-b border-slate-100 pb-2">
            Delaware Registered Agent Service
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-body mb-1">Agent Provider</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-hd outline-none focus:border-blue-600 focus:bg-white transition font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-body mb-1">Registered Address</label>
              <input
                type="text"
                value={agentAddress}
                onChange={(e) => setAgentAddress(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-hd outline-none focus:border-blue-600 focus:bg-white transition font-medium"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
