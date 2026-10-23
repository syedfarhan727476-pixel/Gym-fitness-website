import React, { useState } from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { Shield, KeyRound, ArrowRight, Lock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToWebsite,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow demo passcode 'ironforge' or '1234' or any non-empty demo submission
    if (pin.trim().length > 0) {
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E31B23]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to IronForge Public Website</span>
        </button>

        <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-red-500/20 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#E31B23] flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_20px_rgba(227,27,35,0.45)]">
            <Shield className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-extrabold text-white">
              STAFF & ADMIN CONSOLE
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {GYM_CONFIG.name} • Koramangala Flagship
            </p>
          </div>

          {/* 1-Click Instant Demo Login (Recommended for testing) */}
          <div className="mb-6">
            <button
              onClick={onLoginSuccess}
              className="w-full py-4 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(227,27,35,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Instant Demo Login (Gym Manager)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-[11px] text-center text-zinc-400 mt-2">
              One-click access with preloaded demo data
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#121216] px-3 text-zinc-400 font-mono">Or enter staff PIN</span>
            </div>
          </div>

          {/* Optional PIN / Passcode input */}
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  placeholder="Demo PIN: 1234 or ironforge"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31B23]"
                />
              </div>
              {error && (
                <div className="text-xs text-red-400 mt-1">Please enter any demo PIN or click instant login above.</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold tracking-wide border border-zinc-700 transition-colors cursor-pointer"
            >
              Unlock Console with PIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
