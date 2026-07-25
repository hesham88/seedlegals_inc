import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ChevronDown, 
  ExternalLink, 
  ShieldCheck, 
  CreditCard, 
  DollarSign, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  Link2,
  Lock
} from 'lucide-react';
import { CompanyOverview } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskAccount, maskEIN, maskCode } from '../utils/privacy';

interface SectionBankAccountProps {
  company: CompanyOverview;
}

export const SectionBankAccount: React.FC<SectionBankAccountProps> = ({ company }) => {
  const { privacyMode } = usePrivacy();
  const [expanded, setExpanded] = useState(true);
  const [bankConnected, setBankConnected] = useState(true);
  const [bankName, setBankName] = useState('Mercury Bank');
  const [accountNumber, setAccountNumber] = useState('•••• 8492');
  const [routingNumber, setRoutingNumber] = useState('121142201');
  const [initialDepositVerified, setInitialDepositVerified] = useState(true);
  const [isConnectingCustom, setIsConnectingCustom] = useState(false);

  const handleConnectBank = (e: React.FormEvent) => {
    e.preventDefault();
    setBankConnected(true);
    setIsConnectingCustom(false);
  };

  return (
    <div className="relative">
      {/* Timeline Dot Icon */}
      <div className="absolute -left-6 md:-left-8 top-1.5 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs z-10 font-bold text-xs">
        5
      </div>

      <div className="glass-card overflow-hidden">
        {/* Accordion Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="text-lg md:text-xl font-bold text-hd">
              5. Create or connect bank account (Investment Ready)
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Investment Ready
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-mut transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {expanded && (
          <div className="p-5 md:p-6 space-y-6">
            {/* Investment Ready Verification Readiness Banner */}
            <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Investment-Ready Legal & Banking Status
                    </h4>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      Your Delaware C Corp structure is fully verified and prepared for investor SAFE wires & venture capital deposits.
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 shrink-0 text-center">
                  100% Vault Verified
                </span>
              </div>

              {/* Requirement Checklist Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 border-t border-emerald-800/60">
                <div className="p-2 bg-white/10 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-100 truncate">Approved COI</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-100 truncate">EIN: {maskEIN(company.ein, privacyMode)}</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-100 truncate">Board Bylaws Executed</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-100 truncate">SPA & Cap Table Active</span>
                </div>
              </div>
            </div>

            {/* Connected Bank Account Status Card */}
            {bankConnected ? (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-hd">{bankName}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        Connected & Active
                      </span>
                    </div>
                    <p className="text-xs text-mut mt-0.5">
                      Account: <strong>{maskAccount(accountNumber, privacyMode)}</strong> • Routing: <span className="font-mono">{maskAccount(routingNumber, privacyMode)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsConnectingCustom(true)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-body hover:bg-slate-100 text-xs font-semibold transition"
                  >
                    Change Account
                  </button>
                  <a
                    href="https://mercury.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition flex items-center gap-1"
                  >
                    <span>Bank Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-amber-600" />
                  <span>No corporate bank account linked yet. Select a partner below or connect existing bank.</span>
                </div>
                <button
                  onClick={() => setIsConnectingCustom(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition"
                >
                  Connect Bank
                </button>
              </div>
            )}

            {/* Custom Bank Connection Form Modal / Inline */}
            {isConnectingCustom && (
              <form onSubmit={handleConnectBank} className="p-5 bg-white rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-hd uppercase tracking-wider">
                  Connect Corporate Bank Account
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-body mb-1">Bank Name</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. Mercury, Chase, Brex"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-hd outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-body mb-1">Routing Number</label>
                    <input
                      type="text"
                      required
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      placeholder="121142201"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-hd outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-body mb-1">Account Number</label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="•••• 8492"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-hd outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConnectingCustom(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-body hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-xs"
                  >
                    Save & Verify Account
                  </button>
                </div>
              </form>
            )}

            {/* Partnered Neobanks (One-Click Auto-Fill) */}
            <div>
              <div className="text-xs font-bold text-body mb-3 uppercase tracking-wider">
                Partnered Startup Banking Portals (One-Click Auto-Fill Data)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mercury */}
                <div className="p-4 bg-gradient-to-b from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-hd">Mercury Bank</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        $500 Bonus
                      </span>
                    </div>
                    <p className="text-xs text-mut leading-relaxed">
                      Silicon Valley banking with FDIC insurance up to $5M. Pre-fills Delaware COI, EIN, and cap table data automatically.
                    </p>
                  </div>
                  <a
                    href="https://mercury.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Apply with Mercury</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Brex */}
                <div className="p-4 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-hd">Brex Business</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        Corporate Cards
                      </span>
                    </div>
                    <p className="text-xs text-mut leading-relaxed">
                      All-in-one business account with high-yield cash sweep, corporate credit cards, and automated expense reporting.
                    </p>
                  </div>
                  <a
                    href="https://brex.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Apply with Brex</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Ramp */}
                <div className="p-4 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-hd">Ramp Banking</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                        Finance Automation
                      </span>
                    </div>
                    <p className="text-xs text-mut leading-relaxed">
                      Finance automation platform with 1.5% cashback corporate cards, bill pay, and treasury management.
                    </p>
                  </div>
                  <a
                    href="https://ramp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Connect Ramp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Founder Initial Capital Deposit Verification Tracker */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-hd">Initial Founder Capital Purchase Payment Logged</div>
                  <div className="text-mut">
                    Deposit of <strong>$90.00</strong> (9,000,000 Common Shares @ $0.00001) verified in {bankName}. Satisfies Delaware DGCL Section 152 stock payment requirements.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Capital Deposited
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
