import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, CheckCircle2, ShieldCheck, Building2, EyeOff, LayoutTemplate, LogOut, Sun, Moon } from 'lucide-react';
import { User } from 'firebase/auth';
import { ActiveTab, NotificationItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: ActiveTab;
  notifications: NotificationItem[];
  onOpenSearch: () => void;
  onToggleMobileSidebar: () => void;
  onSelectTab: (tab: ActiveTab) => void;
  onGoToLanding?: () => void;
  onSignOut?: () => void;
  user?: User | null;
}

const chip = 'flex items-center gap-2 rounded-full text-xs font-medium transition';
const chipStyle: React.CSSProperties = {
  background: 'var(--bar-chip)',
  border: '1px solid var(--bar-chip-border)',
  color: 'rgba(255,255,255,.88)',
};

export const Header: React.FC<HeaderProps> = ({
  activeTab, notifications, onOpenSearch, onToggleMobileSidebar, onGoToLanding, onSignOut,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
  const [activeApp, setActiveApp] = useState<'Founders' | 'Investors' | 'Advisors'>('Founders');
  const { theme, toggleTheme } = useTheme();

  const unreadCount = notifications.filter(n => n.unread).length;

  const crumbs: Record<string, { parent: string; child: string }> = {
    incorporation: { parent: 'Incorporation', child: 'Incorporate a Delaware C corp' },
    documents: { parent: 'Vault', child: 'My Documents & Legal Repository' },
    pitch: { parent: 'Investor Portal', child: 'Company Pitch & Data Room' },
    raise: { parent: 'Fundraising', child: 'Seed Round & SAFE Notes' },
    captable: { parent: 'Equity Management', child: 'Capitalization Table & Options' },
    team: { parent: 'Governance', child: 'Board, Officers & Team' },
    agreements: { parent: 'Legal Contracts', child: 'Agreements & NDAs' },
    agentic: { parent: 'Automation', child: 'Agentic Layer' },
    calendar: { parent: 'Compliance', child: 'Filing Calendar & Deadlines' },
    settings: { parent: 'Company Profile', child: 'Entity & Registered Agent Settings' },
  };
  const breadcrumbs = crumbs[activeTab] ?? crumbs.incorporation;

  return (
    <header
      className="h-18 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 text-white"
      style={{
        background: 'var(--bar-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--bar-border)',
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onToggleMobileSidebar} className="md:hidden p-2 rounded-lg" aria-label="Toggle Navigation">
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand lockup — moved out of the sidebar */}
        <div className="hidden sm:flex items-center gap-2.5 pr-3 mr-1" style={{ borderRight: '1px solid rgba(255,255,255,.25)' }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,.18)' }}>
            <div className="w-3.5 h-3.5 border-2 border-white rounded-[4px]" />
          </div>
        </div>

        {onGoToLanding && (
          <button onClick={onGoToLanding} className={`${chip} px-3 py-1.5 shrink-0`} style={chipStyle} title="Return to proposal landing page">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <span className="text-[11px] uppercase tracking-[.08em]" style={{ color: 'rgba(255,255,255,.7)' }}>
            {breadcrumbs.parent}
          </span>
          <h1 className="text-base md:text-xl font-semibold truncate text-white tracking-tight">{breadcrumbs.child}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`${chip} hidden lg:flex px-2.5 py-1.5`} style={chipStyle} title="Privacy protection active">
          <EyeOff className="w-4 h-4" />
          <span className="hidden xl:inline">Privacy Protection</span>
        </div>

        <button onClick={onOpenSearch} className={`${chip} hidden sm:flex px-4 py-2`} style={chipStyle}>
          <Search className="w-4 h-4" />
          <span className="hidden md:inline">Search</span>
          <kbd className="ml-4 px-2 py-0.5 rounded-lg text-[10px] font-mono" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)' }}>
            Ctrl + K
          </kbd>
        </button>

        <button onClick={onOpenSearch} className="sm:hidden p-2 rounded-full" style={chipStyle} title="Search">
          <Search className="w-5 h-5" />
        </button>

        {/* Light / dark */}
        <button onClick={toggleTheme} className="p-2.5 rounded-full" style={chipStyle} title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 rounded-full relative" style={chipStyle} title="Notifications">
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span
                className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{ background: '#04DCA2', color: '#04352a' }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 glass-card-active py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--divider)' }}>
                <span className="font-semibold text-sm text-hd">Notifications</span>
                <span className="text-xs pill px-2 py-0.5">{notifications.length} alerts</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-3.5 row-divide transition cursor-pointer flex gap-3">
                    {n.type === 'urgent' ? (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs pill-warn">!</div>
                    ) : n.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--ok)' }} />
                    ) : (
                      <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--acc)' }} />
                    )}
                    <div>
                      <div className="text-xs font-semibold text-hd">{n.title}</div>
                      <div className="text-xs text-body mt-0.5">{n.message}</div>
                      <div className="text-[10px] text-mut mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-7 w-px hidden sm:block" style={{ background: 'rgba(255,255,255,.3)' }} />

        <div className="relative">
          <button onClick={() => setShowAppSwitcher(!showAppSwitcher)} className={`${chip} px-3 py-2`} style={chipStyle}>
            <span className="hidden sm:inline font-semibold">{activeApp}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showAppSwitcher && (
            <div className="absolute right-0 mt-2 w-48 glass-card-active py-1.5 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-mut">Workspace Role</div>
              {(['Founders', 'Investors', 'Advisors'] as const).map(app => (
                <button
                  key={app}
                  onClick={() => { setActiveApp(app); setShowAppSwitcher(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition"
                  style={{
                    color: activeApp === app ? 'var(--nav-active-txt)' : 'var(--txt)',
                    background: activeApp === app ? 'var(--nav-active-bg)' : 'transparent',
                    fontWeight: activeApp === app ? 600 : 400,
                  }}
                >
                  <Building2 className="w-4 h-4" style={{ color: 'var(--acc)' }} />
                  <span>{app} Portal</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {onSignOut && (
          <button onClick={onSignOut} className={`${chip} px-3 py-2`} style={chipStyle} title="Sign out">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
};
