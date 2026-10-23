import React, { useState } from 'react';
import { GYM_CONFIG, ClassScheduleItem } from '../../config/gymConfig';
import { Calendar, Clock, User, Flame, Filter, MessageCircle } from 'lucide-react';

const DAYS: Array<ClassScheduleItem['day']> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const ClassSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<ClassScheduleItem['day']>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Strength', 'HIIT', 'Conditioning', 'Combat', 'Mobility'];

  const filteredSchedule = GYM_CONFIG.schedule.filter((item) => {
    const matchesDay = item.day === selectedDay;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const getIntensityBadge = (intensity: ClassScheduleItem['intensity']) => {
    switch (intensity) {
      case 'Extreme':
        return 'bg-red-950/80 text-red-400 border-red-500/40';
      case 'High':
        return 'bg-orange-950/80 text-orange-400 border-orange-500/40';
      case 'Medium':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <section id="schedule" className="py-24 border-t border-zinc-800/80 relative bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#E31B23]" />
              <span>Weekly Arena Schedule</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              COMMUNITY <span className="text-gradient-red">CLASS ROSTER</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              High-intensity group sessions guided by master coaches. Free for all active members. Reserve your barbell or bag ahead.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E31B23] text-white shadow-[0_0_15px_rgba(227,27,35,0.4)]'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Day of Week Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {DAYS.map((day) => {
            const isSelected = selectedDay === day;
            const dayCount = GYM_CONFIG.schedule.filter((s) => s.day === day).length;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm shrink-0 transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 shadow-lg scale-102'
                    : 'glass-panel text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
                }`}
              >
                <span>{day}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {dayCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Classes List */}
        {filteredSchedule.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">
              No specific {selectedCategory} classes scheduled for {selectedDay}. Open gym floor is active from 5:30 AM to 10:30 PM!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedule.map((item) => {
              const waText = `Hey IronForge! Want to book a spot for the *${item.title}* on *${item.day} (${item.time})* with ${item.trainer}. Please confirm availability!`;
              const waUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

              return (
                <div
                  key={item.id}
                  className="glass-panel p-6 rounded-2xl border border-zinc-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Time & Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-300 bg-zinc-900/90 px-3 py-1 rounded-lg border border-zinc-800">
                        <Clock className="w-3.5 h-3.5 text-[#E31B23]" />
                        <span>{item.time}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getIntensityBadge(
                          item.intensity
                        )}`}
                      >
                        {item.intensity} Intensity
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Trainer & Duration */}
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2 mb-6">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-300">{item.trainer}</span>
                      </div>
                      <span className="text-zinc-600">•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Footer & Reserve Button */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="text-xs text-zinc-400">
                      <span className="text-emerald-400 font-semibold">{item.slots} Slots</span> Max Cap
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-[#E31B23] text-zinc-200 hover:text-white text-xs font-semibold transition-all border border-zinc-800 hover:border-transparent cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                      <span>Reserve Spot</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
