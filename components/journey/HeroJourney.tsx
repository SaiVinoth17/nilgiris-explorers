"use client";

import Image from "next/image";

export default function HeroJourney() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050A08] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stunning_panoramic_hero.png"
          alt="Nilgiris mountain panorama"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A08]/60 via-transparent to-[#050A08]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-9xl text-white tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em]">
          NILGIRIS
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-white/70 mt-6 tracking-wide">
          Journey Through the Blue Mountains
        </p>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-white/40 text-xs font-sans uppercase tracking-widest">Begin Journey</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-emerald-500/50 to-transparent" />
      </div>
    </div>
  );
}
