"use client";

import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const gems = [
  {
    title: "The Kodanad Viewpoint Road",
    description: "A breathtakingly quiet stretch of road flanked by vibrant tea estates leading to the edge of the Nilgiris plateau. Forget the crowded viewpoints; this is where you'll find true serenity.",
    image: "/images/stunning_tea_estate.png",
    type: "Scenic Drive",
  },
  {
    title: "Emerald Lake at Dawn",
    description: "While most tourists flock to Ooty Lake, the untouched Emerald Lake in the Avalanche biosphere offers mirror-like reflections of the sunrise. Perfect for photographers.",
    image: "/images/dest_new_avalanche.png",
    type: "Photography Spot",
  },
  {
    title: "Bison Valley Watch",
    description: "A local secret near Coonoor where you can safely observe wild Indian Bison (Gaur) grazing in the distant valleys through the afternoon mist.",
    image: "/images/stunning_panoramic_hero.png",
    type: "Wildlife Experience",
  }
];

export default function HiddenGems() {
  return (
    <section className="section-pad bg-black relative overflow-hidden" id="hidden-gems">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D17] to-black opacity-50" />
      
      <motion.div 
        className="container-default relative z-10"
        whileInView={{ opacity: 1, y: 0 }} 
        initial={{ opacity: 0, y: 30 }} 
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium tracking-wide mb-6">
              <Sparkles className="w-4 h-4" /> Local Secrets
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Beyond The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tourist Trail</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              We are born and raised in the Nilgiris. When you travel with us, we don't just take you to the famous spots — we take you to the places only locals know about.
            </p>
          </div>
        </div>

        {/* Grid Container with glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,106,0.1)_0%,_transparent_60%)] pointer-events-none scale-125" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {gems.map((gem, i) => (
              <div 
                key={i} 
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-500 [transform:translateZ(0)]"
              >
                <Image 
                  src={gem.image} 
                  alt={gem.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black group-hover:via-black/60 transition-colors duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <MapPin className="w-4 h-4" />
                    {gem.type}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{gem.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {gem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
