import React, { useState } from 'react';
import { Presentation, Link, Copy, Check, Upload } from 'lucide-react';

export const PitchView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const dataRoomUrl = 'https://dataroom.apexdynamics.example/pitch/apex-dataroom';

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(dataRoomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">Investor Pitch & Data Room</h2>
        <p className="text-xs text-slate-500 mt-1">
          Share secured pitch materials and due diligence documents with prospective investors
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">Secure Investor Sharing Link</h3>
          <div className="flex items-center gap-2 max-w-xl">
            <input
              type="text"
              readOnly
              value={dataRoomUrl}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-blue-600 transition cursor-pointer bg-slate-50/50">
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <div className="text-xs font-bold text-slate-900">Upload Pitch Deck PDF</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Drag and drop your deck or click to browse</div>
        </div>
      </div>
    </div>
  );
};
