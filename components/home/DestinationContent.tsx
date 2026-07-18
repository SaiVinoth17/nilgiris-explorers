"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AtmosphericMist from "@/components/ui/AtmosphericMist";

const journeyStops = [
  {
    id: "ooty",
    name: "Ooty",
    title: "The Queen of Hill Stations",
    description: "Begin your adventure in the bustling heart of the Nilgiris. Discover the historic Botanical Gardens, the tranquil Ooty Lake, and the majestic Doddabetta Peak.",
    image: "/images/dest_new_ooty_lake.png",
    tags: ["Botanical Garden", "Ooty Lake", "Doddabetta Peak"],
  },
  {
    id: "pykara",
    name: "Pykara",
    title: "Pristine Lakes & Waterfalls",
    description: "Journey towards the pristine Pykara Lake and cascading waterfalls. Experience thrilling speedboat rides surrounded by dense pine forests and rolling downs.",
    image: "/images/dest_new_pykara.png",
    tags: ["Speed Boating", "Pine Forests", "Waterfalls"],
  },
  {
    id: "coonoor",
    name: "Coonoor",
    title: "Tea Gardens & Tranquility",
    description: "Conclude your journey in the tranquil charm of Coonoor. Renowned for its heritage bungalows, misty ravines, and endless emerald tea estates.",
    image: "/images/dest_new_coonoor.png",
    tags: ["Sim's Park", "Dolphin's Nose", "Tea Tasting"],
  }
];

export default function DestinationContent() {
  return (
    <section className="relative bg-forest w-full z-0">
      {journeyStops.map((stop, index) => (
        <div key={`stop-${stop.id}`} className="relative w-full h-[150vh] md:h-[130vh]">
          {/* Sticky Background */}
          <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
            <div className="absolute inset-0">
              <Image
                src={stop.image}
                alt={stop.name}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                quality={75}
              />
            </div>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            <AtmosphericMist opacity={0.25} />
          </div>

          {/* Scrolling Content */}
          <div className="absolute bottom-0 w-full h-screen flex flex-col justify-center container-default z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[var(--color-brand-emerald)] font-mono text-xl md:text-2xl font-bold">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="h-px flex-1 max-w-[4rem] bg-[var(--color-brand-emerald)]/50" />
                <span className="text-white/60 tracking-[0.2em] text-sm uppercase">
                  Journey Stop
                </span>
              </div>
              
              <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {stop.name}
              </h2>
              <h3 className="text-2xl md:text-3xl text-[var(--color-brand-emerald)] font-medium mb-8 drop-shadow-md">
                {stop.title}
              </h3>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl drop-shadow">
                {stop.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {stop.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/20 text-white/90 text-sm font-medium shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href="/#booking" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-primary">
                Explore {stop.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

