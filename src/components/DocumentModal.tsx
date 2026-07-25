import React, { useState } from 'react';
import { FileText, CheckCircle2, Download, Printer, Share2, ShieldCheck, X, PenTool } from 'lucide-react';
import { LegalDocument } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskFileNum } from '../utils/privacy';

interface DocumentModalProps {
  document: LegalDocument | null;
  onClose: () => void;
  onSignDocument: (docId: string) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  onClose,
  onSignDocument,
}) => {
  const [signatureName, setSignatureName] = useState('Alex Morgan');
  const [signed, setSigned] = useState(document?.isSigned ?? false);
  const [signingModalOpen, setSigningModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { privacyMode } = usePrivacy();

  if (!document) return null;

  const handleExecuteSign = () => {
    onSignDocument(document.id);
    setSigned(true);
    setSigningModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = window.document.createElement('a');
    const file = new Blob([document.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${document.name.replace(/\s+/g, '_')}_Apex_Dynamics.txt`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Document Header */}
        <div className="p-4 md:px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold truncate text-white">{document.name}</h2>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <span>Apex Dynamics Inc.</span>
                <span>•</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide">
                  {document.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition text-xs font-medium flex items-center gap-1.5"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied Link!' : 'Share'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition text-xs font-medium flex items-center gap-1.5"
              title="Download text"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition text-xs font-medium flex items-center gap-1.5"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/20 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {signed ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Fully Executed (1/1 Signatures)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                <PenTool className="w-3.5 h-3.5 text-amber-600" />
                Signature Required
              </span>
            )}
            <span className="text-slate-500 hidden sm:inline">{document.description}</span>
          </div>

          {!signed && (
            <button
              onClick={() => setSigningModalOpen(true)}
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-xs text-xs"
            >
              Sign Document
            </button>
          )}
        </div>

        {/* Paper Container Body */}
        <div className="p-6 md:p-10 overflow-y-auto bg-slate-100/70 flex-1">
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-md rounded-xl border border-slate-200 font-serif text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
            <div className="text-center pb-6 mb-6 border-b border-slate-200 font-sans">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                Official Legal Record
              </div>
              <div className="text-xl font-bold text-slate-900">{document.name}</div>
              <div className="text-xs text-slate-500 mt-1">State of Delaware • File #{maskFileNum('8934102', privacyMode)}</div>
            </div>

            {document.content}

            {/* Signature Block Visual */}
            <div className="mt-12 pt-8 border-t border-slate-300 font-sans">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Signature & Attestation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Signatory:</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{maskName('Alex Morgan', privacyMode)}</div>
                  <div className="text-xs text-slate-500">Sole Incorporator / Director</div>

                  <div className="mt-4 pt-3 border-t border-slate-200">
                    {signed ? (
                      <div>
                        <div className="font-serif italic text-lg text-blue-600 font-bold">
                          {maskName(signatureName, privacyMode)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Digitally Verified via Delaware Vault (DE Law DGCL)
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs italic text-slate-400 py-1">[ Awaiting e-Signature ]</div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Corporation:</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">Apex Dynamics Inc.</div>
                  <div className="text-xs text-slate-500">Delaware C-Corporation</div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
                    <div>Status: Registered & Active</div>
                    <div>Recorded Date: {document.signedDate ?? 'Pending'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Encrypted with 256-bit AES legal storage
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition text-xs"
          >
            Close
          </button>
        </div>
      </div>

      {/* E-Signature Dialog */}
      {signingModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <PenTool className="w-5 h-5 text-blue-600" />
                <span>e-Sign Document</span>
              </div>
              <button
                onClick={() => setSigningModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              By typing your legal full name below, you agree to execute <strong>{document.name}</strong> as an authorized representative of Apex Dynamics Inc. under the U.S. Electronic Signatures in Global and National Commerce (E-SIGN) Act.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm font-medium text-slate-900"
              />
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl mb-6 border border-blue-100 text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Signature Preview</div>
              <div className="font-serif italic text-2xl text-blue-600 font-bold py-1">
                {signatureName || 'Your Signature'}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSigningModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteSign}
                disabled={!signatureName.trim()}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs disabled:opacity-50"
              >
                Adopt & Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
