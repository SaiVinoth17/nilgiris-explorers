"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";
import DestinationModal from "./DestinationModal";

const tagColors: Record<string, string> = {
  "Most Popular": "bg-[#00D26A]/20 text-[#00D26A] border-[#00D26A]/30",
  "Must Visit": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Heritage": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Experience": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Nature": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Hidden Gem": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Wildlife": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Hill Station": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export default function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

  return (
    <section id="destinations" className="section-pad" style={{ background: '#0B1D17' }}>
      <div className="container-default">
        {/* Header */}
        <div
          className="text-center mb-14"
        >
          <span className="section-label mb-3">Popular Destinations</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Explore The Best Of{" "}
            <span className="gradient-text">Nilgiris</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed">
            From misty peaks to serene lakes — discover the most breathtaking spots in the Nilgiris mountains.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestination(dest)}
              className="group text-left w-full block relative rounded-2xl overflow-hidden cursor-pointer card-hover bg-[#0f2820]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2820] via-transparent to-black/30" />

                {/* Tag Badge */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                    tagColors[dest.tag] || "bg-white/10 text-white border-white/20"
                  }`}
                >
                  {dest.tag}
                </span>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-white">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{dest.rating}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-[#00D26A] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-white/50 text-xs mb-3 line-clamp-1">{("tagline" in dest && typeof dest.tagline === "string") ? dest.tagline : dest.description}</p>

                <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00D26A]" />
                    <span>{("idealDuration" in dest && typeof dest.idealDuration === "string") ? dest.idealDuration : dest.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00D26A] font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* View All Bar */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Explore All 25+ Destinations in Nilgiris
          </Link>
        </div>
      </div>

      {/* Destination Modal */}
      <DestinationModal
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
        destination={selectedDestination}
      />
    </section>
  );
}
