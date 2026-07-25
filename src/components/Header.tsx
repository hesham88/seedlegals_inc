import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, CheckCircle2, ShieldCheck, Building2, Eye, EyeOff } from 'lucide-react';
import { ActiveTab, NotificationItem } from '../types';
import { usePrivacy } from '../context/PrivacyContext';

interface HeaderProps {
  activeTab: ActiveTab;
  notifications: NotificationItem[];
  onOpenSearch: () => void;
  onToggleMobileSidebar: () => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  notifications,
  onOpenSearch,
  onToggleMobileSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
  const [activeApp, setActiveApp] = useState<'Founders' | 'Investors' | 'Advisors'>('Founders');

  const { privacyMode, togglePrivacyMode } = usePrivacy();
  const unreadCount = notifications.filter(n => n.unread).length;

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'incorporation':
        return { parent: 'Incorporation', child: 'Incorporate a Delaware C corp' };
      case 'documents':
        return { parent: 'Vault', child: 'My Documents & Legal Repository' };
      case 'pitch':
        return { parent: 'Investor Portal', child: 'Company Pitch & Data Room' };
      case 'raise':
        return { parent: 'Fundraising', child: 'Seed Round & SAFE Notes' };
      case 'captable':
        return { parent: 'Equity Management', child: 'Capitalization Table & Options' };
      case 'team':
        return { parent: 'Governance', child: 'Board, Officers & Team' };
      case 'agreements':
        return { parent: 'Legal Contracts', child: 'Agreements & NDAs' };
      case 'calendar':
        return { parent: 'Compliance', child: 'Filing Calendar & Deadlines' };
      case 'settings':
        return { parent: 'Company Profile', child: 'Entity & Registered Agent Settings' };
      default:
        return { parent: 'Incorporation', child: 'Incorporate a Delaware C corp' };
    }
  };

  const breadcrumbs = getBreadcrumbTitle();

  return (
    <header className="h-16 bg-white text-slate-900 px-4 md:px-8 flex items-center justify-between border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span className="hover:text-slate-600 transition cursor-pointer">{breadcrumbs.parent}</span>
            </div>
            <h1 className="text-base md:text-lg font-semibold truncate text-slate-900 tracking-tight">
              {breadcrumbs.child}
            </h1>
          </div>
          
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 italic">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            On Track
          </span>
        </div>
      </div>

      {/* Right Toolbar Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Static Privacy Protection Badge (No toggle/switch) */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs font-semibold cursor-default"
          title="Privacy Protection Active (Permanent)"
        >
          <EyeOff className="w-4 h-4 text-amber-700" />
          <span className="hidden sm:inline">Privacy Protection Active</span>
        </div>

        {/* Search Field Button */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition text-xs font-normal max-w-[220px]"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">
            <kbd className="bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono mr-1">Ctrl + K</kbd> to search
          </span>
          <span className="md:hidden">Search</span>
        </button>

        {/* Search icon for tiny mobile */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900">Notifications</span>
                <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full border border-blue-100">
                  {notifications.length} alerts
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3 ${
                      n.unread ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {n.type === 'urgent' ? (
                      <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        !
                      </div>
                    ) : n.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{n.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{n.message}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Close panel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        {/* App Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAppSwitcher(!showAppSwitcher)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition text-slate-800 font-medium text-sm border border-slate-200 bg-white"
          >
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              SL
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-900">{activeApp}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showAppSwitcher && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Workspace Role
              </div>
              {(['Founders', 'Investors', 'Advisors'] as const).map((app) => (
                <button
                  key={app}
                  onClick={() => {
                    setActiveApp(app);
                    setShowAppSwitcher(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 transition ${
                    activeApp === app ? 'text-blue-700 font-semibold bg-blue-50/60' : 'text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>{app} Portal</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
