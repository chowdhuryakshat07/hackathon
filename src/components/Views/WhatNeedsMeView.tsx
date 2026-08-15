import React from 'react';
import { Zap, Clock, FileText, Send, CheckCircle2, User, AlertTriangle } from 'lucide-react';
import { ActionItem } from '../../types/inbox';

interface WhatNeedsMeViewProps {
  actionItems: ActionItem[];
  onOpenSourceModal: (emailId: string) => void;
  onOpenReplyModal: (action: ActionItem) => void;
}

export const WhatNeedsMeView: React.FC<WhatNeedsMeViewProps> = ({
  actionItems,
  onOpenSourceModal,
  onOpenReplyModal
}) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Zap className="w-6 h-6 text-rose-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">What Needs You?</h1>
        </div>
        <p className="text-sm text-slate-400">
          Emails and requests where someone is waiting for your reply, report, or approval.
        </p>
      </div>

      <div className="space-y-4">
        {actionItems.map(action => (
          <div
            key={action.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 hover:border-indigo-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  action.priority === 'URGENT'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {action.priority}
                </span>
                <span className="text-xs font-semibold text-rose-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deadline: {action.formattedDeadline}</span>
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-white">
                {action.title}
              </h3>

              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>From: <strong className="text-slate-200">{action.sender}</strong> ({action.senderRole})</span>
                </span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">Status: Waiting for you</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 md:flex-col md:space-x-0 md:space-y-2 flex-shrink-0">
              <button
                onClick={() => onOpenReplyModal(action)}
                className="flex-1 md:w-40 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Draft Reply</span>
              </button>

              <button
                onClick={() => onOpenSourceModal(action.sourceEmailId)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Source</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
