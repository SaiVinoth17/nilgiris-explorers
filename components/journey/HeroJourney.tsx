"use client";

import Link from "next/link";
import { ArrowRight, Compass, Shield, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import MagneticButton from "@/components/ui/MagneticButton";

const trustBadges = [
  { icon: Users, value: "2,637m", label: "Above Sea Level" },
  { icon: Star, value: "Year-Round", label: "Mountain Mist" },
  { icon: Compass, value: "UNESCO", label: "Biosphere Reserve" },
  { icon: Shield, value: "Living", label: "Tribal Heritage" },
];

export default function HeroJourney() {
  return (
    <div className="relative w-full bg-[#050A08]">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/hero-video.mp4"
        posterSrc="/images/nilgiris_hero_poster.png"
        bgImageSrc="/images/nilgiris_hero_bg.png"
        title="Discover The Nilgiris"
        date="• Mountain Adventures"
        scrollToExpand="Scroll to Explore"
        firstWordClass="text-white"
        restOfTitleClass="text-emerald-400"
        textBlend={false}
      >
        {/* Content revealed when hero video fully expands */}
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-2 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-emerald-400" />
            <span className="text-xs sm:text-sm text-emerald-200 font-medium tracking-wide">
              Premier Ooty Cab Booking & Mountain Expeditions
            </span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6">
            Where the Mountains{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Meet the Mist
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/80 max-w-3xl mb-10 leading-relaxed font-light">
            Seven thousand feet above the plains, ancient shola forests breathe mist into valleys of tea and wildflowers. This is the Nilgiris — where every winding road opens a new chapter in your story.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <MagneticButton as={Link} href="/tours" className="btn-primary text-base px-8 py-4 rounded-xl flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 transition-all">
              Book Your Journey
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton as={Link} href="/destinations" className="btn-secondary text-base px-8 py-4 rounded-xl flex items-center gap-2 glass border border-white/20 text-white hover:bg-white/10 font-semibold transition-all">
              Explore Destinations
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {trustBadges.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/10 transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-base font-bold text-white leading-snug">{value}</div>
                  <div className="text-xs text-white/60 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}