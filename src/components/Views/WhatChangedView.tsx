import React from 'react';
import { RefreshCw, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { ThreadChange } from '../../types/inbox';

interface WhatChangedViewProps {
  changes: ThreadChange[];
  onOpenSourceModal: (emailId: string) => void;
}

export const WhatChangedView: React.FC<WhatChangedViewProps> = ({
  changes,
  onOpenSourceModal
}) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin-slow" />
          <h1 className="font-display text-3xl font-extrabold text-white">🔄 What Changed?</h1>
        </div>
        <p className="text-sm text-slate-400">
          ICU compared historic messages in active threads to detect modifications in deadlines, schedules, and requirements.
        </p>
      </div>

      <div className="space-y-4">
        {changes.map(ch => (
          <div
            key={ch.id}
            className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {ch.field} CHANGED
                </span>
                <span className="text-xs text-slate-500">Detected {ch.detectedAt}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                {ch.topic}
              </h3>

              {/* VISUAL BEFORE / AFTER COMPARISON BADGE */}
              <div className="inline-flex items-center space-x-4 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Previous Value</p>
                  <p className="text-sm line-through font-semibold text-slate-400">{ch.previousValue}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase">New Value</p>
                  <p className="text-sm font-extrabold text-cyan-300 px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                    {ch.newValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={() => onOpenSourceModal(ch.sourceEmailId)}
                className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center space-x-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Source Evidence</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
