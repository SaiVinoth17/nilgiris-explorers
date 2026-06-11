"use client";



interface AtmosphericMistProps {
  className?: string;
  opacity?: number;
}

export default function AtmosphericMist({ className = "", opacity = 0.3 }: AtmosphericMistProps) {

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    >
      {/* SVG Noise Filter for Mist Texture */}
      <svg className="hidden">
        <filter id="mist-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
          <feBlend in="SourceGraphic" in2="coloredNoise" mode="screen" />
        </filter>
      </svg>

      {/* Layer 1: Slow moving base mist */}
      <div
        className="absolute inset-0 bg-white"
        /* removed initial */
        style={{ filter: "url(#mist-noise) blur(24px)", opacity: 0.4 }}
      />
      
      {/* Layer 2: Fast drifting fog overlay */}
      <div
        className="absolute inset-[-20%] bg-white mix-blend-screen"
        /* removed initial */
        style={{ filter: "url(#mist-noise) blur(32px)", opacity: 0.3 }}
      />
      
      {/* Radial gradient mask to blend edges into the forest background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0B1D17_100%)] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D17] via-transparent to-[#0B1D17] opacity-30" />
    </div>
  );
}
