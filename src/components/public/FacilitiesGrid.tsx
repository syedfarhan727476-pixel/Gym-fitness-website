import React from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { Dumbbell, Flame, Activity, Coffee, Scale, ShieldCheck, Sparkles } from 'lucide-react';

export const FacilitiesGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-[#E31B23]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#E31B23]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#E31B23]" />;
      case 'Coffee':
        return <Coffee className="w-6 h-6 text-[#E31B23]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#E31B23]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#E31B23]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#E31B23]" />;
    }
  };

  return (
    <section id="facilities" className="py-24 border-t border-zinc-800/80 relative bg-zinc-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>12,000 Sq.Ft Flagship Floor</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            ENGINEERED FOR <span className="text-gradient-red">MAXIMUM OUTPUT</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3">
            Every square foot is purpose-built: commercial shock-absorbent platforms, high CFM air exchange systems, and pristine recovery suites.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GYM_CONFIG.facilities.map((facility, index) => (
            <div
              key={facility.id}
              className="glass-panel p-7 rounded-3xl border border-zinc-800 hover:border-red-500/50 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(227,27,35,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-[#E31B23]/10 group-hover:border-red-500/30 transition-all">
                    {getIcon(facility.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {facility.tag}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                  {facility.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>ZONE 0{index + 1}</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">Included in all plans →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
