import React from 'react';
import { Eye, Sparkles, ArrowRight, ShieldCheck, Zap, RefreshCw, Calendar, Brain, Trash2, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';

interface LandingPageProps {
  onStartDemo: () => void;
  onOpenGmailModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartDemo,
  onOpenGmailModal
}) => {
  return (
    <div className="relative overflow-hidden bg-[#080c14] text-slate-100">
      
      {/* BACKGROUND GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-8 shadow-lg shadow-indigo-500/10 animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>BIMTECH Hackathon 2026 — AI Professional Inbox Lifesaver</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
          I See <span className="gradient-text">You.</span>
        </h1>

        <p className="font-display text-xl sm:text-2xl font-medium text-indigo-200/90 max-w-3xl mx-auto mb-6">
          Your AI lifesaver for the emails you can't afford to miss.
        </p>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ICU watches your inbox, understands what happened while you were away, detects critical deadline changes, identifies urgent action items, and tells you what actually needs your attention.
        </p>

        {/* HERO CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={onStartDemo}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Try ICU Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenGmailModal}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 px-8 py-4 text-base font-bold text-slate-200 hover:border-slate-500 hover:text-white transition-all"
          >
            <Mail className="w-5 h-5 text-red-400" />
            <span>Connect Gmail</span>
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Start with Demo Mode — no real email access required.</span>
        </div>

        {/* HERO VISUAL PREVIEW CARD */}
        <div className="mt-16 relative max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-slate-800/40 to-slate-900/80 shadow-2xl shadow-indigo-950/60">
          <div className="rounded-[22px] bg-[#0f172a]/95 backdrop-blur-xl p-6 sm:p-8 text-left border border-white/10">
            
            {/* CARD HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
                <span className="font-display font-bold text-lg text-white">Here's what you missed.</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">47 Unread Emails</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Last 3 Days</span>
              </div>
            </div>

            {/* PRIORITY STATS BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-center">
                <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">🔴 Urgent</p>
                <p className="text-2xl font-bold text-white mt-1">3</p>
              </div>
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-center">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">🟠 Important</p>
                <p className="text-2xl font-bold text-white mt-1">5</p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-center">
                <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">🟢 Info</p>
                <p className="text-2xl font-bold text-white mt-1">9</p>
              </div>
              <div className="rounded-xl bg-slate-800/80 border border-slate-700/60 p-3 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">⚪ Low Priority</p>
                <p className="text-2xl font-bold text-slate-300 mt-1">30</p>
              </div>
            </div>

            {/* HERO HIGHLIGHT: BIGGEST THING YOU MISSED */}
            <div className="rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/40 p-5 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>⚡ BIGGEST THING YOU MISSED</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Project Alpha final submission deadline changed</h3>
              <div className="flex items-center space-x-3 my-3">
                <span className="text-sm line-through text-slate-400 font-semibold">August 20</span>
                <span className="text-xs text-slate-500">→</span>
                <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-sm border border-rose-500/40">
                  August 18 (2 days earlier)
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Rahul Sharma (Lead PM at ClientCorp) requested updated files earlier due to steering committee review. Client is waiting for your confirmation.
              </p>
              <div className="flex items-center space-x-3">
                <button onClick={onStartDemo} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md">
                  Open Conversation
                </button>
                <button onClick={onStartDemo} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700">
                  Draft Reply
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "HOW ICU WORKS" SECTION */}
      <section className="py-20 bg-slate-950/60 border-y border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              How ICU Works
            </h2>
            <p className="text-slate-400 text-base">
              You don't need to read every email. ICU reconstructs context in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center relative group hover:border-indigo-500/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-display font-black text-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">SEE</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                ICU scans all incoming messages while you were away, comparing historical context across active email threads.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center relative group hover:border-cyan-500/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-display font-black text-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">UNDERSTAND</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Advanced AI reconstructs multi-turn conversations, detecting deadline shifts, meeting reschedules, and manager requests.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center relative group hover:border-emerald-500/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-display font-black text-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">ACT</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive prioritized actionable intelligence, verifiable source proof, and one-click AI reply drafts ready for sending.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Built for Information Recovery
          </h2>
          <p className="text-slate-400 text-base">
            Not just another summarizer — an actionable inbox intelligence engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-rose-500/40 transition-all">
            <Zap className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="font-display text-lg font-bold text-white mb-2">⚡ Missed Actions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find emails where someone is waiting for your reply, quotation, or status report.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-cyan-500/40 transition-all">
            <RefreshCw className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="font-display text-lg font-bold text-white mb-2">🔄 What Changed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detect modifications in submission dates, meeting times, project scope, and compliance rules.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-amber-500/40 transition-all">
            <Calendar className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-display text-lg font-bold text-white mb-2">📅 Deadline Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chronological timeline tracking deadlines hidden deep inside email threads.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-indigo-500/40 transition-all">
            <Brain className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-display text-lg font-bold text-white mb-2">🧠 Smart Priority</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Categorizes emails automatically into Urgent 🔴, Important 🟠, Informational 🟢, and Low Priority ⚪.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-emerald-500/40 transition-all md:col-span-2">
            <Trash2 className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="font-display text-lg font-bold text-white mb-2">🧹 Noise Filter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Safely isolates newsletters, automated notifications, CI/CD alerts, and promotional messages so your focus stays on high-value items.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL PITCH CALLOUT */}
      <section className="py-20 bg-gradient-to-b from-indigo-950/40 to-[#080c14] border-t border-white/10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-6">
            You don't need to see everything.
          </h2>
          <p className="font-display text-2xl sm:text-3xl font-semibold gradient-text mb-10">
            You just need to make sure you don't miss what matters.
          </p>

          <button
            onClick={onStartDemo}
            className="inline-flex items-center space-x-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all"
          >
            <Sparkles className="w-6 h-6" />
            <span>Launch ICU Demo</span>
          </button>
        </div>
      </section>

    </div>
  );
};
