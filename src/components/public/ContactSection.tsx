import React, { useState } from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    slotPreference: 'Morning (6 AM - 9 AM)',
    goal: 'Weight Loss & Fat Shred',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E31B23', '#ffffff', '#22c55e'],
    });

    setSubmitted(true);

    // Also offer direct WhatsApp redirect
    const waText = `Hey IronForge! My name is ${formData.name}. I just booked a 1-day pass for the ${formData.slotPreference} slot. My goal is ${formData.goal}. Please share access pass!`;
    const waUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-800/80 relative bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & Direct WhatsApp */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#E31B23]" />
                <span>Visit The Forge</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                DROP IN. <span className="text-gradient-red">CHALK UP.</span> LIFT HEAVY.
              </h2>
              <p className="text-zinc-400 text-base mt-3 leading-relaxed">
                Located right in the heart of Koramangala 4th Block. Dedicated parking, 24/7 biometric security, and pure athletic vibes. Stop by for an espresso and a tour.
              </p>
            </div>

            {/* Direct WhatsApp Hero Card */}
            <div className="glass-panel-elevated p-6 rounded-3xl border border-red-500/30 relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Instant Help On WhatsApp
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    QUICK CHAT WITH FRONT DESK
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Ask about passes, membership transfers, or timings. Real humans, quick answers.
                  </p>
                </div>

                <a
                  href={`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Namaste IronForge Gym! I would like to enquire about membership plans and claim a free trial pass.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#E31B23] mb-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Address</div>
                <div className="text-sm font-semibold text-white mt-1 leading-snug">
                  {GYM_CONFIG.address}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#E31B23] mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Arena Timings</div>
                <div className="text-sm font-semibold text-white mt-1">
                  Mon-Sat: {GYM_CONFIG.hours.weekdays}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Sunday: {GYM_CONFIG.hours.sunday}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#E31B23] mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Phone / Reception</div>
                <a
                  href={`tel:${GYM_CONFIG.phone}`}
                  className="text-sm font-semibold text-white hover:text-red-400 transition-colors mt-1 block"
                >
                  {GYM_CONFIG.phone}
                </a>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#E31B23] mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Official Email</div>
                <a
                  href={`mailto:${GYM_CONFIG.email}`}
                  className="text-sm font-semibold text-white hover:text-red-400 transition-colors mt-1 block truncate"
                >
                  {GYM_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Book Free Trial Pass Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl relative">
              <div className="mb-6">
                <h3 className="font-heading text-3xl font-bold text-white">
                  CLAIM YOUR <span className="text-gradient-red">FREE 1-DAY PASS</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Experience {GYM_CONFIG.name} with zero commitment. Enter details below to receive your digital entry QR pass.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-white">
                    PASS BOOKED SUCCESSFULLY!
                  </h4>
                  <p className="text-sm text-zinc-300 max-w-sm mx-auto">
                    Shabash {formData.name}! Your 1-day free pass is locked in. We have triggered your WhatsApp confirmation. See you on the floor!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 mt-4 cursor-pointer"
                  >
                    Book for another friend
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31B23] focus:ring-1 focus:ring-[#E31B23]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      WhatsApp Phone Number (with +91)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31B23] focus:ring-1 focus:ring-[#E31B23]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.slotPreference}
                        onChange={(e) => setFormData({ ...formData, slotPreference: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
                      >
                        <option value="Early Morning (5:30 AM - 8 AM)">Early Morning (5:30 - 8 AM)</option>
                        <option value="Morning (8 AM - 11 AM)">Morning (8 AM - 11 AM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        <option value="Night (8 PM - 10:30 PM)">Night (8 PM - 10:30 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Primary Fitness Goal
                      </label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E31B23]"
                      >
                        <option value="Weight Loss & Fat Shred">Fat Loss / Shred</option>
                        <option value="Muscle Building / Hypertrophy">Muscle & Hypertrophy</option>
                        <option value="Powerlifting & Pure Strength">Powerlifting Strength</option>
                        <option value="General Athletic Fitness">Athletic Conditioning</option>
                        <option value="Posture & Injury Rehab">Physio & Rehab</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#E31B23] hover:bg-[#c91219] text-white font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(227,27,35,0.45)] hover:shadow-[0_0_35px_rgba(227,27,35,0.7)] transition-all cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get 1-Day Pass & WhatsApp Pass</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-2">
                    <Shield className="w-3.5 h-3.5 text-zinc-400" />
                    <span>No spam guarantee. Only pass QR & slot reminder will be sent.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
