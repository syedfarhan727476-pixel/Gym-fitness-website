import React, { useState, useMemo } from 'react';
import { Member, MemberStatus } from '../../types';
import { StorageService, formatRupees, getDaysRemaining } from '../../services/storageService';
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  Activity,
  MessageCircle,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserX,
  Phone,
  Mail,
  ArrowUpDown,
} from 'lucide-react';

interface MembersManagementProps {
  members: Member[];
  onOpenAddMember: () => void;
  onOpenEditMember: (member: Member) => void;
  onOpenRenewMember: (member: Member) => void;
  onOpenProgressModal: (member: Member) => void;
  onDeleteMember: (id: string) => void;
}

export const MembersManagement: React.FC<MembersManagementProps> = ({
  members,
  onOpenAddMember,
  onOpenEditMember,
  onOpenRenewMember,
  onOpenProgressModal,
  onDeleteMember,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | MemberStatus>('All');
  const [planFilter, setPlanFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'expiry' | 'name' | 'amount'>('expiry');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter and sort members
  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          m.name.toLowerCase().includes(query) ||
          m.phone.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.planName.toLowerCase().includes(query);

        const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
        const matchesPlan = planFilter === 'All' || m.planId === planFilter;

        return matchesQuery && matchesStatus && matchesPlan;
      })
      .sort((a, b) => {
        if (sortBy === 'expiry') {
          const diff = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
          return sortOrder === 'asc' ? diff : -diff;
        }
        if (sortBy === 'name') {
          const diff = a.name.localeCompare(b.name);
          return sortOrder === 'asc' ? diff : -diff;
        }
        if (sortBy === 'amount') {
          const diff = a.amountPaid - b.amountPaid;
          return sortOrder === 'asc' ? diff : -diff;
        }
        return 0;
      });
  }, [members, searchQuery, statusFilter, planFilter, sortBy, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusBadge = (status: MemberStatus, daysRemaining: number) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Active</span>
          </span>
        );
      case 'Expiring Soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>Expiring ({daysRemaining}d)</span>
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-500/30">
            <UserX className="w-3 h-3" />
            <span>Expired ({Math.abs(daysRemaining)}d ago)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-zinc-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search member by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            {(['All', 'Active', 'Expiring Soon', 'Expired'] as const).map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs text-zinc-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="expiry" className="bg-zinc-900">Sort: Expiry</option>
              <option value="name" className="bg-zinc-900">Sort: Name</option>
              <option value="amount" className="bg-zinc-900">Sort: Amount</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="ml-1 text-[11px] font-mono text-red-400 hover:text-white"
            >
              {sortOrder === 'asc' ? '↑ ASC' : '↓ DESC'}
            </button>
          </div>

          {/* Add Member CTA */}
          <button
            onClick={onOpenAddMember}
            className="px-4 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(227,27,35,0.4)] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Member</span>
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900/90 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800 font-mono">
              <tr>
                <th scope="col" className="px-6 py-4">Lifter Profile</th>
                <th scope="col" className="px-4 py-4">Plan & Duration</th>
                <th scope="col" className="px-4 py-4">Start Date</th>
                <th scope="col" className="px-4 py-4">Expiry Date</th>
                <th scope="col" className="px-4 py-4">Status</th>
                <th scope="col" className="px-4 py-4">Paid Mode</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {paginatedMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-zinc-500">
                    No gym members found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedMembers.map((member) => {
                  const daysRemaining = getDaysRemaining(member.expiryDate);
                  const waUrl = StorageService.getWhatsAppReminderUrl(member);

                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      {/* Lifter Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                            alt={member.name}
                            className="w-10 h-10 rounded-xl object-cover border border-zinc-700 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                              {member.name}
                            </div>
                            <div className="text-xs text-zinc-400 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-zinc-500" />
                              <span>{member.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-4">
                        <div className="font-semibold text-zinc-200">{member.planName}</div>
                        <div className="text-xs text-zinc-400 font-mono">
                          {formatRupees(member.amountPaid)} ({member.durationMonths}m)
                        </div>
                      </td>

                      {/* Start Date */}
                      <td className="px-4 py-4 text-xs font-mono text-zinc-400">
                        {member.startDate}
                      </td>

                      {/* Expiry Date */}
                      <td className="px-4 py-4">
                        <div className="text-xs font-mono font-bold text-zinc-200">
                          {member.expiryDate}
                        </div>
                        <div
                          className={`text-[11px] font-medium ${
                            daysRemaining < 0
                              ? 'text-red-400'
                              : daysRemaining <= 7
                              ? 'text-amber-400 font-bold'
                              : 'text-zinc-500'
                          }`}
                        >
                          {daysRemaining < 0
                            ? `Expired ${Math.abs(daysRemaining)}d ago`
                            : daysRemaining === 0
                            ? 'Expires today!'
                            : `${daysRemaining} days left`}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {getStatusBadge(member.status, daysRemaining)}
                      </td>

                      {/* Paid Mode */}
                      <td className="px-4 py-4 text-xs font-mono text-zinc-300">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800">
                          {member.paymentMode}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1-Click Renew */}
                          <button
                            onClick={() => onOpenRenewMember(member)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-emerald-950/80 text-emerald-400 border border-zinc-800 hover:border-emerald-500/40 transition-colors cursor-pointer"
                            title="Renew Membership"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>

                          {/* Member Transformation Progress Tracker */}
                          <button
                            onClick={() => onOpenProgressModal(member)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/80 text-red-400 border border-zinc-800 hover:border-red-500/40 transition-colors cursor-pointer"
                            title="View / Log Body Transformation Progress"
                          >
                            <Activity className="w-4 h-4" />
                          </button>

                          {/* WhatsApp Reminder */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-emerald-900/60 text-emerald-400 border border-zinc-800 hover:border-emerald-500/40 transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Send WhatsApp Reminder Message"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Edit */}
                          <button
                            onClick={() => onOpenEditMember(member)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                            title="Edit Member Details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove ${member.name}?`)) {
                                onDeleteMember(member.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/80 text-zinc-500 hover:text-red-400 border border-zinc-800 transition-colors cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div>
            Showing <span className="font-bold text-white">{paginatedMembers.length}</span> of{' '}
            <span className="font-bold text-white">{filteredMembers.length}</span> members
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-mono text-zinc-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
