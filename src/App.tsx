import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser, type User } from './firebase';
import { Landing } from './components/Landing';
import {
  ActiveTab, CompanyOverview, Stockholder, LegalDocument, NotificationItem,
} from './types';
import {
  initialCompany, initialStockholders, initialDocuments, initialNotifications,
} from './data/initialData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { DocumentModal } from './components/DocumentModal';
import { ShareCertificateModal } from './components/ShareCertificateModal';
import { AddStockholderModal } from './components/AddStockholderModal';
import { EditOverviewModal } from './components/EditOverviewModal';
import { GlassBackdrop } from './components/GlassBackdrop';
import { ChatAgent } from './components/ChatAgent';

import { IncorporationView } from './views/IncorporationView';
import { MyDocumentsView } from './views/MyDocumentsView';
import { CapTableView } from './views/CapTableView';
import { AgreementsView } from './views/AgreementsView';
import { TeamView } from './views/TeamView';
import { CalendarView } from './views/CalendarView';
import { SettingsView } from './views/SettingsView';
import { RaiseView } from './views/RaiseView';
import { PitchView } from './views/PitchView';
import { AgenticLayerView } from './views/AgenticLayerView';

import { PrivacyProvider } from './context/PrivacyContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('app');

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setAuthReady(true); }), []);

  if (!authReady) {
    return <div className="min-h-screen grid place-items-center text-mut font-sans">Loading…</div>;
  }

  if (!user) return <Landing user={null} />;

  if (viewMode === 'landing') {
    return <Landing user={user} onEnterApp={() => setViewMode('app')} />;
  }

  return (
    <ThemeProvider>
      <PrivacyProvider>
        <MainAppContent user={user} onGoToLanding={() => setViewMode('landing')} />
      </PrivacyProvider>
    </ThemeProvider>
  );
}

interface MainAppContentProps {
  user: User;
  onGoToLanding: () => void;
}

function MainAppContent({ user, onGoToLanding }: MainAppContentProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('incorporation');
  const [company, setCompany] = useState<CompanyOverview>(initialCompany);
  const [stockholders, setStockholders] = useState<Stockholder[]>(initialStockholders);
  const [documents, setDocuments] = useState<LegalDocument[]>(initialDocuments);
  const [notifications] = useState<NotificationItem[]>(initialNotifications);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [isAddStockholderOpen, setIsAddStockholderOpen] = useState(false);
  const [isEditOverviewOpen, setIsEditOverviewOpen] = useState(false);
  const [isShareCertificatesOpen, setIsShareCertificatesOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleUpdateCompany = (updated: Partial<CompanyOverview>) => setCompany(prev => ({ ...prev, ...updated }));
  const handleAddStockholder = (s: Stockholder) => setStockholders(prev => [...prev, s]);
  const handleSignDocument = (docId: string) => {
    setDocuments(prev => prev.map(d =>
      d.id === docId
        ? { ...d, isSigned: true, signatureStatus: '1/1', signedDate: new Date().toISOString().split('T')[0] }
        : d));
  };

  const availableShares =
    company.totalAuthorizedShares - company.reservedEquityPool - stockholders.reduce((sum, s) => sum + s.shareCount, 0);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'documents':
        return <MyDocumentsView documents={documents} onSelectDocument={setSelectedDocument} />;
      case 'captable':
        return (
          <CapTableView
            company={company}
            stockholders={stockholders}
            onOpenAddStockholder={() => setIsAddStockholderOpen(true)}
            onOpenShareCertificates={() => setIsShareCertificatesOpen(true)}
          />
        );
      case 'agreements':
        return <AgreementsView documents={documents} onSelectDocument={setSelectedDocument} />;
      case 'team':
        return <TeamView stockholders={stockholders} onOpenAddStockholder={() => setIsAddStockholderOpen(true)} />;
      case 'agentic':
        return <AgenticLayerView />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <SettingsView company={company} onUpdateCompany={handleUpdateCompany} />;
      case 'raise':
        return <RaiseView />;
      case 'pitch':
        return <PitchView />;
      case 'incorporation':
      default:
        return (
          <IncorporationView
            company={company}
            stockholders={stockholders}
            documents={documents}
            onOpenEditOverview={() => setIsEditOverviewOpen(true)}
            onOpenAddStockholder={() => setIsAddStockholderOpen(true)}
            onSelectDocument={setSelectedDocument}
            onOpenShareCertificates={() => setIsShareCertificatesOpen(true)}
            onUpdateIncorporationDate={(date) => handleUpdateCompany({ incorporationDate: date })}
            onUpdateCompany={handleUpdateCompany}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <GlassBackdrop />

      <Header
        activeTab={activeTab}
        notifications={notifications}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onSelectTab={setActiveTab}
        onGoToLanding={onGoToLanding}
        onSignOut={signOutUser}
        user={user}
      />

      <div className="flex flex-1 min-h-[calc(100vh-72px)]">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          company={company}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating Support & Inquiry agent — available on every screen */}
      <ChatAgent />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        stockholders={stockholders}
        onSelectDocument={setSelectedDocument}
        onSelectTab={setActiveTab}
      />
      <DocumentModal document={selectedDocument} onClose={() => setSelectedDocument(null)} onSignDocument={handleSignDocument} />
      <ShareCertificateModal isOpen={isShareCertificatesOpen} onClose={() => setIsShareCertificatesOpen(false)} stockholder={stockholders[0]} company={company} />
      <AddStockholderModal isOpen={isAddStockholderOpen} onClose={() => setIsAddStockholderOpen(false)} onAddStockholder={handleAddStockholder} availableShares={availableShares} />
      <EditOverviewModal isOpen={isEditOverviewOpen} onClose={() => setIsEditOverviewOpen(false)} company={company} onSave={handleUpdateCompany} />
    </div>
  );
}
