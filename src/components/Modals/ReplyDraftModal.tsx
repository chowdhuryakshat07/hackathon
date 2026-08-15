import React, { useState, useEffect } from 'react';
import { X, Send, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { ActionItem } from '../../types/inbox';

interface ReplyDraftModalProps {
  action: ActionItem | null;
  onClose: () => void;
}

export const ReplyDraftModal: React.FC<ReplyDraftModalProps> = ({
  action,
  onClose
}) => {
  const [draftText, setDraftText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (action) {
      setDraftText(action.suggestedReply);
    }
  }, [action]);

  if (!action) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl rounded-3xl bg-[#0f172a] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-cyan-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">AI Reply Generator</h3>
              <p className="text-xs text-slate-400">Replying to {action.sender}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METADATA */}
        <div className="mb-4 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <p><strong className="text-slate-200">Re:</strong> {action.title}</p>
        </div>

        {/* TEXTAREA EDITABLE DRAFT */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            Edit Reply Draft
          </label>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={7}
            className="w-full rounded-2xl bg-slate-950 border border-slate-700 p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed resize-none"
          />
        </div>

        {/* SAFETY FOOTER NOTE */}
        <div className="mb-6 flex items-center space-x-2 text-[11px] text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>ICU never sends emails automatically. Review and copy draft to your email client.</span>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
          >
            Discard
          </button>
          
          <button
            onClick={handleCopy}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg transition-all flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Response Draft'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
