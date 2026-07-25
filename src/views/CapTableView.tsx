import React from 'react';
import { PieChart, UserPlus, Award, ShieldCheck, FileCheck } from 'lucide-react';
import { Stockholder, CompanyOverview } from '../types';
import { usePrivacy } from '../context/PrivacyContext';
import { maskName, maskEmail } from '../utils/privacy';

interface CapTableViewProps {
  company: CompanyOverview;
  stockholders: Stockholder[];
  onOpenAddStockholder: () => void;
  onOpenShareCertificates: () => void;
}

export const CapTableView: React.FC<CapTableViewProps> = ({
  company,
  stockholders,
  onOpenAddStockholder,
  onOpenShareCertificates,
}) => {
  const { privacyMode } = usePrivacy();
  const issuedShares = stockholders.reduce((acc, s) => acc + s.shareCount, 0);
  const unissuedShares = company.totalAuthorizedShares - company.reservedEquityPool - issuedShares;

  const founderOwnership = (issuedShares / company.totalAuthorizedShares) * 100;
  const poolOwnership = (company.reservedEquityPool / company.totalAuthorizedShares) * 100;
  const unissuedOwnership = (unissuedShares / company.totalAuthorizedShares) * 100;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-hd">Capitalization Table</h2>
          <p className="text-xs text-mut mt-1">
            Official Delaware Ownership Register • {company.name} {company.suffix}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenShareCertificates}
            className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-600/30 text-blue-600 font-semibold text-xs hover:bg-blue-100 transition flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-blue-600" />
            <span>View Certificates</span>
          </button>
          <button
            onClick={onOpenAddStockholder}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center gap-2 shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Stockholder</span>
          </button>
        </div>
      </div>

      {/* Equity Visual Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-hd flex items-center gap-2">
          <PieChart className="w-4 h-4 text-blue-600" />
          <span>Fully-Diluted Ownership Structure</span>
        </h3>

        {/* Multi-segmented Ownership Progress Bar */}
        <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${founderOwnership}%` }}
            className="bg-blue-600 h-full transition-all duration-500 relative group"
            title={`Founders (${founderOwnership.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${poolOwnership}%` }}
            className="bg-emerald-500 h-full transition-all duration-500"
            title={`Unallocated Equity Pool (${poolOwnership.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${unissuedOwnership}%` }}
            className="bg-slate-300 h-full transition-all duration-500"
            title={`Unissued Authorized Stock (${unissuedOwnership.toFixed(1)}%)`}
          />
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="w-3.5 h-3.5 rounded-md bg-blue-600" />
            <div>
              <div className="font-bold text-hd">Issued Founder Stock</div>
              <div className="text-mut">{issuedShares.toLocaleString()} shares ({founderOwnership.toFixed(1)}%)</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <div className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
            <div>
              <div className="font-bold text-hd">Equity Pool Reserved</div>
              <div className="text-mut">{company.reservedEquityPool.toLocaleString()} shares ({poolOwnership.toFixed(1)}%)</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-3.5 h-3.5 rounded-md bg-slate-300" />
            <div>
              <div className="font-bold text-hd">Unissued Stock</div>
              <div className="text-mut">{unissuedShares.toLocaleString()} shares ({unissuedOwnership.toFixed(1)}%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stockholders Details Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 px-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <span className="font-bold text-sm text-hd">Stockholder Ledger</span>
          <span className="text-xs text-mut font-medium">Par Value: ${company.parValue.toFixed(5)}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-body uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Stockholder</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4 text-right">Share Count</th>
                <th className="py-3 px-4 text-right">Price / Share</th>
                <th className="py-3 px-4 text-right">Ownership %</th>
                <th className="py-3 px-4 text-center">83(b) Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stockholders.map((sh) => {
                const percent = (sh.shareCount / company.totalAuthorizedShares) * 100;
                return (
                  <tr key={sh.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-hd">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                          {sh.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-hd">{maskName(sh.name, privacyMode)}</div>
                          <div className="text-[11px] text-mut font-normal">{maskEmail(sh.email, privacyMode)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg pill font-bold text-[10px]">
                        {sh.shareClass}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-hd">
                      {sh.shareCount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-body">
                      ${sh.pricePerShare.toFixed(5)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-blue-600">
                      {percent.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {sh.hasRestrictedStock ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200">
                          Due Aug 6, 2026
                        </span>
                      ) : (
                        <span className="text-mut">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
