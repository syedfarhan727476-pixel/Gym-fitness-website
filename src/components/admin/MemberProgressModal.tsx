import React, { useState, useEffect, useMemo } from 'react';
import { Member, ProgressEntry } from '../../types';
import { StorageService, formatYMD } from '../../services/storageService';
import {
  X,
  Activity,
  Plus,
  Scale,
  TrendingDown,
  TrendingUp,
  Target,
  Trash2,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import confetti from 'canvas-confetti';

interface MemberProgressModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onRefreshMembers: () => void;
}

export const MemberProgressModal: React.FC<MemberProgressModalProps> = ({
  isOpen,
  member,
  onClose,
  onRefreshMembers,
}) => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [date, setDate] = useState(formatYMD(new Date()));
  const [weightKg, setWeightKg] = useState<number>(75);
  const [bodyFatPercent, setBodyFatPercent] = useState<number>(20);
  const [chestInches, setChestInches] = useState<number>(40);
  const [waistInches, setWaistInches] = useState<number>(34);
  const [armsInches, setArmsInches] = useState<number>(15);
  const [trainerNotes, setTrainerNotes] = useState('');

  useEffect(() => {
    if (member && isOpen) {
      loadProgress();
      if (member.currentWeightKg) {
        setWeightKg(member.currentWeightKg);
      }
    }
  }, [member, isOpen]);

  const loadProgress = () => {
    if (!member) return;
    const list = StorageService.getProgress(member.id);
    setEntries(list);
  };

  if (!isOpen || !member) return null;

  const currentWeight = entries.length > 0 ? entries[entries.length - 1].weightKg : (member.currentWeightKg || 75);
  const startingWeight = entries.length > 0 ? entries[0].weightKg : currentWeight;
  const goalWeight = member.goalWeightKg || 70;

  // Weight progress calculations
  const totalWeightDifference = Math.abs(startingWeight - goalWeight);
  const currentDifference = Math.abs(startingWeight - currentWeight);
  const progressPercent =
    totalWeightDifference > 0
      ? Math.min(100, Math.round((currentDifference / totalWeightDifference) * 100))
      : 100;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member || !weightKg) return;

    StorageService.saveProgressEntry({
      memberId: member.id,
      date,
      weightKg: Number(weightKg),
      bodyFatPercent: bodyFatPercent ? Number(bodyFatPercent) : undefined,
      chestInches: chestInches ? Number(chestInches) : undefined,
      waistInches: waistInches ? Number(waistInches) : undefined,
      armsInches: armsInches ? Number(armsInches) : undefined,
      trainerNotes: trainerNotes.trim() || undefined,
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E31B23', '#FDE047', '#ffffff'],
    });

    loadProgress();
    onRefreshMembers();
    setShowAddForm(false);
    setTrainerNotes('');
  };

  const handleDeleteEntry = (id: string) => {
    StorageService.deleteProgressEntry(id);
    loadProgress();
    onRefreshMembers();
  };

  // Recharts chart formatted data
  const chartData = entries.map((e) => ({
    date: e.date.slice(5), // 'MM-DD'
    weight: e.weightKg,
    bodyFat: e.bodyFatPercent,
    waist: e.waistInches,
    arms: e.armsInches,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-red-500/30 max-h-[92vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <img
              src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={member.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-red-500/40 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-3xl font-extrabold text-white">
                  {member.name}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 font-mono font-bold border border-red-500/30">
                  {member.planName}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Transformation Metrics & Body Composition Tracker • {member.phone}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(227,27,35,0.4)] transition-all cursor-pointer self-start sm:self-center"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{showAddForm ? 'Close Log Form' : 'Log New Metrics'}</span>
          </button>
        </div>

        {/* Goal Indicator & Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-panel p-4 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Starting Weight</div>
            <div className="font-heading text-3xl font-bold text-white mt-1">
              {startingWeight} <span className="text-sm font-sans text-zinc-500">kg</span>
            </div>
            <div className="text-[11px] text-zinc-500">First recorded baseline</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Current Weight</div>
            <div className="font-heading text-3xl font-bold text-emerald-400 mt-1">
              {currentWeight} <span className="text-sm font-sans text-zinc-500">kg</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              <span>{Math.abs(startingWeight - currentWeight).toFixed(1)} kg shifted</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Target Goal</div>
            <div className="font-heading text-3xl font-bold text-red-400 mt-1">
              {goalWeight} <span className="text-sm font-sans text-zinc-500">kg</span>
            </div>
            <div className="text-[11px] text-zinc-500">Target transformation mark</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Goal Achievement</div>
            <div className="font-heading text-3xl font-bold text-white mt-1">
              {progressPercent}%
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Add Entry Form Dropdown */}
        {showAddForm && (
          <form
            onSubmit={handleAddEntry}
            className="glass-panel p-6 rounded-3xl border border-red-500/40 mb-6 space-y-4 animate-in slide-in-from-top-4 duration-300"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E31B23]" />
                <span>LOG TRANSFORMATION ENTRY</span>
              </h4>
              <span className="text-xs text-zinc-400 font-mono">Date: {date}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Log Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Body Fat (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bodyFatPercent}
                  onChange={(e) => setBodyFatPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Chest (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={chestInches}
                  onChange={(e) => setChestInches(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Waist (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={waistInches}
                  onChange={(e) => setWaistInches(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Arms (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={armsInches}
                  onChange={(e) => setArmsInches(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                Trainer Assessment & Diet Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Waist trimmed by 1 inch, added 20g protein daily, deadlift up 15kg"
                value={trainerNotes}
                onChange={(e) => setTrainerNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Save Transformation Entry
              </button>
            </div>
          </form>
        )}

        {/* Charts: Weight Trend & Body Fat Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weight Line Chart */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading text-xl font-bold text-white">
                  WEIGHT PROGRESS OVER TIME (KG)
                </h4>
                <p className="text-[11px] text-zinc-400">Target Goal: {goalWeight} kg</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Current: {currentWeight} kg
              </span>
            </div>

            <div className="h-56 w-full">
              {chartData.length < 2 ? (
                <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                  Log at least 2 check-ins to view weight trend line.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                    <XAxis dataKey="date" stroke="#71717A" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717A" fontSize={11} domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#121216',
                        border: '1px solid #3F3F46',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}
                      formatter={(val: any) => [`${val} kg`, 'Body Weight']}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#E31B23"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#E31B23', stroke: '#ffffff', strokeWidth: 1.5 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Body Fat / Waist Chart */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading text-xl font-bold text-white">
                  BODY FAT % & WAIST (INCHES)
                </h4>
                <p className="text-[11px] text-zinc-400">Composition decomposition</p>
              </div>
            </div>

            <div className="h-56 w-full">
              {chartData.length < 2 ? (
                <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                  Log at least 2 check-ins to view body fat progression.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                    <XAxis dataKey="date" stroke="#71717A" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717A" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#121216',
                        border: '1px solid #3F3F46',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bodyFat"
                      name="Body Fat %"
                      stroke="#FDE047"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#FDE047' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="waist"
                      name="Waist (in)"
                      stroke="#38BDF8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 3, fill: '#38BDF8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="glass-panel rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="px-5 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <h4 className="font-heading text-lg font-bold text-white">
              TRANSFORMATION LOG HISTORY ({entries.length})
            </h4>
            <span className="text-xs text-zinc-400">Chronological trainer entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900/60 uppercase font-mono text-[10px] text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Weight (kg)</th>
                  <th className="px-4 py-3">Body Fat</th>
                  <th className="px-4 py-3">Chest / Waist / Arms</th>
                  <th className="px-4 py-3">Coach Assessment Notes</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-zinc-500">
                      No measurements logged yet. Click "Log New Metrics" to record baseline!
                    </td>
                  </tr>
                ) : (
                  [...entries].reverse().map((entry) => (
                    <tr key={entry.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-white">
                        {entry.date}
                      </td>
                      <td className="px-4 py-3 font-heading text-base font-bold text-emerald-400">
                        {entry.weightKg} kg
                      </td>
                      <td className="px-4 py-3 font-mono text-zinc-300">
                        {entry.bodyFatPercent ? `${entry.bodyFatPercent}%` : '-'}
                      </td>
                      <td className="px-4 py-3 text-zinc-300 font-mono">
                        {entry.chestInches || '-'}" / {entry.waistInches || '-'}" / {entry.armsInches || '-'}"
                      </td>
                      <td className="px-4 py-3 text-zinc-400 italic">
                        {entry.trainerNotes || 'Routine weigh-in'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-500 hover:text-red-400 cursor-pointer"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
