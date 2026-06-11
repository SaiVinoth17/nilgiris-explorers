"use client";

interface AtmosphericMistProps {
  className?: string;
  opacity?: number;
}

const FOG_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fog'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004 0.008' numOctaves='3' result='noise'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1.2 0 0 0 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fog)'/%3E%3C/svg%3E")`;

export default function AtmosphericMist({ className = "", opacity = 0.3 }: AtmosphericMistProps) {

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ opacity, transform: "translateZ(0)" }}
    >
      {/* Layer 1: Base mist */}
      <div
        className="absolute inset-[-10%] opacity-40 mix-blend-screen"
        style={{ 
          backgroundImage: FOG_TEXTURE,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(0)"
        }}
      />
      
      {/* Layer 2: Drifting fog overlay */}
      <div
        className="absolute inset-[-20%] opacity-30 mix-blend-screen"
        style={{ 
          backgroundImage: FOG_TEXTURE,
          backgroundSize: "150% 150%",
          backgroundPosition: "top left",
          transform: "translateZ(0)"
        }}
      />
      
      {/* Radial gradient mask to blend edges into the forest background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0B1D17_100%)] opacity-40 transform-gpu" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D17] via-transparent to-[#0B1D17] opacity-30 transform-gpu" />
    </div>
  );
}
