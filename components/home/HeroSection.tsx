"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star, Shield, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import AtmosphericMist from "@/components/ui/AtmosphericMist";

// ... existing imports up to line 7 ...
const trustBadges = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Star, value: "4.9★", label: "Rating" },
  { icon: Clock, value: "24/7", label: "Support" },
  { icon: Shield, value: "100%", label: "Curated Experiences" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full parallax-mobile-disabled"
      >
        <Image
          src="/images/stunning_panoramic_hero.png" // Updated to use the premium panoramic hero image
          alt="Nilgiris Explorers - Premium Ooty Cab and Tour Booking"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center scale-110"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        {/* Additional dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D17]/65 via-transparent to-[#0B1D17]/35 pointer-events-none" />
      </motion.div>

      {/* Cinematic Mist Atmosphere */}
      <AtmosphericMist opacity={0.35} />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-default pt-24 pb-16"
      >
        <div className="max-w-4xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D26A' }} />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              Premium Travel Agency · Ooty, Nilgiris
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-white mb-6">
            Explore The{" "}
            <span className="gradient-text">Nilgiris</span>
            <br />
            In Style
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/65 max-w-2xl mb-10 leading-relaxed">
            Experience Ooty, Coonoor, Avalanche, Pykara, and Mudumalai with
            expertly crafted tour packages, knowledgeable local guides, and
            unforgettable travel memories — all tailored just for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link href="/tours" className="btn-primary text-base px-7 py-4">
              Book Your Ride
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/#booking" className="btn-secondary text-base px-7 py-4">
              Explore Packages
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass flex items-center gap-2.5 px-4 py-3 rounded-xl card-hover"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,210,106,0.15)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#00D26A' }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{value}</div>
                  <div className="text-xs text-white/50">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
