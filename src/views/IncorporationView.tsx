import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Pencil, 
  MoreVertical, 
  UserPlus, 
  Share2, 
  PenTool, 
  Download, 
  Calendar as CalendarIcon, 
  Zap, 
  FileText, 
  ChevronRight, 
  AlertTriangle, 
  ExternalLink,
  ClipboardCheck,
  ChevronDown
} from 'lucide-react';
import { CompanyOverview, Stockholder, LegalDocument } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName } from '../utils/privacy';
import { Section83bFiling } from '../components/Section83bFiling';
import { SectionObtainEIN } from '../components/SectionObtainEIN';
import { SectionBankAccount } from '../components/SectionBankAccount';

interface IncorporationViewProps {
  company: CompanyOverview;
  stockholders: Stockholder[];
  documents: LegalDocument[];
  onOpenEditOverview: () => void;
  onOpenAddStockholder: () => void;
  onSelectDocument: (doc: LegalDocument) => void;
  onOpenShareCertificates: () => void;
  onUpdateIncorporationDate: (date: string) => void;
  onUpdateCompany: (updated: Partial<CompanyOverview>) => void;
}

export const IncorporationView: React.FC<IncorporationViewProps> = ({
  company,
  stockholders,
  documents,
  onOpenEditOverview,
  onOpenAddStockholder,
  onSelectDocument,
  onOpenShareCertificates,
  onUpdateIncorporationDate,
  onUpdateCompany,
}) => {
  const { privacyMode } = usePrivacy();
  const [section1Expanded, setSection1Expanded] = useState(true);
  const [section2Expanded, setSection2Expanded] = useState(true);
  const [incorporationDateInput, setIncorporationDateInput] = useState(company.incorporationDate);

  const totalIssuedShares = stockholders.reduce((acc, s) => acc + s.shareCount, 0);

  const getDoc = (id: string) => documents.find(d => d.id === id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-xs relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-bold text-hd">Overview</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              Active Incorporation
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenEditOverview}
              className="p-2 text-mut hover:text-blue-600 hover:bg-slate-50 rounded-xl transition"
              title="Edit overview"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button className="p-2 text-mut hover:text-slate-800 hover:bg-slate-50 rounded-xl transition">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-mut mb-1">Target closing</div>
            <div className="text-base font-bold text-hd">{company.targetClosing}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-mut mb-1">Company name</div>
            <div className="text-base font-bold text-hd truncate">{company.name}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-mut mb-1">Suffix</div>
            <div className="text-base font-bold text-hd">{company.suffix}</div>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 md:pl-8 space-y-8">
        
        {/* SECTION 1: Incorporate a Delaware C corp */}
        <div className="relative">
          <span aria-hidden className="absolute -left-[17px] md:-left-[21px] top-9 -bottom-8 w-[2px]" style={{ background: '#04DCA2' }} />
          {/* Timeline Dot Icon */}
          <div className="absolute -left-6 md:-left-8 top-1.5 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs z-10">
            <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
          </div>

          <div className="glass-card overflow-hidden">
            {/* Accordion Header */}
            <button
              onClick={() => setSection1Expanded(!section1Expanded)}
              className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left transition border-b border-slate-100"
            >
              <div className="text-lg md:text-xl font-bold text-hd">
                Incorporate a Delaware C corp
              </div>
              <ChevronDown className={`w-5 h-5 text-mut transition-transform ${section1Expanded ? 'rotate-180' : ''}`} />
            </button>

            {section1Expanded && (
              <div className="p-5 md:p-6 space-y-6">
                
                {/* Card 1: Add stockholders */}
                <div className="p-5 glass-card relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <h3 className="text-sm font-bold text-hd">
                        1. Add your stockholders at incorporation
                      </h3>
                    </div>
                    <button
                      onClick={onOpenAddStockholder}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="Add or Edit Stockholders"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Top Share Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl mb-4 text-xs border border-slate-100">
                    <div>
                      <div className="text-mut mb-0.5">Total authorized shares</div>
                      <div className="text-sm font-bold text-hd">
                        {company.totalAuthorizedShares.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-mut mb-0.5">Reserved for equity pool</div>
                      <div className="text-sm font-bold text-hd">
                        {company.reservedEquityPool.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-mut mb-0.5">Par value</div>
                      <div className="text-sm font-bold text-hd">${company.parValue.toFixed(5)}</div>
                    </div>
                  </div>

                  {/* Investor / Stockholders Table */}
                  <div className="border border-slate-200 rounded-xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-body">
                        <tr>
                          <th className="py-3 px-4">
                            <div>Common Stock</div>
                            <div className="text-[10px] text-mut font-normal">Available to issue</div>
                          </th>
                          <th className="py-3 px-4 text-right">Edit</th>
                          <th className="py-3 px-4 text-right">PPS</th>
                          <th className="py-3 px-4 text-right">Shares</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {stockholders.map((sh) => (
                          <tr key={sh.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5 font-semibold text-hd">
                                <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {sh.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span>{maskName(sh.name, privacyMode)}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={onOpenAddStockholder}
                                className="p-1 hover:text-blue-600"
                              >
                                <Pencil className="w-3.5 h-3.5 inline text-mut" />
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-body">
                              ${sh.pricePerShare.toFixed(5)}
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-hd">
                              {sh.shareCount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-hd">
                        <tr>
                          <td colSpan={3} className="py-2.5 px-4 text-right">Total Issued</td>
                          <td className="py-2.5 px-4 text-right">{totalIssuedShares.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={onOpenAddStockholder}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-xs"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Add Stockholder</span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Enter details */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      2. Enter details of your Delaware C corp
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8">
                    These details will be used to generate the Certificate of Incorporation.
                  </p>
                </div>

                {/* Card 3: Sign Certificate of Incorporation */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      3. Sign the Certificate of Incorporation
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8 mb-4">
                    This is the document required to form your Delaware C corp. Once signed, it can be filed via the registered agent with the Delaware Division of Corporations to complete the process.
                  </p>

                  <div className="pl-8">
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-body">
                          <tr>
                            <th className="py-2.5 px-4">Document</th>
                            <th className="py-2.5 px-4 text-center">Share</th>
                            <th className="py-2.5 px-4 text-center">Signature</th>
                            <th className="py-2.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-slate-50 transition">
                            <td className="py-3 px-4 font-semibold text-hd">
                              <button
                                onClick={() => {
                                  const doc = getDoc('doc-coi');
                                  if (doc) onSelectDocument(doc);
                                }}
                                className="hover:text-blue-600 flex items-center gap-2 text-left"
                              >
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span>Certificate of Incorporation</span>
                              </button>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="px-2 py-0.5 rounded-full border border-slate-200 text-mut font-medium">
                                -
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                <PenTool className="w-3 h-3 text-emerald-600" /> 1/1
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => {
                                  const doc = getDoc('doc-coi');
                                  if (doc) onSelectDocument(doc);
                                }}
                                className="p-1 text-mut hover:text-blue-600"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Card 4: Submit for review */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      4. Submit Certificate of Incorporation for review
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8 mb-3">
                    We will review your Certificate of Incorporation and make sure there are no issues before sending it to your registered agent in Delaware. They will then file the Certificate of Incorporation to the Delaware Division of Corporations.
                  </p>
                  <div className="pl-8">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Your documents were sent to be reviewed by our team on 29 Jun 2026</span>
                    </div>
                  </div>
                </div>

                {/* Card 5: Expedite filing */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-hd">
                      5. Expedite your filing with Delaware for $150
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-9 mb-3">
                    Delaware filing times can be unpredictable, recently we have seen an average wait time of 30 days. Normally expedited filings return in 3 business days.
                  </p>
                  <div className="pl-9">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Our team member will reach out to you to expedite your filing as soon as possible.</span>
                    </div>
                  </div>
                </div>

                {/* Card 6: Approved Certificate */}
                <div className="p-5 glass-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <h3 className="text-sm font-bold text-hd">
                          6. Approved Certificate of Incorporation
                        </h3>
                        <p className="text-xs text-mut mt-0.5">
                          Your approved Certificate of Incorporation from the Delaware Division of Corporations is ready to download.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const doc = getDoc('doc-coi');
                        if (doc) onSelectDocument(doc);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Post-incorporation setup */}
        <div className="relative">
          <span aria-hidden className="absolute -left-[17px] md:-left-[21px] top-9 -bottom-8 w-[2px]" style={{ background: 'linear-gradient(#04DCA2, rgba(95,97,251,.35))' }} />
          {/* Timeline Dot Icon */}
          <div className="absolute -left-6 md:-left-8 top-1.5 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs z-10 font-bold text-xs">
            2
          </div>

          <div className="glass-card overflow-hidden">
            {/* Accordion Header */}
            <button
              onClick={() => setSection2Expanded(!section2Expanded)}
              className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left transition border-b border-slate-100"
            >
              <div className="text-lg md:text-xl font-bold text-hd">
                2. Post-incorporation setup (from 7-12)
              </div>
              <ChevronDown className={`w-5 h-5 text-mut transition-transform ${section2Expanded ? 'rotate-180' : ''}`} />
            </button>

            {section2Expanded && (
              <div className="p-5 md:p-6 space-y-6">

                {/* Card 7: Enter new Delaware C corp details */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      7. Enter new Delaware C corp details
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8 mb-3">
                    This date can be found on your approved Certificate of Incorporation.
                  </p>
                  <div className="pl-8 max-w-xs">
                    <label className="block text-[11px] font-semibold text-mut mb-1 uppercase tracking-wider">
                      Date of Incorporation
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={incorporationDateInput}
                        onChange={(e) => {
                          setIncorporationDateInput(e.target.value);
                          onUpdateIncorporationDate(e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-600 font-semibold text-hd bg-slate-50/50"
                      />
                      <CalendarIcon className="w-4 h-4 text-mut absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Card 8: Key company details */}
                <div className="p-5 glass-card">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <h3 className="text-sm font-bold text-hd">
                        8. Key company details
                      </h3>
                    </div>
                    <button onClick={onOpenEditOverview} className="p-1 text-mut hover:text-blue-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-mut pl-8">
                    This will generate all the documents required to structure your newly formed Delaware C corp, including setting up the board, corporate bylaws, stock restrictions, 83(b) elections, and more.
                  </p>
                </div>

                {/* Card 9: Initial actions of the company */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      9. Initial actions of the company
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8 mb-4">
                    Sign all of the documents to complete all initial actions of your company. Once the 'Initial action of the board' document is fully signed, the 30-day deadline to sign, download, and mail your 83(b) election begins.
                  </p>

                  <div className="pl-8">
                    <div className="border border-slate-200 rounded-xl overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-body">
                          <tr>
                            <th className="py-2.5 px-4">Document</th>
                            <th className="py-2.5 px-4 text-center">Share</th>
                            <th className="py-2.5 px-4 text-center">Signature</th>
                            <th className="py-2.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { doc: getDoc('doc-asi'), share: '-' },
                            { doc: getDoc('doc-bylaws'), share: '1/1' },
                            { doc: getDoc('doc-csb'), share: '-' },
                            { doc: getDoc('doc-iabd'), share: '1/1' },
                            { doc: getDoc('doc-sc'), share: '1/1' },
                          ].map(({ doc, share }, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition">
                              <td className="py-3 px-4 font-semibold text-hd">
                                <button
                                  onClick={() => doc && onSelectDocument(doc)}
                                  className="hover:text-blue-600 flex items-center gap-2 text-left"
                                >
                                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                                  <span>{doc?.name ?? 'Document'}</span>
                                </button>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2.5 py-0.5 rounded-full border border-slate-200 text-mut font-medium text-[11px]">
                                  {share}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                  <PenTool className="w-3 h-3 text-emerald-600" /> 1/1
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => doc && onSelectDocument(doc)}
                                  className="p-1 text-mut hover:text-blue-600"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Card 10: Stock Purchase Agreements */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      10. Stock Purchase Agreements
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8 mb-4">
                    The Stock Purchase Agreement issues shares in your new Delaware C corp to the initial stockholders in exchange for a purchase price. This also records the core terms of that issuance for your company's official records.
                  </p>

                  <div className="pl-8 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-3.5 bg-slate-50 flex items-center justify-between border-b border-slate-100 text-xs font-semibold text-hd">
                      <span>Stock Purchase Agreement</span>
                      <button
                        onClick={() => {
                          const doc = getDoc('doc-spa');
                          if (doc) onSelectDocument(doc);
                        }}
                        className="px-3 py-1 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold transition flex items-center gap-1"
                      >
                        <span>Manage</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 11: Stock Restrictions and 83(b) Elections Preparation */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      11. Stock Restrictions and 83(b) Elections Preparation
                    </h3>
                  </div>
                  <div className="pl-8 space-y-3">
                    <p className="text-xs text-mut leading-relaxed">
                      Stock restrictions are conditions that prevent unvested shares from being fully owned or freely transferred until they vest. Prepares formal documents for 83(b) submission.
                    </p>

                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                      {[
                        { name: 'Stock Restriction Agreement', doc: getDoc('doc-sra') },
                        { name: '83(b) Election Preparation Form', doc: getDoc('doc-83b') },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-white hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-hd transition">
                          <span>{item.name}</span>
                          <button
                            onClick={() => item.doc && onSelectDocument(item.doc)}
                            className="px-3 py-1 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold transition flex items-center gap-1"
                          >
                            <span>Manage</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 12: Post-incorporation documents for founding members */}
                <div className="p-5 glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm font-bold text-hd">
                      12. Post-incorporation agreements for founding members
                    </h3>
                  </div>
                  <p className="text-xs text-mut pl-8 mb-4">
                    Indemnification agreements protect directors from personal liability, and CIIAAs ensure the company owns its IP and that confidential information stays private.
                  </p>

                  <div className="pl-8 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                    {[
                      { name: 'Director and Officer Indemnification Agreement', doc: getDoc('doc-indemnity') },
                      { name: 'Confidential Information and Invention Assignment Agreement', doc: getDoc('doc-ciiaa') },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-white hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-hd transition">
                        <span>{item.name}</span>
                        <button
                          onClick={() => item.doc && onSelectDocument(item.doc)}
                          className="px-3 py-1 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold transition flex items-center gap-1"
                        >
                          <span>Manage</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: 83(b) online submission (SSN) or mailing (No SSN) */}
        <Section83bFiling
          company={company}
          stockholders={stockholders}
          documents={documents}
          onSelectDocument={onSelectDocument}
        />

        {/* SECTION 4: Obtain EIN (Synched workflow with InCorp account automatically) */}
        <SectionObtainEIN
          company={company}
          onUpdateCompany={onUpdateCompany}
          onSelectDocument={onSelectDocument}
        />

        {/* SECTION 5: Create or connect bank account (Investment Ready) */}
        <SectionBankAccount company={company} />

      </div>

      {/* Floating Bottom Action Event Approval Button */}
      <div className="mt-8 flex justify-start pl-6 md:pl-8">
        <button
          onClick={onOpenShareCertificates}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-md flex items-center gap-2.5 group"
        >
          <ClipboardCheck className="w-5 h-5 text-emerald-300" />
          <span>Complete and view share certificates</span>
        </button>
      </div>
    </div>
  );
};
