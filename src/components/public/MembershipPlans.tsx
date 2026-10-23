import React from 'react';
import { GYM_CONFIG, PlanConfig } from '../../config/gymConfig';
import { formatRupees } from '../../services/storageService';
import { Check, Flame, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

interface MembershipPlansProps {
  onSelectPlan: (planId: string) => void;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({ onSelectPlan }) => {
  return (
    <section id="plans" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E31B23]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Transparent Pricing • Zero Hidden Charges</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            CHOOSE YOUR <span className="text-gradient-red">BATTLE PLAN</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3">
            Whether you are testing your resolve or committing to an elite transformation, every plan includes full floor access, biometric check-in, and locker suites.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {GYM_CONFIG.plans.map((plan: PlanConfig) => {
            const isPopular = plan.popular;
            const perMonth = Math.round(plan.price / plan.durationMonths);

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'glass-panel-elevated border-2 border-[#E31B23] shadow-[0_0_35px_rgba(227,27,35,0.35)] -translate-y-2'
                    : 'glass-panel border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1'
                }`}
              >
                {/* Popular Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#E31B23] to-[#ff474f] text-white text-xs font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(227,27,35,0.7)] flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>Most Popular • Bhai Ki Choice</span>
                  </div>
                )}

                <div>
                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-zinc-800/80 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
                        {formatRupees(plan.price)}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-sm font-medium text-zinc-500 line-through">
                          {formatRupees(plan.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-red-400 font-medium mt-1">
                      ≈ {formatRupees(perMonth)} / month • {plan.durationMonths} Month{plan.durationMonths > 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-red-950/80 text-[#E31B23] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular
                      ? 'bg-[#E31B23] hover:bg-[#c91219] text-white shadow-[0_0_20px_rgba(227,27,35,0.4)] hover:shadow-[0_0_30px_rgba(227,27,35,0.7)]'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700/80'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 glass-panel p-5 rounded-2xl border border-zinc-800 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Risk-Free 1-Day Trial Included</div>
              <div className="text-xs text-zinc-400">Workout on the floor before you commit. No questions asked.</div>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan('quarterly')}
            className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 shrink-0 cursor-pointer"
          >
            Claim 1-Day Free Pass
          </button>
        </div>
      </div>
    </section>
  );
};
