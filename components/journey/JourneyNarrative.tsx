"use client";

export default function JourneyNarrative() {
  return (
    <section className="relative section-pad bg-void">
      <div className="container-default max-w-4xl">
        <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-white/90 leading-relaxed md:leading-snug text-center">
          For centuries, the Nilgiri Mountains have whispered to travelers. 
          A sanctuary of rolling emerald hills, ancient forests, and skies 
          that dance with light. This is not just a destination. 
          <span className="text-[var(--color-brand-emerald)]"> It is a feeling.</span>
        </p>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-white/10 pt-14">
          <div className="flex flex-col gap-1">
            <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-emerald)]">10,000+</span>
            <span className="text-white/50 font-body tracking-wide uppercase text-sm">Travelers Guided</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-emerald)]">Since 2018</span>
            <span className="text-white/50 font-body tracking-wide uppercase text-sm">Local Experts</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-emerald)]">4.9★</span>
            <span className="text-white/50 font-body tracking-wide uppercase text-sm">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
