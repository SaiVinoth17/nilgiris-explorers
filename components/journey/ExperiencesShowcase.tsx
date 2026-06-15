"use client";

import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Ooty",
    tagline: "Lake Country",
    tag: "The Classic",
    image: "/images/dest_new_ooty_lake.png",
    slug: "ooty",
    number: "01",
    description:
      "The crown jewel of the Nilgiris at 2,240m — where emerald lakes mirror misty peaks and colonial charm meets natural grandeur.",
  },
  {
    name: "Coonoor",
    tagline: "Tea Country",
    tag: "Hidden Gem",
    image: "/images/dest_new_coonoor.png",
    slug: "coonoor",
    number: "02",
    description:
      "Rolling carpets of tea stretch to the horizon — a quieter, more intimate Nilgiris where every viewpoint tells a story.",
  },
  {
    name: "Pykara",
    tagline: "Waterfall Country",
    tag: "Untamed Nature",
    image: "/images/stunning_pykara.png",
    slug: "pykara",
    number: "03",
    description:
      "Thundering cascades cut through ancient shola forests — Pykara is the wild, untouched heart of the Blue Mountains.",
  },
  {
    name: "Mudumalai",
    tagline: "Wild Frontier",
    tag: "Wildlife",
    image: "/images/real_mudumalai.jpg",
    slug: "mudumalai",
    number: "04",
    description:
      "Where the Western Ghats meet the Deccan plateau — home to tigers, elephants, and one of India's oldest wildlife sanctuaries.",
  },
];

export default function ExperiencesShowcase() {
  return (
    <section className="relative bg-[#050A08]" aria-label="Four Worlds of Nilgiris">
      {/* Section Header */}
      <div className="px-6 pt-24 pb-16 text-center">
        <span className="section-label mb-6">The Nilgiris Experience</span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Four Worlds,{" "}
          <span className="gradient-text">One Mountain Range</span>
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/50 max-w-xl mx-auto font-body">
          Each corner of the Nilgiris holds an entirely different world — from serene
          lakes to roaring waterfalls, from rolling tea hills to untamed wildlife corridors.
        </p>
      </div>

      {/* Cards — vertical stack, clean and performant */}
      <div className="flex flex-col">
        {destinations.map((dest) => (
          <div
            key={dest.slug}
            className="relative h-[75vh] min-h-[500px] md:h-screen overflow-hidden group"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={dest.image}
                alt={`${dest.name} — ${dest.tagline}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
                quality={85}
              />
            </div>

            {/* Dark overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.75) 85%, rgba(5,10,8,0.95) 100%)",
              }}
            />

            {/* Number watermark */}
            <span
              className="absolute top-6 right-8 z-10 font-display font-black text-white select-none pointer-events-none leading-none"
              style={{ fontSize: "15vw", opacity: 0.04 }}
              aria-hidden="true"
            >
              {dest.number}
            </span>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10 md:p-14 lg:p-20">
              <span className="tag-badge bg-emerald/20 text-emerald border border-emerald/30 mb-4">
                {dest.tag}
              </span>

              <h3 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mt-3">
                {dest.name}
              </h3>

              <p className="font-display text-xl md:text-2xl text-white/60 mt-2 tracking-wide">
                {dest.tagline}
              </p>

              <p className="font-body text-sm md:text-base text-white/40 mt-4 max-w-lg leading-relaxed">
                {dest.description}
              </p>

              <Link
                href={`/destinations/${dest.slug}`}
                className="group/link inline-flex items-center gap-2 mt-6 text-emerald font-display font-semibold text-sm md:text-base tracking-wide transition-colors duration-200 hover:text-emerald-300"
              >
                Explore
                <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">→</span>
              </Link>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] z-20 bg-gradient-to-r from-transparent via-emerald/40 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}
