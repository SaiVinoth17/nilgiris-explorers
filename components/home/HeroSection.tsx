"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Play, Star, Shield, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CinematicMist from "@/components/ui/CinematicMist";


// ... existing imports up to line 7 ...
const trustBadges = [
  { icon: Users, value: "2,637m", label: "Above Sea Level" },
  { icon: Star, value: "Year-Round", label: "Mist" },
  { icon: Clock, value: "UNESCO", label: "Biosphere" },
  { icon: Shield, value: "Living", label: "Heritage" },
];

export default function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <div className="absolute inset-0 w-full h-full">
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
        {/* Massive fade to black at the bottom to transition seamlessly into StoryChapters */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Cinematic Mist Atmosphere - Placed behind content, in front of background */}
      <CinematicMist position="hero" opacity={0.8} />


      {/* Content */}
      <div className="relative z-10 container-default pt-24 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D26A' }} />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              A Journey Through the Mountains
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-white mb-6">
            Where the Mountains{" "}
            <span className="gradient-text">Meet the Mist</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/65 max-w-2xl mb-10 leading-relaxed">
            Seven thousand feet above the plains, ancient shola forests breathe
            mist into valleys of tea and wildflowers. This is the Nilgiris —
            where every road winds into a story waiting to be lived.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link href="/tours" className="btn-primary text-base px-7 py-4 touch-feedback">
              Begin the Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/#explore" className="btn-secondary text-base px-7 py-4 touch-feedback">
              Discover What Awaits
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass flex items-center gap-2.5 px-4 py-3 rounded-xl hover:-translate-y-1 transition-transform duration-300"
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-in fade-in duration-1000 delay-1000 fill-mode-both">
        <span className="text-[10px] font-medium text-white/50 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 via-white/10 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
