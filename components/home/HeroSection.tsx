"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Star, Shield, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import CinematicMist from "@/components/ui/CinematicMist";

const trustBadges = [
  { icon: Users, value: "2,637m", label: "Above Sea Level" },
  { icon: Star, value: "Year-Round", label: "Mist" },
  { icon: Clock, value: "UNESCO", label: "Biosphere" },
  { icon: Shield, value: "Living", label: "Heritage" },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax bindings
  const yBg = useTransform(scrollY, [0, 1000], [0, 250]);
  const yContent = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityContent = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax and Cinematic Slow Zoom */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: yBg }}
        animate={mounted ? { scale: [1.1, 1.05] } : { scale: 1.05 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <Image
          src="/images/stunning_panoramic_hero.png"
          alt="Nilgiris Explorers - Premium Ooty Cab and Tour Booking"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        {/* Additional dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D17]/65 via-transparent to-[#0B1D17]/35 pointer-events-none" />
        {/* Massive fade to transition seamlessly into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-[#0B1D17] via-[#0B1D17]/80 to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Atmospheric Mist & Particles */}
      <CinematicMist position="hero" opacity={0.8} />

      {/* Content */}
      <motion.div 
        className="relative z-10 container-default pt-24 pb-32"
        style={{ y: yContent, opacity: opacityContent }}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D26A' }} />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              A Journey Through the Mountains
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-white mb-6">
            Where the Mountains{" "}
            <span className="gradient-text inline-block">Meet the Mist</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/65 max-w-2xl mb-10 leading-relaxed">
            Seven thousand feet above the plains, ancient shola forests breathe
            mist into valleys of tea and wildflowers. This is the Nilgiris —
            where every road winds into a story waiting to be lived.
          </p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <MagneticButton as={Link} href="/tours" className="btn-primary text-base px-7 py-4 touch-feedback">
              Begin the Journey
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton as={Link} href="/#explore" className="btn-secondary text-base px-7 py-4 touch-feedback">
              Discover What Awaits
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            className="flex flex-wrap gap-3"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {trustBadges.map(({ icon: Icon, value, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + (idx * 0.1) }}
                className="glass flex items-center gap-2.5 px-4 py-3 rounded-xl hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,210,106,0.15)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#00D26A' }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{value}</div>
                  <div className="text-xs text-white/50">{label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{ opacity: opacityContent }}
      >
        <span className="text-[10px] font-medium text-white/50 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 via-white/10 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
