import React, { useState } from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { StorageService, formatRupees } from '../../services/storageService';
import { PaymentMode } from '../../types';
import { X, Check, Dumbbell, ShieldCheck, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
  onSuccess: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId = 'quarterly',
  onSuccess,
}) => {
  const [planId, setPlanId] = useState<string>(selectedPlanId);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('UPI');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const currentPlan = GYM_CONFIG.plans.find((p) => p.id === planId) || GYM_CONFIG.plans[1];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save as official gym member in storage
    StorageService.saveMember({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      planId: currentPlan.id,
      paymentMode,
      amountPaid: currentPlan.price,
      notes: 'Joined via public website portal',
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E31B23', '#FDE047', '#ffffff'],
    });

    setIsDone(true);
    onSuccess();
  };

  const handleWhatsAppInquiry = () => {
    const waText = `Namaste IronForge Gym! My name is ${name || 'Fitness Enthusiast'}. I am interested in joining the *${currentPlan.name}* (₹${currentPlan.price}) plan. Please send admission details!`;
    const waUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-red-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-white">
              BADHAI HO! YOU'RE IN THE CLAN!
            </h3>
            <p className="text-zinc-300 text-sm max-w-md mx-auto">
              Welcome to the IronForge family, <span className="text-white font-bold">{name}</span>! Your membership for{' '}
              <span className="text-[#E31B23] font-bold">{currentPlan.name}</span> has been confirmed. Biometric registration can be done at reception on your first visit.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppInquiry}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Receive Receipt on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-500/40 text-[#E31B23] flex items-center justify-center">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Direct Admission
              </span>
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              JOIN THE <span className="text-gradient-red">IRONFORGE CLAN</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Instant activation. Lock in current introductory rates before tier hike.
            </p>

            {/* Plan Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Select Your Plan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GYM_CONFIG.plans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanId(p.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      planId === p.id
                        ? 'bg-zinc-800/90 border-red-500 text-white shadow-[0_0_15px_rgba(227,27,35,0.3)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{p.name}</div>
                    <div className="text-sm font-heading font-extrabold text-white mt-0.5">
                      {formatRupees(p.price)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="vikram@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Payment Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Cash', 'Card'] as PaymentMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMode(mode)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        paymentMode === mode
                          ? 'bg-[#E31B23] text-white border-[#E31B23]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      {mode === 'UPI' ? '⚡ UPI / GPay' : mode === 'Cash' ? '💵 Cash @ Desk' : '💳 Card Swipe'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Total payable today:</span>
                <span className="font-heading text-xl font-bold text-white">
                  {formatRupees(currentPlan.price)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(227,27,35,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm Admission & Join</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Or inquire via WhatsApp first</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
