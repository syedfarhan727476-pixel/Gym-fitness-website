import React from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import {
  Shield,
  LayoutDashboard,
  Users,
  CheckCircle,
  CreditCard,
  Activity,
  RotateCcw,
  ExternalLink,
  BellRing,
  LogOut,
  Download,
} from 'lucide-react';

export type AdminTab = 'overview' | 'members' | 'attendance' | 'payments' | 'expiring';

interface AdminHeaderProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  onResetData: () => void;
  expiringCount: number;
  todayAttendanceCount: number;
  onExportMembersCSV: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  onResetData,
  expiringCount,
  todayAttendanceCount,
  onExportMembersCSV,
}) => {
  return (
    <header className="glass-panel border-b border-zinc-800 sticky top-0 z-40 bg-[#0C0C0E]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E31B23] to-[#900] flex items-center justify-center text-white shadow-[0_0_12px_rgba(227,27,35,0.4)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-bold text-white tracking-wider">
                  {GYM_CONFIG.shortName} <span className="text-[#E31B23]">STAFF PORTAL</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-500/30">
                  Manager Mode
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                Koramangala 4th Block Arena • Live Reception Console
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Reset Demo Data Button */}
            <button
              onClick={onResetData}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset sample members and logs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            {/* Export CSV button */}
            <button
              onClick={onExportMembersCSV}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>Export CSV</span>
            </button>

            {/* Switch to Public Website */}
            <button
              onClick={onExitAdmin}
              className="px-3.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-950/80 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => onSelectTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'overview'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#E31B23]" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => onSelectTab('members')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'members'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Users className="w-4 h-4 text-[#E31B23]" />
            <span>Members & Plans</span>
          </button>

          <button
            onClick={() => onSelectTab('attendance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'attendance'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-[#E31B23]" />
            <span>Quick Check-In</span>
            {todayAttendanceCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-zinc-700 text-zinc-200 text-[10px] font-mono">
                {todayAttendanceCount} today
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('expiring')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'expiring'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <BellRing className="w-4 h-4 text-amber-400" />
            <span>Expiring Soon Alerts</span>
            {expiringCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold animate-pulse">
                {expiringCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('payments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'payments'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#E31B23]" />
            <span>Payment Log</span>
          </button>
        </div>
      </div>
    </header>
  );
};
