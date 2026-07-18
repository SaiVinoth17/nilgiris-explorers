'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { testimonials } from '@/lib/data';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';

const AUTOPLAY_INTERVAL = 6000;

export default function TestimonialsCinematic() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(
        () => {
          setActiveIndex(index);
          setTimeout(() => setIsTransitioning(false), prefersReducedMotion ? 0 : 50);
        },
        prefersReducedMotion ? 0 : 300
      );
    },
    [isTransitioning, prefersReducedMotion]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || isHovered || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isHovered, goNext, prefersReducedMotion]);

  const current = testimonials[activeIndex];

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Traveler testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A08] via-[#071410] to-[#050A08]" />

      {/* Subtle decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-20">
          <p className="section-label justify-center mb-4">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            Stories From{' '}
            <span className="gradient-text">The Mountains</span>
          </h2>
          <p className="mt-4 text-white/50 font-body max-w-xl mx-auto">
            Real experiences from travelers who explored the Nilgiris with us
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Traveler stories"
        >
          {/* Live region for screen readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Showing testimonial {activeIndex + 1} of {testimonials.length}: {current.name} from {current.location}
          </div>

          {/* Testimonial Card */}
          <div
            className={`glass-card rounded-2xl md:rounded-3xl p-8 md:p-12 relative transition-all ${
              prefersReducedMotion ? '' : 'duration-500 ease-out'
            } ${
              isTransitioning
                ? 'opacity-0 translate-y-3'
                : 'opacity-100 translate-y-0'
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} of ${testimonials.length}`}
          >
            {/* Large quotation mark */}
            <span
              className="absolute top-4 left-6 md:top-6 md:left-8 text-7xl md:text-8xl font-display text-[var(--color-brand-emerald)]/20 leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div className="relative z-10 pt-8 md:pt-6">
              {/* Quote text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl font-display italic text-white/90 leading-relaxed mb-8">
                &ldquo;{current.review}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="w-16 h-px bg-gradient-to-r from-emerald-500/60 to-transparent mb-6" />

              {/* Reviewer info */}
              <div className="flex items-center gap-4">
                {/* Avatar circle with initials */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${current.avatarBg} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-display font-bold text-sm md:text-base">
                    {current.avatar}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-white text-base md:text-lg">
                    {current.name}
                  </p>
                  <p className="text-white/50 text-sm">
                    {current.location} · {current.package}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {/* Star rating */}
                  <div className="flex gap-0.5" aria-label={`${current.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < current.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-white/20'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  {/* Date */}
                  <p className="text-white/30 text-xs">{current.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>

              {/* Pause / Play button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 group"
                aria-label={isPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60 group-hover:text-[var(--color-brand-emerald)] transition-colors" />
                ) : (
                  <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60 group-hover:text-[var(--color-brand-emerald)] transition-colors" />
                )}
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-8 h-2 bg-emerald-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

