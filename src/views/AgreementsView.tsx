import React from 'react';
import { FileCheck, ShieldCheck, PenTool, ExternalLink, Plus } from 'lucide-react';
import { LegalDocument } from '../types';

interface AgreementsViewProps {
  documents: LegalDocument[];
  onSelectDocument: (doc: LegalDocument) => void;
}

export const AgreementsView: React.FC<AgreementsViewProps> = ({
  documents,
  onSelectDocument,
}) => {
  const agreements = documents.filter(d => 
    d.name.includes('Agreement') || d.name.includes('Bylaws') || d.name.includes('Consent') || d.name.includes('CIIAA')
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Corporate Agreements & Contracts</h2>
          <p className="text-xs text-slate-500 mt-1">
            Standard startup contracts, NDAs, CIIAA, and Founder Stock Restriction Agreements
          </p>
        </div>
        <button
          onClick={() => alert('New agreement generator opened!')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Agreement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agreements.map((doc) => (
          <div key={doc.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-600/40 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">
                  {doc.category}
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Active
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">{doc.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{doc.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Signed {doc.signedDate}</span>
              <button
                onClick={() => onSelectDocument(doc)}
                className="text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <span>View Legal Text</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
