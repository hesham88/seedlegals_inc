import React from 'react';
import { Users, ShieldCheck, Mail, Building, Plus } from 'lucide-react';
import { Stockholder } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskEmail } from '../utils/privacy';

interface TeamViewProps {
  stockholders: Stockholder[];
  onOpenAddStockholder: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  stockholders,
  onOpenAddStockholder,
}) => {
  const { privacyMode } = usePrivacy();
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Board, Officers & Team</h2>
          <p className="text-xs text-slate-500 mt-1">
            Governance structure, officers, and team members for Apex Dynamics Inc.
          </p>
        </div>
        <button
          onClick={onOpenAddStockholder}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stockholders.map((person) => (
          <div key={person.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-bold text-base flex items-center justify-center shrink-0">
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900">{maskName(person.name, privacyMode)}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{maskEmail(person.email, privacyMode)}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold border border-blue-100">
                    CEO, President & Secretary
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Board Director
                  </span>
                </div>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1 border border-slate-100">
                  <div className="flex justify-between">
                    <span>Shares Held:</span>
                    <span className="font-bold text-slate-900">{person.shareCount.toLocaleString()} Common</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vesting Schedule:</span>
                    <span className="font-semibold text-slate-800">{person.vestingYears} yrs (1-yr cliff)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
