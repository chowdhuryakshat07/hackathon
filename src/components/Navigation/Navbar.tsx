import React from 'react';
import { Eye, Search, Mail, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { TimeframeOption } from '../../types/inbox';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  timeframe: TimeframeOption;
  onTimeframeChange: (timeframe: TimeframeOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenGmailModal: () => void;
  onStartDemo: () => void;
  isGmailConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  timeframe,
  onTimeframeChange,
  searchQuery,
  onSearchChange,
  onOpenGmailModal,
  onStartDemo,
  isGmailConnected
}) => {
  const isLanding = currentView === 'landing';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080c14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0f172a]">
              <Eye className="h-5 w-5 text-cyan-400 group-hover:text-indigo-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display text-xl font-bold tracking-tight text-white">ICU</span>
              <span className="rounded-md bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wider">I SEE YOU</p>
          </div>
        </div>

        {/* LANDING PAGE NAV ITEMS */}
        {isLanding ? (
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">How It Works</button>
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Features</button>
            <button onClick={onStartDemo} className="hover:text-white transition-colors flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Sparkles className="w-4 h-4" /> Demo
            </button>
            <button onClick={() => onNavigate('settings')} className="hover:text-white transition-colors">Privacy</button>
          </nav>
        ) : (
          /* DASHBOARD SEARCH BAR */
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search inbox intelligence (senders, deadlines, changes)..."
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        )}

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {!isLanding && (
            <div className="relative inline-block text-left">
              <select
                value={timeframe}
                onChange={(e) => onTimeframeChange(e.target.value as TimeframeOption)}
                className="appearance-none rounded-lg bg-slate-900/90 border border-slate-700 px-3 py-1.5 pr-8 text-xs font-medium text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="YESTERDAY">Yesterday</option>
                <option value="LAST_3_DAYS">Last 3 Days</option>
                <option value="LAST_7_DAYS">Last 7 Days</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>
          )}

          {/* GMAIL STATUS BADGE */}
          <button
            onClick={onOpenGmailModal}
            className={`hidden lg:flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
              isGmailConnected
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{isGmailConnected ? 'Gmail Connected ✓' : 'Connect Gmail'}</span>
          </button>

          {/* PRIMARY CTA */}
          <button
            onClick={onStartDemo}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-cyan-500 hover:shadow-indigo-500/40 active:scale-95 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Try ICU Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
};
