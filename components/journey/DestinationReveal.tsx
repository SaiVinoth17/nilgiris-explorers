"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, CloudSun, Mountain, Clock, MapPin, Compass } from "lucide-react";
import React, { useRef } from "react";

const bentoDestinations = [
  {
    id: "ooty",
    name: "Ooty",
    tagline: "The Queen of Hill Stations",
    image: "/images/dest_new_ooty_lake.png",
    category: "The Classic",
    weather: "18°C",
    altitude: "2,240m",
    duration: "2-3 Days",
    highlights: ["Heritage Toy Train", "Botanical Gardens", "Ooty Lake"],
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "coonoor",
    name: "Coonoor",
    tagline: "Where Time Slows Down",
    image: "/images/dest_new_coonoor.png",
    category: "Tea Country",
    weather: "20°C",
    altitude: "1,850m",
    duration: "1-2 Days",
    highlights: ["Tea Estates", "Dolphin's Nose"],
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "pykara",
    name: "Pykara",
    tagline: "The Untamed Heart",
    image: "/images/stunning_pykara.png",
    category: "Untamed Nature",
    weather: "16°C",
    altitude: "2,100m",
    duration: "1 Day",
    highlights: ["Speed Boating", "Pine Forests"],
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "mudumalai",
    name: "Mudumalai",
    tagline: "Wild Frontier",
    image: "/images/real_mudumalai.jpg",
    category: "Wildlife",
    weather: "28°C",
    altitude: "900m",
    duration: "1 Day",
    highlights: ["Jungle Safari", "Elephants"],
    className: "md:col-span-1 md:row-span-1",
  },
];

const BentoCard = ({ dest, index }: { dest: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group overflow-hidden rounded-[2rem] bg-[#0A100D] border border-white/5 flex flex-col justify-end ${dest.className} h-[400px] md:h-auto`}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Hover Gradient overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image with zoom effect on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between pointer-events-none">
        
        {/* Top Badges */}
        <div className="flex justify-between items-start w-full">
          <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium tracking-wide uppercase flex items-center gap-1.5 shadow-lg">
            <Compass className="w-3.5 h-3.5" />
            {dest.category}
          </span>
          
          <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
            {dest.className.includes('col-span-2') ? (
              <>
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs flex items-center gap-1.5">
                  <CloudSun className="w-3.5 h-3.5" /> {dest.weather}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5" /> {dest.altitude}
                </span>
                <span className="hidden md:flex px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {dest.duration}
                </span>
              </>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-[10px] sm:text-xs flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {dest.duration}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-auto transform transition-all duration-500 ease-out translate-y-2 group-hover:translate-y-0">
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
            {dest.name}
          </h3>
          <p className="text-white/70 font-serif italic text-base md:text-lg lg:text-xl mb-4 line-clamp-2 md:line-clamp-1 pr-4">
            {dest.tagline}
          </p>
          
          {/* Highlights & CTA - Appear on hover */}
          <div className="flex flex-col gap-4 md:gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {dest.highlights.map((h: string) => (
                <span key={h} className="text-[10px] md:text-xs text-emerald-100/70 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/20 backdrop-blur-sm">
                  {h}
                </span>
              ))}
            </div>
            
            <Link 
              href={`/destinations/${dest.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 uppercase tracking-widest hover:text-emerald-300 pointer-events-auto w-max py-2"
            >
              Explore <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Invisible full card link to capture mobile taps and improve desktop UX */}
      <Link href={`/destinations/${dest.id}`} className="absolute inset-0 z-30 focus:outline-none" aria-label={`Explore ${dest.name}`} />
    </motion.div>
  );
};

export default function DestinationReveal() {
  return (
    <section className="bg-[#050A08] py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <div className="container-default relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs md:text-sm tracking-widest uppercase font-semibold mb-6 inline-flex items-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              The Collection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Iconic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Destinations</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1 text-sm md:text-base font-medium tracking-wide uppercase"
            >
              View all locations <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-5 lg:gap-6 md:auto-rows-[300px] lg:auto-rows-[360px]">
          {bentoDestinations.map((dest, index) => (
            <BentoCard key={dest.id} dest={dest} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
