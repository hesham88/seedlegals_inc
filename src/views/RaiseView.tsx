import React, { useState } from 'react';
import { TrendingUp, Calculator, DollarSign, Plus } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskMoney } from '../utils/privacy';

export const RaiseView: React.FC = () => {
  const { privacyMode } = usePrivacy();
  const [targetAmount, setTargetAmount] = useState(500000);
  const [valuationCap, setValuationCap] = useState(5000000);
  const [discountRate, setDiscountRate] = useState(20);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-hd">Seed Fundraising Round</h2>
          <p className="text-xs text-mut mt-1">
            Y Combinator Post-Money SAFE Note Creator & Investor CRM
          </p>
        </div>
        <button
          onClick={() => alert('New SAFE Note agreement generator triggered')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Issue SAFE Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SAFE Calculator Card */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-hd flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>SAFE Estimator</span>
          </h3>

          <div>
            <label className="block text-xs text-mut mb-1">Target Raise Amount ($)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-600 font-semibold text-hd bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs text-mut mb-1">Valuation Cap ($)</label>
            <input
              type="number"
              value={valuationCap}
              onChange={(e) => setValuationCap(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-600 font-semibold text-hd bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs text-mut mb-1">Discount Rate (%)</label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-600 font-semibold text-hd bg-slate-50/50"
            />
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl text-xs space-y-1 text-body border border-blue-100">
            <div className="flex justify-between">
              <span>Estimated Dilution:</span>
              <span className="font-bold text-blue-600">
                {((targetAmount / valuationCap) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Pipeline & Investors */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-hd">Active Angel & VC Pipeline</h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-body">
                <tr>
                  <th className="py-2.5 px-4">Investor</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Commitment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-hd">{maskName('Apex Ventures', privacyMode)}</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">Committed</span></td>
                  <td className="py-3 px-4 text-right font-bold text-hd">{maskMoney(100000, privacyMode)}</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-hd">{maskName('Summit Capital', privacyMode)}</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-0.5 rounded-full pill font-semibold border border-blue-100">Term Sheet Issued</span></td>
                  <td className="py-3 px-4 text-right font-bold text-hd">{maskMoney(150000, privacyMode)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
