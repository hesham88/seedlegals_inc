import React, { useState } from 'react';
import { 
  FileText, 
  Building2, 
  Presentation, 
  TrendingUp, 
  PieChart, 
  Users, 
  FileCheck, 
  Calendar, 
  Settings, 
  HelpCircle,
  ChevronDown,
  X,
  BookOpen,
  Mail
} from 'lucide-react';
import { ActiveTab, CompanyOverview } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskEmail, maskFileNum } from '../utils/privacy';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  company: CompanyOverview;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  company,
  mobileOpen,
  onCloseMobile,
}) => {
  const [companyExpanded, setCompanyExpanded] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { privacyMode } = usePrivacy();

  const navItems = [
    { id: 'documents' as ActiveTab, label: 'My Documents', icon: FileText },
    { id: 'divider-1' },
    { id: 'incorporation' as ActiveTab, label: 'Incorporate a C corp', icon: Building2 },
    { id: 'pitch' as ActiveTab, label: 'Pitch', icon: Presentation },
    { id: 'raise' as ActiveTab, label: 'Raise', icon: TrendingUp },
    { id: 'captable' as ActiveTab, label: 'Cap Table', icon: PieChart },
    { id: 'divider-2' },
    { id: 'team' as ActiveTab, label: 'Team', icon: Users },
    { id: 'agreements' as ActiveTab, label: 'Agreements', icon: FileCheck },
    { id: 'divider-3' },
    { id: 'calendar' as ActiveTab, label: 'Calendar', icon: Calendar, badge: '1' },
    { id: 'divider-4' },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 select-none">
      {/* Top Brand Logo & Company Selector */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-xs">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Stratis UI</span>
        </div>

        <button
          onClick={() => setCompanyExpanded(!companyExpanded)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-slate-200 text-left bg-slate-50/50"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
              FE
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 truncate">{company.name}</div>
              <div className="text-[10px] text-slate-500 font-medium">Delaware C-Corp</div>
            </div>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${companyExpanded ? 'rotate-180' : ''}`} />
        </button>

        {companyExpanded && (
          <div className="mt-2 p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-1 animate-in fade-in">
            <div className="font-semibold text-slate-900 text-[11px] uppercase tracking-wider mb-1">Company Details</div>
            <div>State: <span className="font-medium text-slate-900">{company.state} C-Corp</span></div>
            <div>Delaware File: <span className="font-medium text-slate-900">{maskFileNum(company.delawareFileNumber, privacyMode)}</span></div>
            <div>Auth Shares: <span className="font-medium text-slate-900">{company.totalAuthorizedShares.toLocaleString()}</span></div>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-1">
        <div className="px-5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Workspace
        </div>

        {navItems.map((item, index) => {
          if (item.id.toString().startsWith('divider')) {
            return <div key={`div-${index}`} className="my-2 border-t border-slate-100 mx-4" />;
          }

          const Icon = item.icon!;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ActiveTab)}
              className={`w-full flex items-center justify-between px-5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-3 border-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* In-App Help & Support Center Button (No External SeedLegals Link) */}
        <div className="pt-2 border-t border-slate-100 mt-2 px-2">
          <button
            onClick={() => setShowHelpModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition text-left"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Help & Support Center</span>
          </button>
        </div>
      </div>

      {/* Bottom Trial / Plan Widget */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TRIAL PLAN</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">Active</span>
          </div>
          <p className="text-xs text-slate-900 font-bold mb-2">6 days remaining</p>
          <button className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-xs">
            Upgrade Now
          </button>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-slate-100">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
            {privacyMode ? '••' : 'AM'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-slate-900 truncate">
              {maskName('Alex Morgan', privacyMode)}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {maskEmail('alex.morgan@apexdynamics.io', privacyMode)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delaware Corporate Help & Guidance</h3>
                <p className="text-xs text-slate-500">Official Delaware C-Corp Incorporation & Compliance Knowledgebase</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 mb-6 max-h-80 overflow-y-auto">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  What is the 30-Day IRS 83(b) Rule?
                </div>
                <p>Founders receiving restricted shares must file their 83(b) Election with the IRS within exactly 30 calendar days of share issuance. This locks tax valuation at grant rather than vesting date.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  How is EIN Issued?
                </div>
                <p>For founders with SSN/ITIN, EIN is generated online directly with the IRS. For international founders without SSN, filing is completed via Form SS-4 submitted through your Delaware Registered Agent.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  Need Official Legal Assistance?
                </div>
                <p>For custom bylaws, board consents, or investor pitch inquiries, contact your dedicated Delaware Registered Agent support team at <strong className="text-slate-800">support@incorp-delaware.com</strong>.</p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 shrink-0 z-20">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full z-10 shadow-2xl flex flex-col">
            <button
              onClick={onCloseMobile}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
