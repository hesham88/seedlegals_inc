import React, { useState } from 'react';
import { 
  ActiveTab, 
  CompanyOverview, 
  Stockholder, 
  LegalDocument, 
  NotificationItem 
} from './types';
import { 
  initialCompany, 
  initialStockholders, 
  initialDocuments, 
  initialNotifications 
} from './data/initialData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { DocumentModal } from './components/DocumentModal';
import { ShareCertificateModal } from './components/ShareCertificateModal';
import { AddStockholderModal } from './components/AddStockholderModal';
import { EditOverviewModal } from './components/EditOverviewModal';

import { IncorporationView } from './views/IncorporationView';
import { MyDocumentsView } from './views/MyDocumentsView';
import { CapTableView } from './views/CapTableView';
import { AgreementsView } from './views/AgreementsView';
import { TeamView } from './views/TeamView';
import { CalendarView } from './views/CalendarView';
import { SettingsView } from './views/SettingsView';
import { RaiseView } from './views/RaiseView';
import { PitchView } from './views/PitchView';

import { PrivacyProvider } from './context/PrivacyContext';

export default function App() {
  return (
    <PrivacyProvider>
      <MainAppContent />
    </PrivacyProvider>
  );
}

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('incorporation');
  const [company, setCompany] = useState<CompanyOverview>(initialCompany);
  const [stockholders, setStockholders] = useState<Stockholder[]>(initialStockholders);
  const [documents, setDocuments] = useState<LegalDocument[]>(initialDocuments);
  const [notifications] = useState<NotificationItem[]>(initialNotifications);

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [isAddStockholderOpen, setIsAddStockholderOpen] = useState(false);
  const [isEditOverviewOpen, setIsEditOverviewOpen] = useState(false);
  const [isShareCertificatesOpen, setIsShareCertificatesOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleUpdateCompany = (updated: Partial<CompanyOverview>) => {
    setCompany(prev => ({ ...prev, ...updated }));
  };

  const handleAddStockholder = (newStockholder: Stockholder) => {
    setStockholders(prev => [...prev, newStockholder]);
  };

  const handleSignDocument = (docId: string) => {
    setDocuments(prev =>
      prev.map(d =>
        d.id === docId
          ? { ...d, isSigned: true, signatureStatus: '1/1', signedDate: new Date().toISOString().split('T')[0] }
          : d
      )
    );
  };

  const availableShares = company.totalAuthorizedShares - company.reservedEquityPool - stockholders.reduce((sum, s) => sum + s.shareCount, 0);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'incorporation':
        return (
          <IncorporationView
            company={company}
            stockholders={stockholders}
            documents={documents}
            onOpenEditOverview={() => setIsEditOverviewOpen(true)}
            onOpenAddStockholder={() => setIsAddStockholderOpen(true)}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
            onOpenShareCertificates={() => setIsShareCertificatesOpen(true)}
            onUpdateIncorporationDate={(date) => handleUpdateCompany({ incorporationDate: date })}
            onUpdateCompany={handleUpdateCompany}
          />
        );
      case 'documents':
        return (
          <MyDocumentsView
            documents={documents}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
          />
        );
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
        return (
          <AgreementsView
            documents={documents}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
          />
        );
      case 'team':
        return (
          <TeamView
            stockholders={stockholders}
            onOpenAddStockholder={() => setIsAddStockholderOpen(true)}
          />
        );
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return (
          <SettingsView
            company={company}
            onUpdateCompany={handleUpdateCompany}
          />
        );
      case 'raise':
        return <RaiseView />;
      case 'pitch':
        return <PitchView />;
      default:
        return (
          <IncorporationView
            company={company}
            stockholders={stockholders}
            documents={documents}
            onOpenEditOverview={() => setIsEditOverviewOpen(true)}
            onOpenAddStockholder={() => setIsAddStockholderOpen(true)}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
            onOpenShareCertificates={() => setIsShareCertificatesOpen(true)}
            onUpdateIncorporationDate={(date) => handleUpdateCompany({ incorporationDate: date })}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        notifications={notifications}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onSelectTab={setActiveTab}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 min-h-[calc(100vh-72px)]">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          company={company}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Primary Page Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        stockholders={stockholders}
        onSelectDocument={(doc) => setSelectedDocument(doc)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      <DocumentModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onSignDocument={handleSignDocument}
      />

      <ShareCertificateModal
        isOpen={isShareCertificatesOpen}
        onClose={() => setIsShareCertificatesOpen(false)}
        stockholder={stockholders[0]}
        company={company}
      />

      <AddStockholderModal
        isOpen={isAddStockholderOpen}
        onClose={() => setIsAddStockholderOpen(false)}
        onAddStockholder={handleAddStockholder}
        availableShares={availableShares}
      />

      <EditOverviewModal
        isOpen={isEditOverviewOpen}
        onClose={() => setIsEditOverviewOpen(false)}
        company={company}
        onSave={handleUpdateCompany}
      />
    </div>
  );
}
