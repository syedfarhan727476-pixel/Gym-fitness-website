import React, { useState, useMemo } from 'react';
import { Member, AttendanceRecord } from '../../types';
import { formatYMD } from '../../services/storageService';
import {
  CheckCircle,
  Clock,
  UserCheck,
  Search,
  Calendar,
  Sparkles,
  Phone,
  Flame,
  Award,
} from 'lucide-react';

interface AttendanceTrackerProps {
  members: Member[];
  attendance: AttendanceRecord[];
  onCheckIn: (memberIdOrPhone: string) => { success: boolean; message: string; record?: AttendanceRecord };
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  members,
  attendance,
  onCheckIn,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [toastMessage, setToastMessage] = useState<{ text: string; isSuccess: boolean } | null>(null);
  const [selectedMemberForHistory, setSelectedMemberForHistory] = useState<string | null>(null);

  const todayStr = formatYMD(new Date());

  // Today's records
  const todayRecords = useMemo(() => {
    return attendance.filter((a) => a.date === todayStr);
  }, [attendance, todayStr]);

  // Autocomplete suggestions based on input
  const suggestions = useMemo(() => {
    if (!searchInput.trim() || searchInput.length < 2) return [];
    const query = searchInput.toLowerCase();
    return members
      .filter((m) => m.name.toLowerCase().includes(query) || m.phone.includes(query))
      .slice(0, 5);
  }, [members, searchInput]);

  const handlePerformCheckIn = (idOrPhone: string) => {
    const res = onCheckIn(idOrPhone);
    setToastMessage({ text: res.message, isSuccess: res.success });
    setSearchInput('');
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Selected member attendance dates
  const memberAttendanceDates = useMemo(() => {
    if (!selectedMemberForHistory) return [];
    return attendance
      .filter((a) => a.memberId === selectedMemberForHistory)
      .map((a) => ({ date: a.date, time: a.checkInTime }));
  }, [attendance, selectedMemberForHistory]);

  const selectedMemberObj = members.find((m) => m.id === selectedMemberForHistory);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center gap-3 shadow-2xl animate-in slide-in-from-top-4 duration-300 ${
            toastMessage.isSuccess
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
              : 'bg-red-950/90 text-red-300 border-red-500/50'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              toastMessage.isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">{toastMessage.text}</div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Fast Check-In Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>Smart Biometric / Reception Console</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            QUICK LIFTER CHECK-IN
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Type lifter name or mobile number and press enter. Simulates reception tablet scanner.
          </p>
        </div>

        {/* Input Bar */}
        <div className="relative max-w-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.trim()) {
                handlePerformCheckIn(searchInput);
              }
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Enter member name (e.g. Rohan) or phone (+91 98...)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31B23] shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={!searchInput.trim()}
              className="px-6 py-3 rounded-2xl bg-[#E31B23] hover:bg-[#c91219] disabled:opacity-40 text-white text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(227,27,35,0.4)] transition-all cursor-pointer shrink-0"
            >
              Mark In
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass-panel-elevated border border-zinc-700 p-2 shadow-2xl z-30 space-y-1">
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-zinc-500">
                Select lifter to check in:
              </div>
              {suggestions.map((m) => {
                const isAlreadyIn = todayRecords.some((a) => a.memberId === m.id);

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handlePerformCheckIn(m.id)}
                    className="w-full p-2.5 rounded-xl hover:bg-zinc-800 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={m.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-red-400">
                          {m.name}
                        </div>
                        <div className="text-[11px] text-zinc-400">{m.phone}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isAlreadyIn ? (
                        <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30">
                          Checked In Today
                        </span>
                      ) : (
                        <span className="text-xs text-red-400 font-bold group-hover:underline">
                          Tap to Check In →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Today's Checkins & Member Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Live Attendance */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-3xl border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-2xl font-bold text-white">
                  TODAY'S ATTENDANCE LOG
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  {todayRecords.length} Lifters
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Date: {todayStr} • Floor status active
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900/90 uppercase font-mono text-[11px] text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Lifter</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Check-In Time</th>
                  <th className="px-4 py-3 text-right">View History</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {todayRecords.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-zinc-500">
                      No check-ins logged yet today. Use the search bar above to log morning lifters!
                    </td>
                  </tr>
                ) : (
                  todayRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-white">{rec.memberName}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{rec.memberPhone}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{rec.planName}</td>
                      <td className="px-4 py-3 font-mono font-bold text-emerald-400 flex items-center gap-1.5 pt-4">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{rec.checkInTime}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedMemberForHistory(rec.memberId)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium cursor-pointer"
                        >
                          Calendar Log
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Member Attendance History & Frequency */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-2xl font-bold text-white">
                MEMBER ATTENDANCE LOG
              </h3>
              <Calendar className="w-4 h-4 text-[#E31B23]" />
            </div>

            {/* Member picker dropdown */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Select Member to view streak
              </label>
              <select
                value={selectedMemberForHistory || (members[0]?.id || '')}
                onChange={(e) => setSelectedMemberForHistory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#E31B23]"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.planName})
                  </option>
                ))}
              </select>
            </div>

            {selectedMemberObj && (
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{selectedMemberObj.name}</div>
                  <div className="text-xs text-zinc-400">{selectedMemberObj.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Total Logged Sessions:</div>
                  <div className="font-heading text-2xl font-extrabold text-white">
                    {memberAttendanceDates.length} Days
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Recent Check-in Timestamps:
            </div>

            <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
              {memberAttendanceDates.length === 0 ? (
                <div className="p-4 rounded-xl bg-zinc-900/50 text-xs text-zinc-500 text-center">
                  No attendance history logged yet for this member.
                </div>
              ) : (
                memberAttendanceDates.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="font-mono text-zinc-300">{item.date}</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{item.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>Streak analysis calculates consistency percentage</span>
            <span className="text-emerald-400 font-bold">95%+ Regular</span>
          </div>
        </div>
      </div>
    </div>
  );
};
