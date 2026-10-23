import React, { useState, useMemo } from 'react';
import { PaymentRecord, PaymentMode } from '../../types';
import { StorageService, formatRupees } from '../../services/storageService';
import { CreditCard, Download, Search, Filter, Receipt, Calendar, ArrowUpDown } from 'lucide-react';

interface PaymentsLogProps {
  payments: PaymentRecord[];
  onExportCSV: () => void;
}

export const PaymentsLog: React.FC<PaymentsLogProps> = ({ payments, onExportCSV }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<'All' | PaymentMode>('All');

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        p.memberName.toLowerCase().includes(q) ||
        p.memberPhone.includes(q) ||
        p.receiptNo.toLowerCase().includes(q) ||
        p.planName.toLowerCase().includes(q);

      const matchesMode = modeFilter === 'All' || p.paymentMode === modeFilter;
      return matchesQuery && matchesMode;
    });
  }, [payments, searchQuery, modeFilter]);

  const totalCollected = useMemo(() => {
    return filteredPayments.reduce((acc, p) => acc + p.amount, 0);
  }, [filteredPayments]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Stats */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2 border border-zinc-800">
            <Receipt className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>Financial Receipts Ledger</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            MEMBERSHIP PAYMENTS & CASHFLOW
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Real-time transaction receipts with GST compliance records and exportable audit trail.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-right">
            <div className="text-xs text-zinc-400">Total Filtered Volume</div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {formatRupees(totalCollected)}
            </div>
          </div>

          <button
            onClick={onExportCSV}
            className="px-5 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(227,27,35,0.4)] transition-all cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Payments CSV</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by receipt no, member, phone, or plan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto overflow-x-auto">
          {(['All', 'UPI', 'Cash', 'Card', 'NetBanking'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setModeFilter(mode as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                modeFilter === mode
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/90 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800 font-mono">
              <tr>
                <th className="px-6 py-4">Receipt No</th>
                <th className="px-4 py-4">Date & Time</th>
                <th className="px-4 py-4">Member</th>
                <th className="px-4 py-4">Plan / Duration</th>
                <th className="px-4 py-4">Payment Mode</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-zinc-500">
                    No payment records found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-white">
                      {p.receiptNo}
                    </td>
                    <td className="px-4 py-4 text-xs font-mono text-zinc-400">
                      <div>{p.date}</div>
                      <div className="text-[11px] text-zinc-500">{p.time}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-white text-xs">{p.memberName}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{p.memberPhone}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-zinc-300">
                      {p.planName} ({p.durationMonths}m)
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 font-mono text-zinc-300">
                        {p.paymentMode}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-heading text-lg font-bold text-emerald-400">
                      {formatRupees(p.amount)}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400 text-right italic">
                      {p.notes || 'Routine subscription'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
