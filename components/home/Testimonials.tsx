"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [auto]);

  const prev = () => { setAuto(false); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setAuto(false); setCurrent((c) => (c + 1) % testimonials.length); };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-pad section-forest">
      <div className="container-default">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          /* removed initial */
          /* removed whileInView */
          /* removed viewport */
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block section-label-text mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            What Travelers <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Thousands of happy travelers, one common thread — an unforgettable Nilgiris experience.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              /* removed initial */
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="glass-card rounded-3xl p-8 sm:p-12 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00D26A]/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 font-light italic">
                "{t.review}"
              </p>

              {/* Customer info */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center font-bold text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-white/40 text-sm">{t.location} · {t.date}</div>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="text-xs text-white/30 mb-1">Package</div>
                  <div className="text-sm font-medium text-[#00D26A]">{t.package}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-[#00D26A]/20 hover:border-[#00D26A]/30 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAuto(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#00D26A]" : "w-2 bg-white/20 hover:bg-white/40"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-[#00D26A]/20 hover:border-[#00D26A]/30 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Small cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-10">
          {testimonials.map((t2, i) => (
            <button
              key={t2.id}
              onClick={() => { setAuto(false); setCurrent(i); }}
              className={`glass-card rounded-xl p-3 text-left transition-all duration-300 ${i === current ? "ring-1 ring-[#00D26A]/50 bg-[#00D26A]/5" : "opacity-50 hover:opacity-80"}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${t2.avatarBg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                  {t2.avatar}
                </div>
                <div className="text-xs font-medium text-white truncate min-w-0 flex-1">{t2.name.split(" ")[0]}</div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(t2.rating)].map((_, si) => (
                  <Star key={si} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </button>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
