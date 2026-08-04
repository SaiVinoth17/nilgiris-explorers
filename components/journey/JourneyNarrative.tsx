"use client";

import MaskedHeading from "@/components/ui/MaskedHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function JourneyNarrative() {
  return (
    <section className="relative section-pad bg-void overflow-hidden">
      <div className="container-default max-w-5xl">

        {/* MaskedHeading — video fills the letterforms */}
        <div className="mb-16">
          <MaskedHeading
            tag="h2"
            text="Born of the Blue Mountains"
            mediaType="video"
            src="/hero-video.mp4"
            poster="/images/nilgiris_hero_poster.png"
            fillScale={1.3}
            parallax={30}
            drift={14}
            brightness={1.1}
            reveal="wipe"
            trigger="view"
            duration={1.2}
            align="center"
            textScale={0.115}
            tracking={-0.03}
            weight={800}
          />
        </div>

        {/* Narrative copy with ScrollReveal */}
        <ScrollReveal
          as="div"
          baseOpacity={0.1}
          enableBlur={true}
          blurStrength={6}
          baseRotation={2}
          textClassName="font-serif text-xl md:text-3xl lg:text-4xl text-white/85 leading-relaxed md:leading-snug text-center"
        >
          For centuries, the Nilgiri Mountains have whispered to travelers. A sanctuary of rolling emerald hills, ancient forests, and skies that dance with light. This is not just a destination. It is a feeling.
        </ScrollReveal>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-white/10 pt-14">
          <div className="flex flex-col gap-1">
            <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-emerald)]">10,000+</span>
            <span className="text-white/50 font-body tracking-wide uppercase text-sm">Travelers Guided</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-emerald)]">Since 2021</span>
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
