import React from 'react';
import { Settings, ShieldCheck, RefreshCw, Mail, CheckCircle2, Lock } from 'lucide-react';
import { TimeframeOption } from '../../types/inbox';

interface SettingsViewProps {
  isGmailConnected: boolean;
  onOpenGmailModal: () => void;
  timeframe: TimeframeOption;
  onTimeframeChange: (t: TimeframeOption) => void;
  onResetDemo: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isGmailConnected,
  onOpenGmailModal,
  timeframe,
  onTimeframeChange,
  onResetDemo
}) => {
  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          <h1 className="font-display text-3xl font-extrabold text-white">Settings & Privacy</h1>
        </div>
        <p className="text-sm text-slate-400">
          Manage your email connections, intelligence preferences, and privacy controls.
        </p>
      </div>

      {/* GMAIL ACCOUNT SECTION */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-white flex items-center space-x-2">
          <Mail className="w-5 h-5 text-rose-400" />
          <span>Email Connection</span>
        </h2>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div>
            <p className="text-sm font-bold text-white">
              {isGmailConnected ? 'rachit.user@gmail.com' : 'Demo Mode (Simulated Inbox)'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {isGmailConnected ? 'OAuth 2.0 connection active' : 'Using 45+ realistic hackathon demo emails'}
            </p>
          </div>

          <button
            onClick={onOpenGmailModal}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isGmailConnected
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
            }`}
          >
            {isGmailConnected ? 'Disconnect Gmail' : 'Connect Gmail'}
          </button>
        </div>
      </div>

      {/* CATCH-UP TIMEFRAME DEFAULT */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-white">Default Catch-Up Period</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'YESTERDAY', label: 'Yesterday (24h)' },
            { id: 'LAST_3_DAYS', label: 'Last 3 Days (Default)' },
            { id: 'LAST_7_DAYS', label: 'Last 7 Days' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => onTimeframeChange(t.id as TimeframeOption)}
              className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all ${
                timeframe === t.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRIVACY PROMISE */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
        <h2 className="font-display text-lg font-bold text-white flex items-center space-x-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span>Privacy & Security Guarantee</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          ICU processes email data locally or via secure zero-retention AI pipelines. ICU never automatically sends, archives, forwards, or deletes any messages. All actions require explicit user confirmation.
        </p>
      </div>

      {/* DEMO RESET BUTTON */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-bold text-white">Reset Demo Data</h3>
          <p className="text-xs text-slate-400">Restore default demo emails and AI catch-up state</p>
        </div>

        <button
          onClick={onResetDemo}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center space-x-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>

    </div>
  );
};
