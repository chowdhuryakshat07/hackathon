import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Email } from '../../types/inbox';

interface SourceEmailModalProps {
  email: Email | undefined;
  onClose: () => void;
}

export const SourceEmailModal: React.FC<SourceEmailModalProps> = ({
  email,
  onClose
}) => {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0f172a] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Source Email Evidence</h3>
              <p className="text-xs text-slate-400">Verifiable original email source</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METADATA BAR */}
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2 text-xs mb-4">
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">FROM:</span>
            <span className="text-slate-200 font-bold">{email.sender} &lt;{email.senderEmail}&gt;</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">DATE:</span>
            <span className="text-slate-400">{new Date(email.timestamp).toLocaleString()} ({email.timeAgo})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">SUBJECT:</span>
            <span className="text-white font-bold">{email.subject}</span>
          </div>
        </div>

        {/* AI HIGHLIGHT EVIDENCE CALLOUT */}
        {email.evidenceHighlight && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200 uppercase text-[10px] tracking-wider block font-bold mb-0.5">AI Highlighted Key Evidence:</strong>
              "{email.evidenceHighlight}"
            </div>
          </div>
        )}

        {/* BODY */}
        <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-950/40 border border-slate-800 p-4 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
          {email.body}
        </div>

        {/* FOOTER */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authenticated Source Message</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
