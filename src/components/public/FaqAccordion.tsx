import React, { useState } from 'react';
import { GYM_CONFIG } from '../../config/gymConfig';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 border-t border-zinc-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#E31B23]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            FREQUENTLY ASKED <span className="text-gradient-red">QUESTIONS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Everything you need to know about joining IronForge, freezing memberships, trainer support, and day passes.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {GYM_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-red-500/40 bg-zinc-900/70 shadow-lg' : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#E31B23] border-[#E31B23] text-white' : 'text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-zinc-800/60 mt-1 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? WhatsApp CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-panel border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Kuch aur poochna hai? Direct baat karo!</div>
              <div className="text-xs text-zinc-400">Our front desk team responds in under 5 minutes on WhatsApp.</div>
            </div>
          </div>

          <a
            href={`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `Hey IronForge team! I have a question regarding membership and personal training.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
          >
            Chat with Desk on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
