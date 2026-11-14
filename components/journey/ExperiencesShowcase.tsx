"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const FlexCarousel = dynamic(() => import("@/components/ui/FlexCarousel"), { ssr: false });

const carouselItems = [
  {
    src: "/images/dest_new_ooty_lake.png",
    alt: "Ooty — Lake Country",
    title: "Ooty",
    subtitle: "The Classic · 2,240m",
    slug: "ooty",
  },
  {
    src: "/images/dest_new_coonoor.png",
    alt: "Coonoor — Tea Country",
    title: "Coonoor",
    subtitle: "Hidden Gem · 1,850m",
    slug: "coonoor",
  },
  {
    src: "/images/stunning_pykara.png",
    alt: "Pykara — Waterfall Country",
    title: "Pykara",
    subtitle: "Untamed Nature · 2,100m",
    slug: "pykara",
  },
  {
    src: "/images/real_mudumalai.jpg",
    alt: "Mudumalai — Wild Frontier",
    title: "Mudumalai",
    subtitle: "Wildlife Corridor · 900m",
    slug: "mudumalai",
  },
  {
    src: "/images/dest_new_avalanche.png",
    alt: "Avalanche Lake — Pristine Sanctuary",
    title: "Avalanche Lake",
    subtitle: "Untouched Wilderness · 2,150m",
    slug: "avalanche",
  },
  {
    src: "/images/dest_new_doddabetta.png",
    alt: "Doddabetta Peak — Queen of Heights",
    title: "Doddabetta Peak",
    subtitle: "Highest Peak · 2,637m",
    slug: "doddabetta",
  },
  {
    src: "/images/dest_new_tea_estates.png",
    alt: "Kotagiri — Emerald Slopes",
    title: "Kotagiri",
    subtitle: "Tea Estate Haven · 1,793m",
    slug: "kotagiri",
  },
  {
    src: "/images/dest_new_botanical.png",
    alt: "Botanical Gardens — Living Heritage",
    title: "Botanical Gardens",
    subtitle: "Colonial Flora · Estd 1848",
    slug: "ooty",
  },
];

export default function ExperiencesShowcase() {
  return (
    <section className="relative bg-void overflow-hidden" aria-label="The Nilgiris Experience">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-brand-emerald)]/5 blur-[140px]" />
      </div>

      {/* Section Header */}
      <div className="px-6 pt-20 pb-10 text-center relative z-10">
        <span className="section-label mb-5 inline-block">The Nilgiris Experience</span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Four Worlds,{" "}
          <span className="gradient-text">One Mountain Range</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/50 max-w-xl mx-auto font-body">
          Each corner of the Nilgiris holds an entirely different world — from serene
          lakes to roaring waterfalls, rolling tea hills to untamed wildlife corridors.
        </p>
      </div>

      {/* FlexCarousel Component from React Bits */}
      <div className="w-full h-[520px] sm:h-[580px] md:h-[640px] relative overflow-hidden my-4 z-10">
        <FlexCarousel
          items={carouselItems}
          preset="liquid"
          intro="rise"
          cardHeight={0.52}
          gap={18}
          radius={16}
          squeeze={0.2}
          focusOnClick={true}
          captions={true}
          autoplay={false}
        />
      </div>

      {/* Explore Link CTA */}
      <div className="text-center pb-20 pt-4 relative z-10">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[var(--color-brand-emerald)]/40 text-[var(--color-brand-emerald)] hover:text-white transition-all duration-300 text-sm font-medium tracking-wide shadow-lg group"
        >
          <span>Explore All 15+ Nilgiris Destinations</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
