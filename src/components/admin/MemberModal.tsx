import React, { useState, useEffect } from 'react';
import { Member, PaymentMode } from '../../types';
import { GYM_CONFIG } from '../../config/gymConfig';
import { formatYMD, addMonths } from '../../services/storageService';
import { X, UserPlus, Check, Sparkles } from 'lucide-react';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Partial<Member> & { name: string; phone: string; planId: string }) => void;
  initialMember?: Member | null;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMember,
}) => {
  const isEditing = Boolean(initialMember?.id);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [planId, setPlanId] = useState(GYM_CONFIG.plans[0].id);
  const [startDate, setStartDate] = useState(formatYMD(new Date()));
  const [expiryDate, setExpiryDate] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('UPI');
  const [amountPaid, setAmountPaid] = useState<number>(GYM_CONFIG.plans[0].price);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(75);
  const [goalWeightKg, setGoalWeightKg] = useState<number>(70);
  const [notes, setNotes] = useState('');

  // Auto calculate expiry date when plan or start date changes
  useEffect(() => {
    if (initialMember && isEditing) {
      setName(initialMember.name);
      setPhone(initialMember.phone);
      setEmail(initialMember.email);
      setAvatar(initialMember.avatar || '');
      setPlanId(initialMember.planId);
      setStartDate(initialMember.startDate);
      setExpiryDate(initialMember.expiryDate);
      setPaymentMode(initialMember.paymentMode);
      setAmountPaid(initialMember.amountPaid);
      setCurrentWeightKg(initialMember.currentWeightKg || 75);
      setGoalWeightKg(initialMember.goalWeightKg || 70);
      setNotes(initialMember.notes || '');
    } else {
      // New member defaults
      setName('');
      setPhone('+91 ');
      setEmail('');
      setAvatar('');
      const defaultPlan = GYM_CONFIG.plans[1]; // Quarterly default
      setPlanId(defaultPlan.id);
      const today = new Date();
      const todayStr = formatYMD(today);
      setStartDate(todayStr);
      const calcExpiry = formatYMD(addMonths(today, defaultPlan.durationMonths));
      setExpiryDate(calcExpiry);
      setAmountPaid(defaultPlan.price);
      setPaymentMode('UPI');
      setCurrentWeightKg(78);
      setGoalWeightKg(72);
      setNotes('');
    }
  }, [initialMember, isOpen, isEditing]);

  const handlePlanChange = (newPlanId: string) => {
    setPlanId(newPlanId);
    const plan = GYM_CONFIG.plans.find((p) => p.id === newPlanId);
    if (plan) {
      setAmountPaid(plan.price);
      const start = new Date(startDate);
      const exp = addMonths(start, plan.durationMonths);
      setExpiryDate(formatYMD(exp));
    }
  };

  const handleStartDateChange = (newStartDate: string) => {
    setStartDate(newStartDate);
    const plan = GYM_CONFIG.plans.find((p) => p.id === planId);
    if (plan && newStartDate) {
      const start = new Date(newStartDate);
      const exp = addMonths(start, plan.durationMonths);
      setExpiryDate(formatYMD(exp));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onSave({
      id: initialMember?.id,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      avatar: avatar.trim() || undefined,
      planId,
      startDate,
      expiryDate,
      paymentMode,
      amountPaid: Number(amountPaid),
      currentWeightKg: Number(currentWeightKg),
      goalWeightKg: Number(goalWeightKg),
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-zinc-700 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#E31B23] flex items-center justify-center text-white shadow-[0_0_15px_rgba(227,27,35,0.4)]">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {isEditing ? 'EDIT MEMBER PROFILE' : 'ENROLL NEW GYM MEMBER'}
            </h3>
            <p className="text-xs text-zinc-400">
              {isEditing ? 'Update membership duration or contact information' : 'Record admission & auto-compute expiry date'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rohan Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98450 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          </div>

          {/* Row 2: Email & Optional Avatar URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="rohan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Photo URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          </div>

          {/* Row 3: Plan selection */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-red-400">
                Membership Plan & Duration
              </label>
              <span className="text-[11px] text-zinc-500 font-mono">
                Auto-calculates expiry
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GYM_CONFIG.plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePlanChange(p.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    planId === p.id
                      ? 'bg-zinc-800 border-[#E31B23] text-white shadow-[0_0_12px_rgba(227,27,35,0.3)]'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{p.name}</div>
                  <div className="text-xs text-red-400 font-mono mt-0.5">₹{p.price}</div>
                  <div className="text-[10px] text-zinc-500">{p.durationMonths}m duration</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Start Date & Auto Expiry Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Start Date (YYYY-MM-DD)
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Expiry Date (Auto Calculated)
              </label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          </div>

          {/* Row 5: Payment Mode & Amount Paid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              >
                <option value="UPI">⚡ UPI / Google Pay / PhonePe</option>
                <option value="Cash">💵 Cash @ Desk</option>
                <option value="Card">💳 Credit / Debit Card</option>
                <option value="NetBanking">🏦 NetBanking Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Amount Paid (₹)
              </label>
              <input
                type="number"
                required
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          </div>

          {/* Row 6: Weights for Transformation Tracker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Starting / Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={currentWeightKg}
                onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Target / Goal Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={goalWeightKg}
                onChange={(e) => setGoalWeightKg(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Trainer Notes & Medical History
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Lower back stiffness, aims for 100kg bench, high protein diet recommended"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white text-xs font-bold shadow-[0_0_20px_rgba(227,27,35,0.4)] cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Confirm Admission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
