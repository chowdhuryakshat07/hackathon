import React, { useState } from 'react';
import { Trash2, ShieldCheck, Mail, Tag, CheckCircle2 } from 'lucide-react';
import { Email } from '../../types/inbox';

interface LowPriorityViewProps {
  lowPriorityEmails: Email[];
  onOpenSourceModal: (emailId: string) => void;
}

export const LowPriorityView: React.FC<LowPriorityViewProps> = ({
  lowPriorityEmails,
  onOpenSourceModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filtered = lowPriorityEmails.filter(e => {
    if (activeCategory === 'NEWSLETTER') return e.category === 'NEWSLETTER';
    if (activeCategory === 'PROMO') return e.category === 'PROMO';
    if (activeCategory === 'SYSTEM') return e.category === 'SYSTEM';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Trash2 className="w-6 h-6 text-slate-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">🧹 What Can Wait</h1>
        </div>
        <p className="text-sm text-slate-400">
          30 emails probably don't require your immediate attention (newsletters, automated notifications, marketing updates).
        </p>
      </div>

      {/* SAFETY REASSURANCE BANNER */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex items-center space-x-3 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span>ICU isolates low priority messages without deleting or modifying your original inbox state.</span>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'ALL', label: 'All Low Priority (30)' },
          { id: 'NEWSLETTER', label: 'Newsletters & Digests' },
          { id: 'PROMO', label: 'Promotional Offers' },
          { id: 'SYSTEM', label: 'System & CI/CD Alerts' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EMAIL ITEMS LIST */}
      <div className="space-y-3">
        {filtered.map(email => (
          <div
            key={email.id}
            onClick={() => onOpenSourceModal(email.id)}
            className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold text-slate-200">{email.sender}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 uppercase font-semibold">
                    {email.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">{email.subject}</p>
              </div>
            </div>

            <span className="text-[11px] text-slate-500">{email.timeAgo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
