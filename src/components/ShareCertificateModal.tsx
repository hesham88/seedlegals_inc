import React from 'react';
import { Award, Printer, Download, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { Stockholder, CompanyOverview } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskFileNum } from '../utils/privacy';

interface ShareCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockholder: Stockholder;
  company: CompanyOverview;
}

export const ShareCertificateModal: React.FC<ShareCertificateModalProps> = ({
  isOpen,
  onClose,
  stockholder,
  company,
}) => {
  const { privacyMode } = usePrivacy();

  if (!isOpen) return null;

  const certificateNumber = '001';
  const issueDate = 'June 29, 2026';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">Delaware Stock Certificate #{certificateNumber}</h2>
              <p className="text-xs text-slate-300">Apex Dynamics Inc. • Common Stock Record</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
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

        {/* Certificate Display Area */}
        <div className="p-6 md:p-10 overflow-y-auto bg-slate-100 flex-1 flex justify-center">
          <div className="w-full max-w-3xl bg-[#fffdf9] p-8 md:p-12 rounded-xl border-8 border-double border-slate-900/20 shadow-xl relative text-slate-800 font-serif">
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-slate-900"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-slate-900"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-slate-900"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-slate-900"></div>

            {/* Certificate Top Bar */}
            <div className="flex justify-between items-center text-xs font-sans font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-4 mb-6">
              <div>Certificate No. <span className="font-mono text-sm text-blue-600">#{certificateNumber}</span></div>
              <div className="text-center font-serif text-lg font-bold normal-case text-slate-900">
                State of Delaware
              </div>
              <div>Shares: <span className="font-mono text-sm text-blue-600">{stockholder.shareCount.toLocaleString()}</span></div>
            </div>

            {/* Main Title */}
            <div className="text-center my-6">
              <div className="text-xs uppercase tracking-widest text-slate-500 font-sans font-semibold mb-1">
                Incorporated Under the Laws of Delaware
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {company.name} {company.suffix}
              </h1>
              <div className="text-xs text-slate-600 font-sans mt-1">
                Authorized Common Stock: {company.totalAuthorizedShares.toLocaleString()} Shares • Par Value ${company.parValue.toFixed(5)}
              </div>
            </div>

            {/* Recipient Notice */}
            <div className="text-center my-8 leading-relaxed">
              <p className="text-sm italic text-slate-600">This certifies that</p>
              <div className="text-xl md:text-2xl font-extrabold text-blue-600 my-2 font-sans tracking-wide">
                {maskName(stockholder.name, privacyMode)}
              </div>
              <p className="text-sm italic text-slate-600">
                is the registered holder of
              </p>
              <div className="text-lg font-bold text-slate-900 my-2 font-sans">
                {stockholder.shareCount.toLocaleString()} Shares of Fully Paid Common Stock
              </div>
              <p className="text-xs text-slate-600 max-w-lg mx-auto mt-2 leading-normal font-sans">
                transferable only on the books of the Corporation by the holder hereof in person or by Attorney upon surrender of this Certificate properly endorsed.
              </p>
            </div>

            {/* Seal & Signatures Footer */}
            <div className="mt-10 pt-6 border-t border-slate-300 font-sans grid grid-cols-3 items-end gap-4 text-center">
              <div>
                <div className="font-serif italic font-bold text-slate-900 text-sm border-b border-slate-400 pb-1">
                  {maskName('Alex Morgan', privacyMode)}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">
                  Chief Executive Officer
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-double border-slate-900 text-slate-900 flex flex-col items-center justify-center p-1 bg-amber-50/50 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <span className="text-[8px] font-bold tracking-widest text-center mt-0.5">
                    DELAWARE SEAL
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">FILE #{maskFileNum('8934102', privacyMode)}</span>
              </div>

              <div>
                <div className="font-serif italic font-bold text-slate-900 text-sm border-b border-slate-400 pb-1">
                  {maskName('Alex Morgan', privacyMode)}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">
                  Corporate Secretary
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-[10px] text-slate-400 font-sans flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Recorded on Official Delaware Equity Register on {issueDate}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Officially Verified Share Certificate</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
