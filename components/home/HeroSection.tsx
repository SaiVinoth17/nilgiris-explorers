"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Play, Star, Shield, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


// ... existing imports up to line 7 ...
const trustBadges = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Star, value: "4.9★", label: "Rating" },
  { icon: Clock, value: "24/7", label: "Support" },
  { icon: Shield, value: "100%", label: "Curated Experiences" },
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
        
        {/* CSS Lightweight Mist Layers */}
        <div className="absolute inset-0 mist-layer-1" style={{ width: '150%', height: '150%', left: '-25%', top: '-25%' }} />
        <div className="absolute inset-0 mist-layer-2" style={{ width: '150%', height: '150%', left: '-25%', top: '-25%', animationDelay: '-10s' }} />
        
        {/* Additional dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D17]/65 via-transparent to-[#0B1D17]/35 pointer-events-none" />
      </div>


      {/* Content */}
      <div className="relative z-10 container-default pt-24 pb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D26A' }} />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              Premium Local Experts · Ooty, Nilgiris
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
            <Link href="/tours" className="btn-primary text-base px-7 py-4 touch-feedback">
              Plan Your Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/#explore" className="btn-secondary text-base px-7 py-4 touch-feedback">
              Explore Destinations
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-in fade-in duration-1000 delay-1000 fill-mode-both">
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
