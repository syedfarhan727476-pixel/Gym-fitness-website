import React, { useState } from 'react';
import { Member, PaymentMode } from '../../types';
import { GYM_CONFIG } from '../../config/gymConfig';
import { formatRupees, getDaysRemaining } from '../../services/storageService';
import { X, RefreshCw, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RenewalModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onConfirmRenewal: (
    memberId: string,
    planId: string,
    paymentMode: PaymentMode,
    amount: number,
    notes?: string
  ) => void;
}

export const RenewalModal: React.FC<RenewalModalProps> = ({
  isOpen,
  member,
  onClose,
  onConfirmRenewal,
}) => {
  if (!isOpen || !member) return null;

  const currentPlan = GYM_CONFIG.plans.find((p) => p.id === member.planId) || GYM_CONFIG.plans[0];
  const [selectedPlanId, setSelectedPlanId] = useState(member.planId);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('UPI');
  const [notes, setNotes] = useState('');

  const chosenPlan = GYM_CONFIG.plans.find((p) => p.id === selectedPlanId) || currentPlan;
  const daysLeft = getDaysRemaining(member.expiryDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#E31B23', '#ffffff'],
    });

    onConfirmRenewal(
      member.id,
      selectedPlanId,
      paymentMode,
      chosenPlan.price,
      notes || `Renewed for ${chosenPlan.name}`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              RENEW MEMBERSHIP
            </h3>
            <p className="text-xs text-zinc-400">
              Extend membership & generate payment receipt
            </p>
          </div>
        </div>

        {/* Member Quick Summary */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={member.name}
              className="w-11 h-11 rounded-xl object-cover border border-zinc-700 shrink-0"
            />
            <div>
              <div className="font-bold text-white text-sm">{member.name}</div>
              <div className="text-xs text-zinc-400">{member.phone}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-400">Current Expiry:</div>
            <div className="font-mono text-xs font-bold text-white">{member.expiryDate}</div>
            <div
              className={`text-[10px] font-semibold ${
                daysLeft < 0 ? 'text-red-400' : daysLeft <= 7 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {daysLeft < 0 ? `Expired ${Math.abs(daysLeft)}d ago` : `${daysLeft} days remaining`}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plan Choice */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Select Renewal Package
            </label>
            <div className="grid grid-cols-2 gap-2">
              {GYM_CONFIG.plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedPlanId === p.id
                      ? 'bg-zinc-800 border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{p.name}</div>
                  <div className="text-sm font-heading font-extrabold text-emerald-400 mt-0.5">
                    {formatRupees(p.price)}
                  </div>
                  <div className="text-[10px] text-zinc-500">+{p.durationMonths} Months Extension</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Payment Mode Received
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['UPI', 'Cash', 'Card'] as PaymentMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPaymentMode(mode)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    paymentMode === mode
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {mode === 'UPI' ? '⚡ UPI / GPay' : mode === 'Cash' ? '💵 Cash' : '💳 Card'}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Payment Remarks (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Paid via PhonePe, festive renewal promo applied"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-medium">Auto-renew receipt total:</span>
            <span className="font-heading text-xl font-bold text-white">
              {formatRupees(chosenPlan.price)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>Confirm Renewal & Extend Expiry Date</span>
          </button>
        </form>
      </div>
    </div>
  );
};
