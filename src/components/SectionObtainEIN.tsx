import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  ChevronDown, 
  Download, 
  ExternalLink, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Send, 
  Lock, 
  Eye, 
  EyeOff, 
  Globe, 
  Check, 
  Sparkles,
  Building2,
  AlertCircle
} from 'lucide-react';
import { CompanyOverview, LegalDocument } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskEIN, maskSSN, maskFileNum, maskCode } from '../utils/privacy';

interface SectionObtainEINProps {
  company: CompanyOverview;
  onUpdateCompany: (updated: Partial<CompanyOverview>) => void;
  onSelectDocument?: (doc: LegalDocument) => void;
}

export const SectionObtainEIN: React.FC<SectionObtainEINProps> = ({
  company,
  onUpdateCompany,
  onSelectDocument,
}) => {
  const { privacyMode } = usePrivacy();
  const [expanded, setExpanded] = useState(true);
  const [einOption, setEinOption] = useState<'ssn_sync' | 'no_ssn_incorp'>('ssn_sync');
  
  // SSN Sync option state
  const [ssnVal, setSsnVal] = useState('9821');
  const [showSsn, setShowSsn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(true);
  
  // Non-SSN InCorp Fax option state
  const [authorizingDesignee, setAuthorizingDesignee] = useState(true);
  const [faxStatus, setFaxStatus] = useState<'draft' | 'faxed' | 'complete'>('complete');

  // EIN state
  const [currentEin, setCurrentEin] = useState(company.ein.includes('Pending') ? '98-3482195' : company.ein);
  const [isEditingEin, setIsEditingEin] = useState(false);

  const handleTriggerInCorpSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
      const generatedEin = `98-${Math.floor(1000000 + Math.random() * 9000000)}`;
      setCurrentEin(generatedEin);
      onUpdateCompany({ ein: generatedEin });
    }, 1500);
  };

  const handleSaveEin = () => {
    setIsEditingEin(false);
    onUpdateCompany({ ein: currentEin });
  };

  return (
    <div className="relative">
      {/* Timeline Dot Icon */}
      <div className="absolute -left-6 md:-left-8 top-1.5 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs z-10 font-bold text-xs">
        4
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="text-lg md:text-xl font-bold text-slate-900">
              4. Obtain EIN (Synched workflow with InCorp account automatically)
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600" /> InCorp Live Sync
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {expanded && (
          <div className="p-5 md:p-6 space-y-6">
            {/* InCorp Synced Registered Agent Account Banner */}
            <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-400/20 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">
                      InCorp Registered Agent Auto-Sync Active
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                      Connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Registered Agent: <strong>{company.registeredAgent.name}</strong> • Account <strong>#{maskCode('IN-8934102', privacyMode)}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white font-mono flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-300 animate-spin" />
                  <span>IRS Bridge API Live</span>
                </div>
              </div>
            </div>

            {/* Current Issued EIN Display Card */}
            <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Official Employer Identification Number (EIN)
                </div>
                {isEditingEin ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={currentEin}
                      onChange={(e) => setCurrentEin(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-emerald-300 text-base font-mono font-bold text-slate-900 bg-white outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      onClick={handleSaveEin}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="text-2xl font-mono font-extrabold text-slate-900 mt-0.5 flex items-center gap-3">
                    <span>{maskEIN(currentEin, privacyMode)}</span>
                    <button
                      onClick={() => setIsEditingEin(true)}
                      className="text-xs font-sans text-blue-600 hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                )}
                <p className="text-xs text-emerald-800 mt-1">
                  Issued by IRS via InCorp Registered Agent filing. Form CP 575 Notice on file.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert("Downloading IRS CP 575 EIN Confirmation Letter PDF...")}
                  className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-semibold text-xs transition shadow-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>Download CP 575 Notice</span>
                </button>
              </div>
            </div>

            {/* Option Selector: SSN Auto-Sync vs No-SSN InCorp Concierge */}
            <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-1">
              <button
                onClick={() => setEinOption('ssn_sync')}
                className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 ${
                  einOption === 'ssn_sync'
                    ? 'bg-white shadow-xs border border-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className={`p-2 rounded-lg ${einOption === 'ssn_sync' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Option A: SSN / ITIN Instant IRS Sync</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Automated</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    For US Responsible Party. InCorp triggers instant automated IRS API transmission.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setEinOption('no_ssn_incorp')}
                className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 ${
                  einOption === 'no_ssn_incorp'
                    ? 'bg-white shadow-xs border border-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className={`p-2 rounded-lg ${einOption === 'no_ssn_incorp' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Option B: No SSN (InCorp Express Concierge)</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">International</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    For foreign founders without SSN. InCorp acts as Third-Party Designee via Express IRS Fax.
                  </p>
                </div>
              </button>
            </div>

            {/* OPTION A: SSN INSTANT AUTOMATED IRS SYNC */}
            {einOption === 'ssn_sync' && (
              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      InCorp Direct IRS API Sync (SSN / ITIN)
                    </h4>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    SS-4 Instant Auto-Filing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Responsible Party Legal Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={maskName('Alex Morgan', privacyMode)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Responsible Party SSN or ITIN
                    </label>
                    <div className="relative">
                      <input
                        type={showSsn && !privacyMode ? 'text' : 'password'}
                        value={privacyMode ? '***-**-****' : ssnVal}
                        onChange={(e) => setSsnVal(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 bg-white pr-10 focus:border-blue-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSsn(!showSsn)}
                        className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                      >
                        {showSsn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 mb-1">Automated Sync Audit Log:</div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Certificate of Incorporation verified with Delaware
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">FILE #8934102</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2. InCorp Registered Agent address configured
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">1209 N Orange St</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3. IRS Form SS-4 payload transmitted
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">CP 575 Received</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleTriggerInCorpSync}
                    disabled={isSyncing}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs flex items-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Synchronizing with IRS via InCorp...' : 'Re-Sync EIN with InCorp Account'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* OPTION B: NON-SSN INCORP CONCIERGE (FAX) */}
            {einOption === 'no_ssn_incorp' && (
              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      InCorp Non-US Founder EIN Concierge (No SSN Required)
                    </h4>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    IRS Third-Party Designee
                  </span>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-900">
                  <input
                    type="checkbox"
                    id="designee-check"
                    checked={authorizingDesignee}
                    onChange={(e) => setAuthorizingDesignee(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="designee-check" className="cursor-pointer">
                    <strong className="block text-slate-900">Authorize InCorp Inc. as IRS Third-Party Designee</strong>
                    InCorp will use its registered Delaware agent address (1209 North Orange Street, Wilmington DE) and submit Form SS-4 directly to the IRS Toll-Free Fax unit for foreign founders.
                  </label>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>InCorp Concierge Processing Tracker</span>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      CP 575 Notice Generated
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-800">1. Form SS-4 Drafted</div>
                        <div className="text-[10px] text-slate-500">Foreign Founder specs added</div>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-800">2. IRS Express Faxed</div>
                        <div className="text-[10px] text-slate-500">InCorp agent fax unit</div>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-800">3. CP 575 Issued</div>
                        <div className="text-[10px] text-slate-500">EIN: {currentEin}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
