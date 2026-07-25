import React, { useState } from 'react';
import { Edit3, X } from 'lucide-react';
import { CompanyOverview } from '../types';

interface EditOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyOverview;
  onSave: (updated: Partial<CompanyOverview>) => void;
}

export const EditOverviewModal: React.FC<EditOverviewModalProps> = ({
  isOpen,
  onClose,
  company,
  onSave,
}) => {
  const [name, setName] = useState(company.name);
  const [suffix, setSuffix] = useState(company.suffix);
  const [targetClosing, setTargetClosing] = useState(company.targetClosing);
  const [authorizedShares, setAuthorizedShares] = useState(company.totalAuthorizedShares);
  const [reservedEquityPool, setReservedEquityPool] = useState(company.reservedEquityPool);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      suffix,
      targetClosing,
      totalAuthorizedShares: Number(authorizedShares),
      reservedEquityPool: Number(reservedEquityPool),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Edit Incorporation Overview</h2>
              <p className="text-xs text-slate-300">Update entity structure details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Suffix</label>
              <select
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 bg-white font-medium text-slate-800"
              >
                <option value="Inc.">Inc.</option>
                <option value="Corp.">Corp.</option>
                <option value="Corporation">Corporation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Closing Date</label>
            <input
              type="text"
              required
              value={targetClosing}
              onChange={(e) => setTargetClosing(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total Authorized Shares</label>
              <input
                type="number"
                value={authorizedShares}
                onChange={(e) => setAuthorizedShares(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Equity Pool Reserved</label>
              <input
                type="number"
                value={reservedEquityPool}
                onChange={(e) => setReservedEquityPool(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
