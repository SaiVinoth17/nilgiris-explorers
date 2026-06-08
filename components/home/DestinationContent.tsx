"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AtmosphericMist from "@/components/ui/AtmosphericMist";

const journeyStops = [
  {
    id: "ooty",
    name: "Ooty",
    title: "The Queen of Hill Stations",
    description: "Begin your journey in the misty heart of the Nilgiris. Famous for its sprawling tea gardens, colonial architecture, and the heritage Nilgiri Mountain Railway.",
    image: "/images/dest_new_ooty_lake.png",
    tags: ["Botanical Garden", "Ooty Lake", "Rose Garden"],
  },
  {
    id: "doddabetta",
    name: "Doddabetta",
    title: "Above The Clouds",
    description: "Ascend to the highest peak in the Nilgiris. Witness breathtaking panoramic views of the entire valley wrapped in dramatic morning mist.",
    image: "/images/dest_new_doddabetta.png",
    tags: ["Viewpoint", "Trekking", "Telescope House"],
  },
  {
    id: "pykara",
    name: "Pykara",
    title: "Cascades & Pristine Waters",
    description: "Follow the sacred Pykara river as it cascades into magnificent waterfalls before settling into a serene, pine-fringed lake perfect for boating.",
    image: "/images/dest_new_pykara.png",
    tags: ["Waterfalls", "Boat House", "Pine Forest"],
  },
  {
    id: "avalanche",
    name: "Avalanche",
    title: "The Hidden Ecosystem",
    description: "Venture deep into the untouched biosphere. A crystal clear lake surrounded by rolling landscapes, dense sholas, and blooming magnolias.",
    image: "/images/dest_new_avalanche.png",
    tags: ["Eco-tourism", "Emerald Lake", "Deep Forest"],
  },
  {
    id: "mudumalai",
    name: "Mudumalai",
    title: "The Wild Frontier",
    description: "Descend into the thrilling wildlife corridor. Experience the raw wilderness on a safari, spotting elephants, leopards, and tigers in their natural habitat.",
    image: "/images/dest_new_mudumalai.png",
    tags: ["Tiger Reserve", "Elephant Safari", "Bird Watching"],
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-forest w-full">
      
      {/* Sticky Background Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        {journeyStops.map((stop, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              key={`bg-${stop.id}`}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.05 : 1
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 z-0 origin-center"
            >
              <Image
                src={stop.image}
                alt={stop.name}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-forest/80 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
            </motion.div>
          );
        })}
        
        <AtmosphericMist opacity={0.25} />

        {/* Global Progress Indicator */}
        <div className="absolute left-4 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-white/10 rounded-full z-20 hidden xl:block">
          <motion.div 
            className="w-full bg-emerald-500 rounded-full origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: (activeIndex + 1) / journeyStops.length }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ 
              height: "100%",
              boxShadow: "0 0 15px rgba(0, 210, 106, 0.6)"
            }}
          />
        </div>
      </div>

      {/* Naturally Scrolling Content Sections */}
      <div className="relative z-10 w-full -mt-[100vh]">
        {journeyStops.map((stop, index) => {
          return (
            <motion.div
              key={`content-${stop.id}`}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              className="h-screen w-full flex flex-col justify-center px-4 md:px-16 lg:px-32 container-default"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-emerald-400 font-mono text-xl md:text-2xl font-bold">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 max-w-[4rem] bg-emerald-500/50" />
                  <span className="text-white/60 tracking-[0.2em] text-sm uppercase">
                    Journey Stop
                  </span>
                </div>
                
                <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                  {stop.name}
                </h2>
                <h3 className="text-2xl md:text-3xl text-emerald-400 font-medium mb-8 drop-shadow-md">
                  {stop.title}
                </h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl drop-shadow">
                  {stop.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {stop.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full glass border border-white/20 text-white/90 text-sm font-medium shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href="/#booking" className="btn-primary w-fit shadow-xl shadow-emerald-500/20">
                  Explore {stop.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
