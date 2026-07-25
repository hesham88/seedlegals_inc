import React from 'react';
import { Calendar, AlertTriangle, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const events = [
    {
      date: 'Aug 6, 2026',
      title: 'IRS 83(b) Election Statutory Deadline',
      description: 'Must mail physical 83(b) election package to IRS within 30 days of June 29 share issuance.',
      status: 'urgent',
      daysLeft: 15,
    },
    {
      date: 'Jun 29, 2026',
      title: 'Certificate of Incorporation Filed in Delaware',
      description: 'Official corporate existence commenced under DE Secretary of State file #8934102.',
      status: 'done',
    },
    {
      date: 'Mar 1, 2027',
      title: 'Delaware Annual Franchise Tax & Report',
      description: 'Annual corporate report due to the Delaware Division of Corporations.',
      status: 'upcoming',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">Compliance & Filing Calendar</h2>
        <p className="text-xs text-slate-500 mt-1">
          Statutory deadlines, 83(b) election reminders, and Delaware annual state tax filings
        </p>
      </div>

      <div className="space-y-4">
        {events.map((evt, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl border bg-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              evt.status === 'urgent' ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {evt.status === 'urgent' ? (
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : evt.status === 'done' ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
                  <Clock className="w-5 h-5" />
                </div>
              )}

              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">
                  {evt.date}
                </div>
                <h3 className="font-bold text-sm text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{evt.description}</p>
              </div>
            </div>

            {evt.daysLeft && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold shrink-0 border border-amber-200">
                {evt.daysLeft} Days Remaining
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
