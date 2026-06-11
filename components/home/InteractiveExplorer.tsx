"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { destinations } from "@/lib/data";
import { MapPin } from "lucide-react";
import DestinationModal from "./DestinationModal";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveExplorer() {
  const coreDestinations = useMemo(() => destinations.filter(d => 
    ["ooty", "coonoor", "pykara", "mudumalai"].includes(d.slug)
  ), []);

  const [activeTab, setActiveTab] = useState(coreDestinations[0]);
  const [activeDest, setActiveDest] = useState<typeof destinations[0] | null>(null);

  return (
    <section className="section-pad bg-[#0B1D17] relative overflow-hidden" id="explore">
      {/* Background Ambience Optimized */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,210,106,0.15)_0%,_transparent_70%)] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-default relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-medium tracking-wide mb-6">
            The Four Worlds
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Four Landscapes, One <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Mountain Range</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The Nilgiris hold four distinct worlds within a single mountain range — misty peaks, tea valleys, sacred rivers, and wild jungles. Each one tells a different story.
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          {/* Destination Selector Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 relative">
            {coreDestinations.map((dest) => {
              const isActive = activeTab.id === dest.id;
              return (
                <div key={dest.id} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/50 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <button 
                    onClick={() => setActiveTab(dest)}
                    className={`relative z-10 px-6 py-2 rounded-full border transition-colors ${
                      isActive 
                        ? "border-transparent text-emerald-400" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    {dest.name}
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Active Destination Image Block */}
          <div 
            className="w-full relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] md:aspect-[21/9] border border-white/10 group shadow-2xl"
            onClick={() => setActiveDest(activeTab)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image 
                  src={activeTab.image} 
                  alt={activeTab.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pointer-events-none">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-3">
                    <MapPin className="w-5 h-5" />
                    {activeTab.tag}
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-display font-bold text-white">{activeTab.name}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
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
