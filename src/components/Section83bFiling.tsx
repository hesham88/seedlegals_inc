import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Send, 
  Mail, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  Lock, 
  Eye, 
  EyeOff, 
  Printer, 
  Clock, 
  Check, 
  Building2, 
  Search,
  Sparkles
} from 'lucide-react';
import { CompanyOverview, Stockholder, LegalDocument } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskSSN, maskCode } from '../utils/privacy';

interface Section83bFilingProps {
  company: CompanyOverview;
  stockholders: Stockholder[];
  documents: LegalDocument[];
  onSelectDocument: (doc: LegalDocument) => void;
}

export const Section83bFiling: React.FC<Section83bFilingProps> = ({
  company,
  stockholders,
  documents,
  onSelectDocument,
}) => {
  const { privacyMode } = usePrivacy();
  const [expanded, setExpanded] = useState(true);
  const [selectedStockholderId, setSelectedStockholderId] = useState<string>(stockholders[0]?.id || '');
  const [filingPathway, setFilingPathway] = useState<'ssn_online' | 'no_ssn_mail'>('ssn_online');
  
  // Online SSN state
  const [ssnInput, setSsnInput] = useState('9821');
  const [showSsn, setShowSsn] = useState(false);
  const [eFileSubmitted, setEFileSubmitted] = useState(false);
  const [eFileConfirmation, setEFileConfirmation] = useState<string | null>('IRS-EFILE-83B-2026-984210');
  const [isSubmittingEFile, setIsSubmittingEFile] = useState(false);

  // Mail No-SSN state
  const [irsCenter, setIrsCenter] = useState('Austin, TX (Department of the Treasury)');
  const [uspsTracking, setUspsTracking] = useState('9400 1089 5234 8920 1102 98');
  const [mailLogged, setMailLogged] = useState(true);

  const doc83b = documents.find(d => d.id === 'doc-83b');
  const activeStockholder = stockholders.find(s => s.id === selectedStockholderId) || stockholders[0];

  const handleTriggerEFile = () => {
    setIsSubmittingEFile(true);
    setTimeout(() => {
      setIsSubmittingEFile(false);
      setEFileSubmitted(true);
      const confNumber = `IRS-EFILE-83B-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setEFileConfirmation(confNumber);
    }, 1200);
  };

  return (
    <div className="relative">
      {/* Timeline Dot Icon */}
      <div className="absolute -left-6 md:-left-8 top-1.5 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs z-10 font-bold text-xs">
        3
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left transition border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="text-lg md:text-xl font-bold text-slate-900">
              3. 83(b) online submission (SSN) or mailing (No SSN)
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" /> 15 Days Remaining
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {expanded && (
          <div className="p-5 md:p-6 space-y-6">
            {/* IRS statutory countdown banner */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">
                    IRS Statutory 30-Day Countdown Active
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Section 83(b) Elections MUST be submitted or postmarked to the IRS within 30 days of receiving restricted stock (Deadline: <strong>August 6, 2026</strong>). Late filings are rejected by the IRS with no extension possible.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {doc83b && (
                  <button
                    onClick={() => onSelectDocument(doc83b)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/50 font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>View Signed 83(b) Doc</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stockholder selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Select Founding Member / Stockholder
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {stockholders.map((sh) => {
                  const isSelected = sh.id === selectedStockholderId;
                  return (
                    <button
                      key={sh.id}
                      onClick={() => setSelectedStockholderId(sh.id)}
                      className={`p-3 rounded-xl text-left border transition flex items-center justify-between ${
                        isSelected 
                          ? 'bg-blue-50/80 border-blue-600 text-slate-900 ring-2 ring-blue-600/20' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                          {sh.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-xs font-bold truncate">{maskName(sh.name, privacyMode)}</div>
                          <div className="text-[11px] text-slate-500">{sh.shareCount.toLocaleString()} Common Shares</div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filing Pathway Tabs (Online SSN vs No-SSN Certified Mail) */}
            <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-1">
              <button
                onClick={() => setFilingPathway('ssn_online')}
                className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 ${
                  filingPathway === 'ssn_online'
                    ? 'bg-white shadow-xs border border-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className={`p-2 rounded-lg ${filingPathway === 'ssn_online' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">1. Online IRS Submission (With SSN)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Fastest</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    For US founders with a Social Security Number or ITIN. Submit digitally with instant IRS confirmation.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setFilingPathway('no_ssn_mail')}
                className={`p-3.5 rounded-xl text-left transition flex items-start gap-3 ${
                  filingPathway === 'no_ssn_mail'
                    ? 'bg-white shadow-xs border border-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                <div className={`p-2 rounded-lg ${filingPathway === 'no_ssn_mail' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">2. Certified USPS Mail Package (No SSN)</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Non-US Founder</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    For international founders or founders without an SSN. Generates mail package & USPS Return Receipt.
                  </p>
                </div>
              </button>
            </div>

            {/* PATHWAY A: ONLINE IRS SUBMISSION (SSN) */}
            {filingPathway === 'ssn_online' && (
              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      IRS Direct Digital 83(b) E-Submission Wizard
                    </h4>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Encrypted IRS Transmission
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Taxpayer Legal Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={maskName(activeStockholder.name, privacyMode)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Social Security Number (SSN / ITIN)
                    </label>
                    <div className="relative">
                      <input
                        type={showSsn && !privacyMode ? 'text' : 'password'}
                        value={privacyMode ? '***-**-****' : ssnInput}
                        onChange={(e) => setSsnInput(e.target.value)}
                        placeholder="XXX-XX-9821"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 bg-white pr-10 focus:border-blue-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSsn(!showSsn)}
                        className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                      >
                        {showSsn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Company Name:</span>
                    <span className="font-semibold text-slate-900">{company.name} {company.suffix}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Property Description:</span>
                    <span className="font-semibold text-slate-900">{activeStockholder.shareCount.toLocaleString()} Common Shares</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Fair Market Value / Purchase Price:</span>
                    <span className="font-semibold text-slate-900">${(activeStockholder.shareCount * activeStockholder.pricePerShare).toFixed(2)} ($0.00001/share)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Transfer Date:</span>
                    <span className="font-semibold text-slate-900">{company.incorporationDate}</span>
                  </div>
                </div>

                {eFileSubmitted || eFileConfirmation ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Electronic 83(b) Election Successfully Submitted to IRS</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-800">
                      <div>
                        IRS Confirmation #: <span className="font-mono font-bold text-emerald-950">{maskCode(eFileConfirmation || '', privacyMode)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-emerald-700">Timestamp: July 2, 2026 14:22 UTC</span>
                        {doc83b && (
                          <button
                            onClick={() => onSelectDocument(doc83b)}
                            className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download E-Receipt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleTriggerEFile}
                      disabled={isSubmittingEFile}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs flex items-center gap-2"
                    >
                      {isSubmittingEFile ? (
                        <span>Transmitting to IRS...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit 83(b) Election Online via SSN</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* PATHWAY B: NO-SSN CERTIFIED USPS MAIL PACKAGE */}
            {filingPathway === 'no_ssn_mail' && (
              <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Certified USPS Mail Package Generator (No SSN / Non-US Founder)
                    </h4>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    Form 3800 USPS Certified Mail Tracker
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select IRS Service Center Destination
                    </label>
                    <select
                      value={irsCenter}
                      onChange={(e) => setIrsCenter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:border-blue-600 outline-none"
                    >
                      <option value="Austin, TX (Department of the Treasury)">
                        Department of the Treasury - Austin, TX 73301-0021
                      </option>
                      <option value="Ogden, UT (Department of the Treasury)">
                        Department of the Treasury - Ogden, UT 84201-0021
                      </option>
                      <option value="Kansas City, MO (Department of the Treasury)">
                        Department of the Treasury - Kansas City, MO 64999-0021
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      USPS Certified Mail Tracking Number
                    </label>
                    <input
                      type="text"
                      value={uspsTracking}
                      onChange={(e) => setUspsTracking(e.target.value)}
                      placeholder="9400 1000 0000 0000 0000 00"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 bg-white focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Generated No-SSN 83(b) Mailing Package</span>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Ready to Print & Mail
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Item 1</div>
                      <div className="font-bold text-slate-800 mt-0.5">Signed 83(b) Form</div>
                      <div className="text-[10px] text-slate-500">Form 83(b) specifying "Foreign / No SSN"</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Item 2</div>
                      <div className="font-bold text-slate-800 mt-0.5">IRS Transmittal Cover Letter</div>
                      <div className="text-[10px] text-slate-500">Requests date-stamped return copy</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Item 3</div>
                      <div className="font-bold text-slate-800 mt-0.5">USPS Certified Mail Envelope</div>
                      <div className="text-[10px] text-slate-500">Self-addressed return envelope</div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certified Mail Package generated for <strong>{maskName(activeStockholder.name, privacyMode)}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      {doc83b && (
                        <button
                          onClick={() => onSelectDocument(doc83b)}
                          className="px-3 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-xs transition flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print 83(b) Mail Package</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {mailLogged && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>USPS Certified Mail Logged: <strong className="font-mono">{maskCode(uspsTracking, privacyMode)}</strong></span>
                    </div>
                    <a
                      href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${uspsTracking.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Track on USPS.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
