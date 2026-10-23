import React, { useState } from 'react';
import { Member } from '../../types';
import { StorageService, formatRupees, getDaysRemaining } from '../../services/storageService';
import {
  BellRing,
  MessageCircle,
  RefreshCw,
  AlertTriangle,
  Clock,
  Phone,
  CheckCircle2,
  Send,
  Sparkles,
} from 'lucide-react';

interface ExpiringSoonDrawerProps {
  members: Member[];
  onOpenRenewMember: (member: Member) => void;
}

export const ExpiringSoonDrawer: React.FC<ExpiringSoonDrawerProps> = ({
  members,
  onOpenRenewMember,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'expiring' | 'expired'>('expiring');

  const expiringMembers = members.filter((m) => m.status === 'Expiring Soon');
  const expiredMembers = members.filter((m) => m.status === 'Expired');

  const displayedList =
    filterType === 'all'
      ? [...expiringMembers, ...expiredMembers]
      : filterType === 'expiring'
      ? expiringMembers
      : expiredMembers;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/40">
            <BellRing className="w-3.5 h-3.5" />
            <span>High Priority Retention List</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            WHATSAPP RENEWAL ASSISTANT
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
            Members approaching expiry or expired recently. Click <span className="text-emerald-400 font-bold">"WhatsApp Reminder"</span> to open WhatsApp with a custom prefilled Hinglish reminder.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 shrink-0">
          <button
            onClick={() => setFilterType('expiring')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'expiring'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Expiring in 7 Days ({expiringMembers.length})
          </button>
          <button
            onClick={() => setFilterType('expired')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'expired'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Expired ({expiredMembers.length})
          </button>
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-zinc-800 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Actionable ({expiringMembers.length + expiredMembers.length})
          </button>
        </div>
      </div>

      {/* Member Cards Grid */}
      {displayedList.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="font-heading text-2xl font-bold text-white">
            SAB FIT HAI! NO PENDING EXPIRATIONS
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            All active members have healthy balances for more than 7 days.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedList.map((member) => {
            const daysRemaining = getDaysRemaining(member.expiryDate);
            const isExpired = daysRemaining < 0;
            const waUrl = StorageService.getWhatsAppReminderUrl(member);

            return (
              <div
                key={member.id}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isExpired
                    ? 'border-red-500/30 hover:border-red-500/60'
                    : 'border-amber-500/30 hover:border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold font-mono px-3 py-1 rounded-full border ${
                        isExpired
                          ? 'bg-red-950/80 text-red-400 border-red-500/40'
                          : 'bg-amber-950/80 text-amber-400 border-amber-500/40 animate-pulse'
                      }`}
                    >
                      {isExpired
                        ? `Expired ${Math.abs(daysRemaining)} Days Ago`
                        : daysRemaining === 0
                        ? 'Expires Today!'
                        : `Expires in ${daysRemaining} Days`}
                    </span>

                    <span className="text-xs text-zinc-400 font-mono">
                      {member.expiryDate}
                    </span>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={member.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-zinc-700 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-white text-base leading-snug">
                        {member.name}
                      </h4>
                      <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Plan details */}
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs space-y-1 mb-4">
                    <div className="flex justify-between text-zinc-400">
                      <span>Current Plan:</span>
                      <span className="font-semibold text-zinc-200">{member.planName}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Last Paid:</span>
                      <span className="font-mono text-zinc-200">
                        {formatRupees(member.amountPaid)} via {member.paymentMode}
                      </span>
                    </div>
                  </div>

                  {/* Message Preview preview */}
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed italic mb-4">
                    "{isExpired ? 'Fitness streak break mat hone do boss! Aaj hi renew karein...' : `Reminder from ${member.name} ji: Aapka membership agle ${daysRemaining} dino mein expire hone wala hai...`}"
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Reminder</span>
                  </a>

                  <button
                    onClick={() => onOpenRenewMember(member)}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
                    title="Direct Renew"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Renew</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
