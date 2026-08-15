import React from 'react';
import { LayoutDashboard, Zap, Calendar, RefreshCw, MessageSquare, Trash2, Settings, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  urgentCount: number;
  actionCount: number;
  changeCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  urgentCount,
  actionCount,
  changeCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Catch Up',
      icon: LayoutDashboard,
      badge: urgentCount > 0 ? `${urgentCount} Urgent` : null,
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    },
    {
      id: 'actions',
      label: 'What Needs Me',
      icon: Zap,
      badge: `${actionCount}`,
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'deadlines',
      label: 'Deadline Radar',
      icon: Calendar,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'changes',
      label: 'What Changed',
      icon: RefreshCw,
      badge: `${changeCount} New`,
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'conversations',
      label: 'Important Conversations',
      icon: MessageSquare,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'low-priority',
      label: 'Low Priority',
      icon: Trash2,
      badge: '30',
      badgeColor: 'bg-slate-800 text-slate-400 border-slate-700'
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#080c14] p-4 hidden md:flex md:flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">Inbox Intelligence</p>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-cyan-600/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* FOOTER SETTINGS & PRIVACY */}
      <div className="space-y-2 pt-4 border-t border-white/10">
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            currentView === 'settings'
              ? 'bg-indigo-600/30 text-white border border-indigo-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Settings & Privacy</span>
        </button>

        <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-3 text-[11px] text-slate-400 flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>Private & Encrypted Demo</span>
        </div>
      </div>
    </aside>
  );
};
