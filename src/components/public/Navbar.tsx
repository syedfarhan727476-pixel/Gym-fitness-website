import React, { useState, useEffect } from 'react';
import { Dumbbell, Shield, Phone, Menu, X, ArrowRight, UserCheck } from 'lucide-react';
import { GYM_CONFIG } from '../../config/gymConfig';

interface NavbarProps {
  onOpenJoinModal: (planId?: string) => void;
  onNavigateToAdmin: () => void;
  isAdminActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenJoinModal,
  onNavigateToAdmin,
  isAdminActive,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel py-3 shadow-2xl border-b border-zinc-800/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31B23] to-[#990000] flex items-center justify-center text-white shadow-[0_0_15px_rgba(227,27,35,0.5)] group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl tracking-wider text-white font-bold leading-none flex items-center gap-1">
              IRON<span className="text-[#E31B23]">FORGE</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400">
              STRENGTH & FITNESS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => scrollToSection('plans')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Plans
          </button>
          <button
            onClick={() => scrollToSection('schedule')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Class Schedule
          </button>
          <button
            onClick={() => scrollToSection('trainers')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Trainers
          </button>
          <button
            onClick={() => scrollToSection('facilities')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Facilities
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FAQs
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Dashboard Switch */}
          <button
            onClick={onNavigateToAdmin}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
              isAdminActive
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700/60 hover:border-zinc-500'
            }`}
            title="Open Admin Management & Progress Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>Admin / Staff App</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          {/* Join Now Primary CTA */}
          <button
            onClick={() => onOpenJoinModal()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(227,27,35,0.4)] hover:shadow-[0_0_25px_rgba(227,27,35,0.7)] cursor-pointer transform active:scale-95"
          >
            <span>Join Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onNavigateToAdmin}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-elevated mx-4 mt-3 rounded-2xl p-5 border border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 text-base font-medium text-zinc-200">
            <button
              onClick={() => scrollToSection('plans')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-800/60"
            >
              Membership Plans
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-800/60"
            >
              Class Schedule
            </button>
            <button
              onClick={() => scrollToSection('trainers')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-800/60"
            >
              Certified Trainers
            </button>
            <button
              onClick={() => scrollToSection('facilities')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-800/60"
            >
              Gym Facilities
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-800/60"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-800/60"
            >
              Contact & Location
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full py-3 rounded-xl bg-[#E31B23] text-white font-bold text-center shadow-[0_0_20px_rgba(227,27,35,0.4)]"
            >
              Join Now & Get Free Assessment
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToAdmin();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-200 font-semibold text-center border border-zinc-700 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#E31B23]" />
              <span>Admin & Member Tracker Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
