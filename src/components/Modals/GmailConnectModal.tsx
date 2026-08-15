import React, { useState } from 'react';
import { X, Mail, ShieldCheck, CheckCircle2, ChevronDown, Settings } from 'lucide-react';

interface GmailConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGmailConnected: boolean;
  userEmail?: string;
  onGoogleSignIn: () => void;
  customClientId: string;
  onSaveCustomClientId: (id: string) => void;
}

export const GmailConnectModal: React.FC<GmailConnectModalProps> = ({
  isOpen,
  onClose,
  isGmailConnected,
  userEmail,
  onGoogleSignIn,
  customClientId,
  onSaveCustomClientId
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleSignInClick = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onGoogleSignIn();
      setIsAuthenticating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 p-6 sm:p-8 space-y-6 text-center relative overflow-hidden shadow-2xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center text-left border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Connect Your Gmail</h3>
              <p className="text-[11px] text-slate-400">Read-only inbox priority analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-left">
          Sign in with your Google account to let ICU organize what you missed by priority (Urgent 🔴, Important 🟠, Info 🟢).
        </p>

        {isGmailConnected ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Google Account Connected ({userEmail || 'Active'})</span>
            </div>

            <button
              onClick={handleSignInClick}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs border border-slate-700 transition-all"
            >
              Switch or Re-authorize Google Account
            </button>
          </div>
        ) : (
          /* 1-CLICK GOOGLE SIGN IN BUTTON FOR EVERYDAY USERS */
          <div className="space-y-3">
            <button
              onClick={handleSignInClick}
              disabled={isAuthenticating}
              className="w-full py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-xl flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              {isAuthenticating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                  <span className="text-xs">Connecting & Organizing Inbox...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-semibold text-xs border border-slate-800 transition-all"
            >
              Continue with Instant Demo Mode
            </button>
          </div>
        )}

        {/* OPTIONAL DEVELOPER ACCORDION */}
        <div className="pt-2 text-left border-t border-slate-800/80">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-[11px] text-slate-500 hover:text-slate-400 font-semibold flex items-center space-x-1"
          >
            <span>{showAdvanced ? '▼ Hide Developer Settings' : '▶ Custom GCP OAuth Client ID (Developer Option)'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Custom Google OAuth Client ID</label>
              <input
                type="text"
                value={customClientId}
                onChange={(e) => onSaveCustomClientId(e.target.value)}
                placeholder="Paste your custom GCP OAuth Client ID..."
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official Google Identity OAuth 2.0 • SSL Encrypted</span>
        </div>

      </div>
    </div>
  );
};
