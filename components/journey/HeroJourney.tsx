"use client";

export default function HeroJourney() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-void flex items-center justify-center">

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover opacity-50 scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />

        {/* Optional Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
          }}
        />
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
        <span className="text-white/40 text-xs font-sans uppercase tracking-widest">
          Begin Journey
        </span>

        <div className="w-[1px] h-10 bg-gradient-to-b from-brand-emerald/50 to-transparent" />
      </div>

    </div>
  );
}