import React, { useState } from 'react';
import { UserPlus, X, ShieldAlert } from 'lucide-react';
import { Stockholder } from '../types';

interface AddStockholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStockholder: (stockholder: Stockholder) => void;
  availableShares: number;
}

export const AddStockholderModal: React.FC<AddStockholderModalProps> = ({
  isOpen,
  onClose,
  onAddStockholder,
  availableShares,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shareClass, setShareClass] = useState<'Common' | 'Preferred'>('Common');
  const [shareCount, setShareCount] = useState(1000000);
  const [pricePerShare, setPricePerShare] = useState(0.00001);
  const [hasRestrictions, setHasRestrictions] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newStockholder: Stockholder = {
      id: `sh-${Date.now()}`,
      name,
      email,
      shareClass,
      shareCount: Number(shareCount),
      pricePerShare: Number(pricePerShare),
      vestingYears: 4,
      cliffMonths: 12,
      vestingStartDate: new Date().toISOString().split('T')[0],
      hasRestrictedStock: hasRestrictions,
      election83bFiled: false,
      election83bDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    onAddStockholder(newStockholder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Stockholder at Incorporation</h2>
              <p className="text-xs text-slate-300">Issue founder shares or early equity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Stockholder Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Share Class
              </label>
              <select
                value={shareClass}
                onChange={(e) => setShareClass(e.target.value as 'Common' | 'Preferred')}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 bg-white font-medium text-slate-800"
              >
                <option value="Common">Common Stock</option>
                <option value="Preferred">Series Seed Preferred</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Price Per Share (PPS)
              </label>
              <input
                type="number"
                step="0.00001"
                value={pricePerShare}
                onChange={(e) => setPricePerShare(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Number of Shares
              </label>
              <span className="text-[11px] text-slate-500">
                Max available: {availableShares.toLocaleString()}
              </span>
            </div>
            <input
              type="number"
              required
              max={availableShares + 9000000}
              value={shareCount}
              onChange={(e) => setShareCount(parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 font-semibold text-slate-900"
            />
            <div className="text-[11px] text-slate-500 mt-1">
              Total Purchase Price: <span className="font-bold text-slate-900">${(shareCount * pricePerShare).toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-3">
            <input
              type="checkbox"
              id="restrictions"
              checked={hasRestrictions}
              onChange={(e) => setHasRestrictions(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="restrictions" className="text-xs text-slate-700 cursor-pointer">
              <span className="font-bold text-slate-900">Include Standard 4-Year Vesting (1-Yr Cliff)</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Generates Stock Restriction Agreement and IRS 83(b) Election package.
              </p>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs"
            >
              Issue Shares & Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
