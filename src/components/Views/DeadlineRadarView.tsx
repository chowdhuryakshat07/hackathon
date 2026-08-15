import React from 'react';
import { Calendar, Clock, FileText, User, AlertTriangle } from 'lucide-react';
import { DeadlineItem } from '../../types/inbox';

interface DeadlineRadarViewProps {
  deadlines: DeadlineItem[];
  onOpenSourceModal: (emailId: string) => void;
}

export const DeadlineRadarView: React.FC<DeadlineRadarViewProps> = ({
  deadlines,
  onOpenSourceModal
}) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Calendar className="w-6 h-6 text-amber-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">📅 Deadline Radar</h1>
        </div>
        <p className="text-sm text-slate-400">
          Chronological tracking of deadlines hidden deep inside incoming email threads.
        </p>
      </div>

      <div className="space-y-4">
        {deadlines.map(item => (
          <div
            key={item.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-2xl ${item.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                <Clock className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                    item.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {item.priority}
                  </span>
                  <span className="text-xs font-bold text-amber-400">{item.relativeTime}</span>
                </div>

                <h3 className="font-display text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">Requested by: <strong className="text-slate-200">{item.sender}</strong></p>
              </div>
            </div>

            <button
              onClick={() => onOpenSourceModal(item.sourceEmailId)}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2 self-start md:self-auto"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Source</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
