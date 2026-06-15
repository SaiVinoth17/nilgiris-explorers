"use client";

import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    id: "ooty",
    name: "Ooty",
    tagline: "The Queen of Hill Stations",
    image: "/images/dest_new_ooty_lake.png",
    highlights: ["Botanical Gardens", "Ooty Lake", "Doddabetta Peak", "Heritage Trains"],
  },
  {
    id: "coonoor",
    name: "Coonoor",
    tagline: "Where Time Slows Down",
    image: "/images/dest_new_coonoor.png",
    highlights: ["Dolphin's Nose", "Tea Estates", "Lamb's Rock", "Sim's Park"],
  },
  {
    id: "pykara",
    name: "Pykara",
    tagline: "The Untamed Heart",
    image: "/images/stunning_pykara.png",
    highlights: ["Pykara Falls", "Pine Forests", "Speed Boating", "Wenlock Downs"],
  },
];

export default function DestinationReveal() {
  return (
    <section className="bg-[#050A08] py-24">
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="section-label justify-center mb-4">Discover</span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Iconic <span className="gradient-text">Destinations</span>
        </h2>
      </div>

      {destinations.map((dest) => (
        <div
          key={dest.id}
          className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden group"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h3 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
              {dest.name}
            </h3>
            <p className="font-serif italic text-xl md:text-2xl text-white/70 mt-4">
              {dest.tagline}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {dest.highlights.map((h) => (
                <span
                  key={h}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm tracking-wide"
                >
                  {h}
                </span>
              ))}
            </div>

            <Link
              href={`/destinations/${dest.id}`}
              className="inline-block mt-10 border-b border-white/40 hover:border-emerald-400 pb-1 text-white hover:text-emerald-400 transition-colors duration-200 uppercase tracking-widest text-sm font-semibold"
            >
              Explore {dest.name} →
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
