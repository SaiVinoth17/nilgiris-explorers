"use client";

import { useState } from "react";
import Image from "next/image";
import { destinations } from "@/lib/data";
import { MapPin } from "lucide-react";
import DestinationModal from "./DestinationModal";

export default function InteractiveExplorer() {
  const [activeDest, setActiveDest] = useState<typeof destinations[0] | null>(null);

  // We only want the core 4 destinations for the interactive map
  const coreDestinations = destinations.filter(d => 
    ["ooty", "coonoor", "pykara", "mudumalai"].includes(d.slug)
  );

  return (
    <section className="section-pad bg-[#0B1D17] relative overflow-hidden" id="explore">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00D26A]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-default relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-medium tracking-wide mb-6">
            Interactive Map
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nilgiris</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Select a region below to uncover its secrets, photography spots, and the perfect time to visit.
          </p>
        </div>

        <div className="w-full">
          {/* Map Grid / Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreDestinations.map((dest) => (
              <button 
                key={dest.id}
                onClick={() => setActiveDest(dest)}
                className={`group text-left w-full relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/5] border transition-all duration-500 touch-feedback skeleton block
                  ${activeDest?.id === dest.id ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-[1.02]" : "border-white/10 hover:border-white/30"}
                `}
              >
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 pointer-events-none">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4" />
                    {dest.tag}
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white">{dest.name}</h3>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

      <DestinationModal 
        isOpen={!!activeDest} 
        onClose={() => setActiveDest(null)} 
        destination={activeDest} 
      />
    </section>
  );
}
