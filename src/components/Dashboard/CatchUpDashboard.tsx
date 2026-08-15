import React from 'react';
import { Eye, AlertTriangle, Zap, Calendar, RefreshCw, MessageSquare, Trash2, ArrowRight, FileText, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { AICatchupBriefing, ActionItem, DeadlineItem, ThreadChange, Email } from '../../types/inbox';

interface CatchUpDashboardProps {
  briefing: AICatchupBriefing;
  actionItems: ActionItem[];
  deadlines: DeadlineItem[];
  changes: ThreadChange[];
  onNavigate: (view: string) => void;
  onOpenSourceModal: (emailId: string) => void;
  onOpenReplyModal: (action: ActionItem) => void;
  onSelectCategoryFilter: (category: string) => void;
}

export const CatchUpDashboard: React.FC<CatchUpDashboardProps> = ({
  briefing,
  actionItems,
  deadlines,
  changes,
  onNavigate,
  onOpenSourceModal,
  onOpenReplyModal,
  onSelectCategoryFilter
}) => {
  const biggest = briefing.biggestMissed;

  return (
    <div className="space-y-8 pb-12">
      
      {/* GREETING & TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
            While You Were Away
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Good evening. Here's what ICU saw while you were busy.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>ICU Analysis Complete</span>
        </div>
      </div>

      {/* EMAIL STATISTICS CARDS (SECTION 25) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('actions')}
          className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 hover:border-rose-500/60 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 tracking-wider uppercase">🔴 Urgent</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 group-hover:scale-105 transition-transform">{briefing.urgentCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Needs immediate response</p>
        </button>

        <button
          onClick={() => onNavigate('actions')}
          className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-500/60 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">🟠 Important</span>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 group-hover:scale-105 transition-transform">{briefing.importantCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Action required soon</p>
        </button>

        <button
          onClick={() => onNavigate('deadlines')}
          className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/60 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">🟢 Info</span>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2 group-hover:scale-105 transition-transform">{briefing.infoCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Project & meeting updates</p>
        </button>

        <button
          onClick={() => onNavigate('low-priority')}
          className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">⚪ Low Priority</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-300 mt-2 group-hover:scale-105 transition-transform">{briefing.lowPriorityCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Newsletters & promos</p>
        </button>
      </div>

      {/* AI CATCH-UP BRIEFING CARD (SECTION 26) */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 p-6 relative overflow-hidden shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 mb-3">
          <Sparkles className="w-4 h-4" />
          <span>YOUR ICU BRIEFING (~100 Words)</span>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
          {briefing.briefingText}
        </p>
      </div>

      {/* HERO DASHBOARD COMPONENT: BIGGEST THING YOU MISSED (SECTION 27) */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border-2 border-rose-500/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>⚡ BIGGEST THING YOU MISSED</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
            Action Required 🔴
          </span>
        </div>

        <h2 className="font-display text-2xl font-extrabold text-white mb-3">
          {biggest.title}
        </h2>

        <div className="flex items-center space-x-4 my-4 p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Previous Deadline</p>
            <p className="text-sm line-through text-slate-400 font-semibold">{biggest.previousValue}</p>
          </div>
          <span className="text-rose-400 font-bold text-lg">→</span>
          <div>
            <p className="text-[10px] text-rose-400 font-bold uppercase">New Deadline</p>
            <p className="text-base font-extrabold text-rose-400">{biggest.newValue}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {biggest.description} <strong className="text-white">{biggest.urgentNote}</strong>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('conversations')}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
          >
            Open Conversation
          </button>
          <button
            onClick={() => {
              const item = actionItems.find(a => a.threadId === biggest.threadId) || actionItems[0];
              onOpenReplyModal(item);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg"
          >
            Draft Reply
          </button>
          <button
            onClick={() => onOpenSourceModal(biggest.sourceEmailId)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Source</span>
          </button>
        </div>
      </div>

      {/* SECTION 28: WHAT NEEDS YOU? */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-rose-400" />
            <h2 className="font-display text-xl font-bold text-white">What Needs You?</h2>
          </div>
          <button onClick={() => onNavigate('actions')} className="text-xs font-semibold text-cyan-400 hover:underline flex items-center space-x-1">
            <span>View All ({actionItems.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionItems.slice(0, 3).map(action => (
            <div key={action.id} className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                    action.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {action.priority}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">{action.formattedDeadline}</span>
                </div>

                <h3 className="font-display text-sm font-bold text-white mb-2">{action.title}</h3>
                <p className="text-xs text-slate-400 mb-4">From: <strong className="text-slate-200">{action.sender}</strong> ({action.senderRole})</p>
              </div>

              <div className="flex items-center space-x-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onOpenReplyModal(action)}
                  className="flex-1 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-bold text-xs transition-all text-center"
                >
                  Draft Reply
                </button>
                <button
                  onClick={() => onOpenSourceModal(action.sourceEmailId)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
                  title="View Source Email"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 29 & 30: DEADLINE RADAR & WHAT CHANGED PREVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* DEADLINE RADAR WIDGET */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-white">📅 Deadline Radar</h2>
            </div>
            <button onClick={() => onNavigate('deadlines')} className="text-xs text-cyan-400 hover:underline font-semibold">
              Full Radar →
            </button>
          </div>

          <div className="space-y-3">
            {deadlines.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.priority === 'URGENT' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <div>
                    <p className="text-xs font-bold text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-500">{item.sender}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs font-bold text-slate-300 border border-slate-800">
                  {item.relativeTime}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT CHANGED WIDGET */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              <h2 className="font-display text-lg font-bold text-white">🔄 What Changed?</h2>
            </div>
            <button onClick={() => onNavigate('changes')} className="text-xs text-cyan-400 hover:underline font-semibold">
              View All Changes →
            </button>
          </div>

          <div className="space-y-3">
            {changes.map(ch => (
              <div key={ch.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white">{ch.topic}</span>
                  <span className="text-slate-500 text-[10px]">{ch.detectedAt}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-400 line-through">{ch.previousValue}</span>
                  <span className="text-cyan-400 font-bold">→</span>
                  <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                    {ch.newValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
