import React, { useState, useEffect } from 'react';
import { Search, FileText, User, ArrowRight, X, Building } from 'lucide-react';
import { LegalDocument, Stockholder, ActiveTab } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskEmail } from '../utils/privacy';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: LegalDocument[];
  stockholders: Stockholder[];
  onSelectDocument: (doc: LegalDocument) => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  stockholders,
  onSelectDocument,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');
  const { privacyMode } = usePrivacy();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDocs = documents.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStockholders = stockholders.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, stockholders, equity, 83(b)..."
            className="w-full bg-transparent border-none text-base outline-none text-slate-900 placeholder:text-slate-400 font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-4">
          {/* Quick Navigation */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Quick Shortcuts
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => { onSelectTab('incorporation'); onClose(); }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 transition text-left flex items-center gap-2 text-xs font-semibold text-slate-900 border border-slate-200"
              >
                <Building className="w-4 h-4 text-blue-600" />
                <span>Incorporation</span>
              </button>
              <button
                onClick={() => { onSelectTab('captable'); onClose(); }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 transition text-left flex items-center gap-2 text-xs font-semibold text-slate-900 border border-slate-200"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Cap Table</span>
              </button>
              <button
                onClick={() => { onSelectTab('documents'); onClose(); }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 transition text-left flex items-center gap-2 text-xs font-semibold text-slate-900 border border-slate-200"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Legal Vault</span>
              </button>
              <button
                onClick={() => { onSelectTab('calendar'); onClose(); }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 transition text-left flex items-center gap-2 text-xs font-semibold text-slate-900 border border-slate-200"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Deadlines</span>
              </button>
            </div>
          </div>

          {/* Legal Documents Matches */}
          <div className="pt-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Legal Documents ({filteredDocs.length})
            </div>
            {filteredDocs.length === 0 ? (
              <div className="text-xs text-slate-400 py-2">No matching legal documents</div>
            ) : (
              <div className="space-y-1">
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onSelectDocument(doc);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{doc.name}</div>
                        <div className="text-[11px] text-slate-500">{doc.category} · {doc.description.slice(0, 60)}...</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stockholders Matches */}
          <div className="pt-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Stockholders ({filteredStockholders.length})
            </div>
            {filteredStockholders.map((sh) => (
              <button
                key={sh.id}
                onClick={() => {
                  onSelectTab('captable');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {sh.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{maskName(sh.name, privacyMode)}</div>
                    <div className="text-[11px] text-slate-500">{sh.shareCount.toLocaleString()} Common Shares · {maskEmail(sh.email, privacyMode)}</div>
                  </div>
                </div>
                <span className="text-xs text-blue-600 font-medium group-hover:underline">View Cap Table</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Press <kbd className="bg-white border border-slate-200 px-1 py-0.5 rounded text-[10px]">Esc</kbd> to exit search</span>
          <span>Stratis Delaware Corporate Platform</span>
        </div>
      </div>
    </div>
  );
};
