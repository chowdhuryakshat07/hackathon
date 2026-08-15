import React, { useState } from 'react';
import { MessageSquare, User, Clock, ArrowRight, FileText, Send, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Thread, Email, ActionItem } from '../../types/inbox';

interface ImportantConversationsViewProps {
  threads: Thread[];
  actionItems: ActionItem[];
  onOpenSourceModal: (emailId: string) => void;
  onOpenReplyModal: (action: ActionItem) => void;
}

export const ImportantConversationsView: React.FC<ImportantConversationsViewProps> = ({
  threads,
  actionItems,
  onOpenSourceModal,
  onOpenReplyModal
}) => {
  const [selectedThread, setSelectedThread] = useState<Thread>(threads[0] || null);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">💬 Important Conversations</h1>
        </div>
        <p className="text-sm text-slate-400">
          Reconstructed thread histories with chronological message timelines and ICU AI recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* THREAD LIST COLUMN */}
        <div className="lg:col-span-5 space-y-3">
          {threads.map(thread => {
            const isSelected = selectedThread?.id === thread.id;
            return (
              <div
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/40 to-slate-900 border-indigo-500 text-white shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                    thread.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                  }`}>
                    {thread.priority}
                  </span>
                  <span className="text-[11px] text-slate-500">{thread.lastUpdated}</span>
                </div>

                <h3 className="font-display text-sm font-bold text-white mb-1 line-clamp-1">
                  {thread.subject}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {thread.summary}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
                  <span>{thread.participants.join(', ')}</span>
                  <span className="font-bold text-indigo-300 flex items-center space-x-1">
                    <span>{thread.messageCount} msgs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* THREAD DETAIL & TIMELINE VIEW */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
          {selectedThread ? (
            <>
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                    Thread Timeline ({selectedThread.messageCount} messages)
                  </span>
                  <span className="text-xs font-semibold text-amber-400">
                    {selectedThread.status === 'WAITING_FOR_USER' ? 'Waiting for your reply' : 'Informational'}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-white">{selectedThread.subject}</h2>
              </div>

              {/* TIMELINE STEPS */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {selectedThread.messages.map((msg, index) => (
                  <div key={msg.id} className="relative flex items-start space-x-4 pl-8">
                    <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-[#0f172a]" />
                    <div className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{msg.sender}</span>
                        <span className="text-slate-500">{msg.timeAgo}</span>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{msg.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ICU RECOMMENDATION BOX (SECTION 32) */}
              <div className="rounded-2xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/40 p-5 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>ICU RECOMMENDATION</span>
                </div>
                <p className="text-xs text-slate-200 font-semibold">
                  {selectedThread.nextAction || 'Review the conversation history and respond to updated timelines.'}
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={() => {
                      const action = actionItems.find(a => a.threadId === selectedThread.id) || actionItems[0];
                      onOpenReplyModal(action);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Draft Reply</span>
                  </button>
                  <button
                    onClick={() => onOpenSourceModal(selectedThread.messages[0]?.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center space-x-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Original Email</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Select a conversation thread to view timeline details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
