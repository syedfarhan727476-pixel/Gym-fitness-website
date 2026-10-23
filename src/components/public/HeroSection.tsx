import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Dumbbell, Award, Sparkles, MessageCircle } from 'lucide-react';
import { GYM_CONFIG } from '../../config/gymConfig';

interface HeroSectionProps {
  onOpenJoinModal: (planId?: string) => void;
  onNavigateToAdmin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenJoinModal,
  onNavigateToAdmin,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappHref = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hey ${GYM_CONFIG.name}! I would like to book a free trial session at your Koramangala facility. Please share slot details!`
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Graphic & Subtle Dark Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle high-contrast gym atmosphere image with heavy dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        {/* Deep dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/85 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0B]/60 to-[#0A0A0B]" />

        {/* Ambient Red Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E31B23]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E31B23]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Announcement Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-red-500/30 text-xs sm:text-sm font-semibold text-zinc-200 mb-6 shadow-[0_0_20px_rgba(227,27,35,0.2)] animate-pulse">
          <span className="flex h-2 w-2 rounded-full bg-[#E31B23]"></span>
          <span className="text-red-400 uppercase tracking-widest font-bold">Bengaluru's Elite Strength Arena</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300">Ek dum solid workout environment</span>
        </div>

        {/* Heavy Display Headline */}
        <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight font-extrabold text-white max-w-5xl leading-[0.95] mb-6">
          TRANSFORM YOUR BODY. <br />
          <span className="text-gradient-red drop-shadow-[0_4px_30px_rgba(227,27,35,0.4)]">
            FORGE UNSTOPPABLE
          </span>{' '}
          STRENGTH.
        </h1>

        {/* Subtitle with Hinglish touch */}
        <p className="max-w-3xl text-zinc-300 text-base sm:text-xl font-normal leading-relaxed mb-10 text-balance">
          {GYM_CONFIG.heroSubheading}
        </p>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={() => scrollTo('plans')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white font-bold text-base tracking-wide flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(227,27,35,0.5)] hover:shadow-[0_0_40px_rgba(227,27,35,0.8)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Membership Plans</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel hover:bg-zinc-800/80 text-white font-semibold text-base border border-zinc-700 hover:border-zinc-500 flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Book Free 1-Day Pass</span>
          </a>

          <button
            onClick={onNavigateToAdmin}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#E31B23]" />
            <span>Admin & Staff Portal</span>
          </button>
        </div>

        {/* Feature Highlights Pill Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left">
          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-zinc-800/80 flex items-center gap-3 group hover:border-red-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-[#E31B23] group-hover:bg-[#E31B23]/10">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">Pure Iron</div>
              <div className="text-sm font-semibold text-white">Eleiko Barbells</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-zinc-800/80 flex items-center gap-3 group hover:border-red-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-[#E31B23] group-hover:bg-[#E31B23]/10">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">Recovery</div>
              <div className="text-sm font-semibold text-white">Finnish Sauna</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-zinc-800/80 flex items-center gap-3 group hover:border-red-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-[#E31B23] group-hover:bg-[#E31B23]/10">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">Coaches</div>
              <div className="text-sm font-semibold text-white">K11 & CSCS Certified</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-zinc-800/80 flex items-center gap-3 group hover:border-red-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-[#E31B23] group-hover:bg-[#E31B23]/10">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">Flexible</div>
              <div className="text-sm font-semibold text-white">Easy Freeze Policy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
