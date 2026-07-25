import React, { useState } from 'react';
import { FileText, Download, PenTool, CheckCircle2, Search, Filter } from 'lucide-react';
import { LegalDocument } from '../types';

interface MyDocumentsViewProps {
  documents: LegalDocument[];
  onSelectDocument: (doc: LegalDocument) => void;
}

export const MyDocumentsView: React.FC<MyDocumentsViewProps> = ({
  documents,
  onSelectDocument,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Incorporation', 'Board', 'Stock', 'IP & Protection', 'Tax'];

  const filteredDocs = documents.filter(d => {
    const matchesCategory = filterCategory === 'All' || d.category === filterCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* View Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-hd">My Legal Documents & Vault</h2>
          <p className="text-xs text-mut mt-1">
            Apex Dynamics Inc. • State of Delaware Corporate Vault (9 Documents)
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All Key Governance Executed</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-body hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-mut absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document vault..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-blue-600 text-hd"
          />
        </div>
      </div>

      {/* Documents List Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-body uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Share</th>
                <th className="py-3 px-4 text-center">Execution Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-semibold text-hd">
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="text-left hover:text-blue-600 flex items-center gap-2.5"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-hd">{doc.name}</div>
                        <div className="text-[11px] text-mut font-normal line-clamp-1">{doc.description}</div>
                      </div>
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-body text-[10px] font-bold">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full border border-slate-200 text-mut font-medium">
                      {doc.shareCountText}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {doc.isSigned ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        <PenTool className="w-3 h-3 text-emerald-600" /> {doc.signatureStatus}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                        Needs Sign
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="px-3 py-1.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs transition"
                    >
                      View & Sign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
