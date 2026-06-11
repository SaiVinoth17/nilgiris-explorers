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
  const [selectedDestination, setSelectedDestination] = useState<any | null>(null);

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
          {destinations.map((dest, i) => (
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
                  className="object-cover transition-transform duration-700 lg:group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2820] via-transparent to-transparent pointer-events-none" />

                {/* Tag badge */}
                <div className={`absolute top-3 left-3 tag-badge border text-xs ${tagColors[dest.tag] || "bg-white/10 text-white/70 border-white/20"}`}>
                  {dest.tag}
                </div>

                {/* Rating overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1 glass px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-white">{dest.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-[#00D26A] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-white/50 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00D26A]" />
                    <span>{dest.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>{dest.duration}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
                  <span className="text-xs text-white/30">{dest.reviews.toLocaleString()} reviews</span>
                  <span className="text-xs font-medium text-[#00D26A] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Book Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        <DestinationModal 
          isOpen={!!selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
          destination={selectedDestination} 
        />

        {/* CTA */}
        <div
          className="text-center mt-10"
        >
          <Link href="/#booking" className="btn-secondary text-base px-8 py-3.5">
            View All Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
