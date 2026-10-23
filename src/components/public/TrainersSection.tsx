import React from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { Award, ShieldCheck, Instagram, Dumbbell } from 'lucide-react';

export const TrainersSection: React.FC = () => {
  return (
    <section id="trainers" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Master Coaches & Physiotherapists</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            GUIDED BY <span className="text-gradient-red">CHAMPIONS</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3">
            No half-baked trainers orbro-science. Our certified faculty coaches state athletes, powerlifters, and everyday desk warriors into peak physical condition.
          </p>
        </div>

        {/* Trainer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GYM_CONFIG.trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-panel rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-500/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Photo with Overlay */}
                <div className="relative h-72 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/30 to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 text-[11px] font-bold text-zinc-200">
                    {trainer.experience}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 -mt-6 relative z-10">
                  <div className="text-xs uppercase font-bold text-red-400 tracking-wider mb-1">
                    {trainer.role}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {trainer.name}
                  </h3>

                  <div className="text-xs text-zinc-400 mt-2 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{trainer.certifications}</span>
                  </div>

                  <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {trainer.bio}
                  </p>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {trainer.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instagram Handle & Spot Consultation */}
              <div className="p-5 sm:p-6 pt-0 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{trainer.instagram}</span>
                </span>
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  Floor Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
