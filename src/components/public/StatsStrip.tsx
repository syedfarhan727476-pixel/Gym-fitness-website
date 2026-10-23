import React, { useState, useEffect, useRef } from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { Users, Layout, Award, Target, Info } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 border-y border-zinc-800/80 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]"></span>
            <span>Flagship Arena Metrics</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Info className="w-3.5 h-3.5 text-zinc-400" />
            <span>Sample numbers reflecting active community capacity</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GYM_CONFIG.stats.map((stat, index) => {
            return (
              <StatCard
                key={index}
                label={stat.label}
                targetValue={stat.value}
                suffix={stat.suffix}
                subtext={stat.subtext}
                isTriggered={isVisible}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  label: string;
  targetValue: number;
  suffix: string;
  subtext: string;
  isTriggered: boolean;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  targetValue,
  suffix,
  subtext,
  isTriggered,
  index,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;

    let start = 0;
    const duration = 1600; // 1.6s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * targetValue);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [isTriggered, targetValue, index]);

  const icons = [Users, Layout, Award, Target];
  const IconComponent = icons[index % icons.length];

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-zinc-800/80 hover:border-red-500/40 transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#E31B23] group-hover:bg-[#E31B23] group-hover:text-white transition-all shadow-[0_0_12px_rgba(227,27,35,0.2)]">
          <IconComponent className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-mono text-zinc-500">#0{index + 1}</span>
      </div>

      <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
        <span>{count.toLocaleString()}</span>
        <span className="text-[#E31B23] ml-1 text-2xl sm:text-3xl font-bold">{suffix}</span>
      </div>

      <div className="text-sm font-semibold text-zinc-200 mt-1">{label}</div>
      <div className="text-xs text-zinc-400 mt-0.5">{subtext}</div>
    </div>
  );
};
