import React, { useState } from 'react';
import {
  FileText, Building2, Presentation, TrendingUp, PieChart, Users, FileCheck,
  Calendar, Settings, HelpCircle, ChevronDown, X, BookOpen, Mail, Bot,
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
  activeTab, onSelectTab, company, mobileOpen, onCloseMobile,
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
    { id: 'agentic' as ActiveTab, label: 'Agentic Layer', icon: Bot },
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
    <div
      className="flex flex-col h-full select-none no-scrollbar overflow-y-auto"
      style={{
        background: 'var(--side-bg)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderRight: '1px solid var(--side-border)',
      }}
    >
      {/* Company selector (brand lockup lives in the top bar, not here) */}
      <div className="p-4">
        <button
          onClick={() => setCompanyExpanded(!companyExpanded)}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl glass-inset text-left transition hover:brightness-105"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg pill flex items-center justify-center text-[11px] shrink-0">AD</div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-hd truncate">{company.name}</div>
              <div className="text-[10px] font-medium" style={{ color: 'var(--mut-2)' }}>{company.state} C-Corp</div>
            </div>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${companyExpanded ? 'rotate-180' : ''}`}
            style={{ color: 'var(--mut-2)' }}
          />
        </button>

        {companyExpanded && (
          <div className="mt-2 p-2.5 rounded-xl glass-inset text-xs space-y-1 text-body animate-in fade-in">
            <div className="font-semibold text-hd text-[11px] uppercase tracking-wider mb-1">Company Details</div>
            <div>State: <span className="font-medium text-hd">{company.state} C-Corp</span></div>
            <div>Delaware File: <span className="font-medium text-hd">{maskFileNum(company.delawareFileNumber, privacyMode)}</span></div>
            <div>Auth Shares: <span className="font-medium text-hd">{company.totalAuthorizedShares.toLocaleString()}</span></div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 pb-3 space-y-0.5 px-3">
        <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--mut)' }}>
          Workspace
        </div>

        {navItems.map((item, index) => {
          if (item.id.toString().startsWith('divider')) {
            return <div key={`div-${index}`} className="my-1.5 mx-2" style={{ borderTop: '1px solid var(--divider)' }} />;
          }

          const Icon = item.icon!;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ActiveTab)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-150"
              style={{
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--nav-active-txt)' : 'var(--txt)',
                background: isActive ? 'var(--nav-active-bg)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--nav-active-border)' : 'transparent'}`,
              }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4.5 h-4.5" style={{ color: 'var(--acc)' }} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: 'var(--acc)' }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="my-1.5 mx-2" style={{ borderTop: '1px solid var(--divider)' }} />
        <button
          onClick={() => setShowHelpModal(true)}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-body transition text-left"
        >
          <HelpCircle className="w-4.5 h-4.5" style={{ color: 'var(--acc)' }} />
          <span>Help &amp; Support Center</span>
        </button>
      </div>

      {/* User profile (trial/upgrade widget removed) */}
      <div className="p-3">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl glass-card">
          <div
            className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg,#04DCA2,#5F61FB)' }}
          >
            {privacyMode ? '••' : 'AM'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-hd truncate">{maskName('Alex Morgan', privacyMode)}</div>
            <div className="text-[10px] truncate" style={{ color: 'var(--mut-2)' }}>
              {maskEmail('alex.morgan@apexdynamics.example', privacyMode)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(7,8,43,.5)', backdropFilter: 'blur(4px)' }}>
          <div className="glass-card-active max-w-lg w-full p-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg"
              style={{ color: 'var(--mut-2)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--nav-active-bg)', color: 'var(--acc)' }}>
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-hd">Delaware Corporate Help &amp; Guidance</h3>
                <p className="text-xs text-mut">Official Delaware C-Corp Incorporation &amp; Compliance Knowledgebase</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-body mb-6 max-h-80 overflow-y-auto">
              <div className="p-3 rounded-xl glass-inset">
                <div className="font-bold text-hd mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" style={{ color: 'var(--acc)' }} />
                  What is the 30-Day IRS 83(b) Rule?
                </div>
                <p>Founders receiving restricted shares must file their 83(b) Election with the IRS within exactly 30 calendar days of share issuance. This locks tax valuation at grant rather than vesting date.</p>
              </div>

              <div className="p-3 rounded-xl glass-inset">
                <div className="font-bold text-hd mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4" style={{ color: 'var(--ok)' }} />
                  How is EIN Issued?
                </div>
                <p>For founders with SSN/ITIN, EIN is generated online directly with the IRS. For international founders without SSN, filing is completed via Form SS-4 submitted through your Delaware Registered Agent.</p>
              </div>

              <div className="p-3 rounded-xl glass-inset">
                <div className="font-bold text-hd mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: 'var(--acc)' }} />
                  Need Official Legal Assistance?
                </div>
                <p>For custom bylaws, board consents, or investor pitch inquiries, contact your dedicated Delaware Registered Agent support team.</p>
              </div>
            </div>

            <button onClick={() => setShowHelpModal(false)} className="w-full py-2.5 btn-primary text-xs">
              Got it
            </button>
          </div>
        </div>
      )}

      <aside className="hidden md:block w-72 h-screen sticky top-0 shrink-0 z-20">{content}</aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0" style={{ background: 'rgba(7,8,43,.5)', backdropFilter: 'blur(4px)' }} onClick={onCloseMobile} />
          <div className="relative w-80 max-w-[85vw] h-full z-10 shadow-2xl flex flex-col">
            <button onClick={onCloseMobile} className="absolute top-3 right-3 p-1.5 rounded-lg z-10" style={{ color: 'var(--mut-2)' }} aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
