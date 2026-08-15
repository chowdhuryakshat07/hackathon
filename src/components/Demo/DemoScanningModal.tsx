import React, { useState, useEffect } from 'react';
import { Eye, Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { TimeframeOption } from '../../types/inbox';

interface DemoScanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (timeframe: TimeframeOption) => void;
}

export const DemoScanningModal: React.FC<DemoScanningModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>('LAST_3_DAYS');
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Looking through your inbox...',
    'Reconstructing conversations...',
    'Finding what changed...',
    'Detecting actions and deadlines...',
    'ICU sees you.'
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isScanning) {
      if (currentStep < steps.length - 1) {
        const timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 400);
        return () => clearTimeout(timer);
      } else {
        const finalTimer = setTimeout(() => {
          setIsScanning(false);
          onComplete(selectedTimeframe);
        }, 500);
        return () => clearTimeout(finalTimer);
      }
    }
  }, [isScanning, currentStep, selectedTimeframe, onComplete, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* GLOW ACCENT BACKGROUND */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {!isScanning ? (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">When were you away?</h3>
                <p className="text-xs text-slate-400">Select your catch-up timeframe for AI analysis</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { id: 'YESTERDAY', label: 'Yesterday', desc: '~24 emails scanned' },
                { id: 'LAST_3_DAYS', label: 'Last 3 Days (Recommended)', desc: '~47 emails scanned' },
                { id: 'LAST_7_DAYS', label: 'Last 7 Days', desc: '~92 emails scanned' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTimeframe(opt.id as TimeframeOption)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    selectedTimeframe === opt.id
                      ? 'bg-gradient-to-r from-indigo-900/40 to-cyan-900/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold">{opt.label}</p>
                    <p className="text-[11px] text-slate-400">{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedTimeframe === opt.id ? 'border-indigo-400 bg-indigo-500/20' : 'border-slate-700'
                  }`}>
                    {selectedTimeframe === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleStartScan}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>See What I Missed</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-center">
              <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-400">Cancel</button>
            </div>
          </div>
        ) : (
          /* SCANNING STEP SEQUENCE */
          <div className="py-8 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Eye className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-white mb-2">
                {steps[currentStep]}
              </h4>
              <p className="text-xs text-indigo-300/80">AI Inbox Lifesaver active</p>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2 text-left pt-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs">
                  {idx < currentStep ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : idx === currentStep ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-700 flex-shrink-0" />
                  )}
                  <span className={idx <= currentStep ? 'text-slate-200 font-medium' : 'text-slate-600'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
