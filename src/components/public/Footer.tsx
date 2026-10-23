import React from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { Dumbbell, Shield, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-[#070708] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
          {/* Col 1 & 2: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#E31B23] flex items-center justify-center text-white shadow-[0_0_15px_rgba(227,27,35,0.4)]">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-heading text-2xl tracking-wider text-white font-bold">
                IRON<span className="text-[#E31B23]">FORGE</span>
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {GYM_CONFIG.tagline} Bengaluru's premium raw strength arena built for serious lifters, functional athletes, and transformation seekers.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Floor Open Now • Today: {GYM_CONFIG.hours.weekdays}</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Explore
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#plans" className="hover:text-white transition-colors">
                  Membership Plans
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Class Schedule
                </a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-white transition-colors">
                  Master Coaches
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">
                  Facilities & Sauna
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ & Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Staff */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Management
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={onNavigateToAdmin}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-[#E31B23]" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToAdmin}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Member Attendance
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToAdmin}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Progress Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToAdmin}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Renewals & Reminders
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Location */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Arena Location
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {GYM_CONFIG.address}
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
              <div>Reception: {GYM_CONFIG.phone}</div>
              <div className="text-red-400 font-mono mt-0.5">{GYM_CONFIG.email}</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} {GYM_CONFIG.name}. All rights reserved. Desi Josh, Global Standards.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400 font-mono text-[11px]">
              "Bhai ne bola workout karne ka, toh karne ka!" 🔥
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
