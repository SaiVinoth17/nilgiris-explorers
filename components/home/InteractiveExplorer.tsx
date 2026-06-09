"use client";

import { useState } from "react";
import Image from "next/image";
import { destinations } from "@/lib/data";
import { MapPin, Camera, Clock, Users, Sun, ArrowRight, X } from "lucide-react";

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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Grid / Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreDestinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => setActiveDest(dest)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/5] border transition-all duration-500 touch-feedback skeleton
                  ${activeDest?.id === dest.id ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-[1.02]" : "border-white/10 hover:border-white/30"}
                `}
              >
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4" />
                    {dest.tag}
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Intelligence Panel */}
          <div className="w-full lg:w-1/2">
            {activeDest ? (
              <div className="glass-card rounded-3xl p-8 lg:p-10 border border-white/10 h-full flex flex-col relative animate-in fade-in slide-in-from-right-8 duration-500">
                <button 
                  onClick={() => setActiveDest(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors lg:hidden touch-feedback"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                <h3 className="text-4xl font-display font-bold text-white mb-2">{activeDest.name}</h3>
                <p className="text-emerald-400 font-medium mb-8">{activeDest.distance}</p>

                <div className="space-y-8 flex-1">
                  <div>
                    <h4 className="text-white/40 text-sm uppercase tracking-wider font-bold mb-3">The Experience</h4>
                    <p className="text-white/80 leading-relaxed text-lg">{activeDest.experience}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider font-bold mb-2">
                        <Camera className="w-4 h-4 text-amber-400" />
                        Photography
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{activeDest.photographyGuide}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider font-bold mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        Ideal For
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{activeDest.travelerType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider font-bold mb-2">
                        <Sun className="w-4 h-4 text-rose-400" />
                        Best Time
                      </div>
                      <p className="text-white/70 text-sm">{activeDest.bestTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider font-bold mb-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        Duration
                      </div>
                      <p className="text-white/70 text-sm">{activeDest.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href={`/destinations/${activeDest.slug}`}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-center touch-feedback"
                  >
                    Read Full Guide
                  </a>
                  <a 
                    href={`https://wa.me/919585219509?text=Hello,%20I%20am%20interested%20in%20planning%20a%20trip%20to%20${activeDest.name}.`}
                    target="_blank"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex justify-center items-center gap-2 transition-colors touch-feedback"
                  >
                    Plan Trip Here <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-10 border border-white/10 h-full flex flex-col items-center justify-center text-center">
                <MapPin className="w-16 h-16 text-white/10 mb-6" />
                <h3 className="text-2xl font-display font-bold text-white/40 mb-4">Select a Destination</h3>
                <p className="text-white/30 max-w-sm">
                  Click on any region on the map to unlock local secrets, travel intelligence, and photography guides.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
