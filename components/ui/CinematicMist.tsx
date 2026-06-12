"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import FloatingParticles from "./FloatingParticles";

interface CinematicMistProps {
  position?: "top" | "bottom" | "full" | "hero";
  opacity?: number;
}

// Highly optimized SVG procedural fog texture baked into a Data URI.
// Rendered once by the browser into a static image buffer.
// Adjusted to be slightly softer and more organic.
const FOG_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fog'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.003 0.006' numOctaves='4' result='noise'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1.0 0 0 0 -0.15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fog)'/%3E%3C/svg%3E")`;

export default function CinematicMist({ position = "full", opacity = 1 }: CinematicMistProps) {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax mappings tied to window scroll
  const parallaxY1 = useTransform(scrollY, [0, 2000], [0, -250]);
  const parallaxY2 = useTransform(scrollY, [0, 2000], [0, -400]);
  const parallaxY3 = useTransform(scrollY, [0, 2000], [0, 150]); // Moves down slightly for foreground depth

  if (!mounted) return null;

  const isHero = position === "hero";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen ${
        position === "bottom" ? "top-auto h-[70vh]" : ""
      } ${position === "top" ? "bottom-auto h-[70vh]" : ""}`}
      style={{ opacity }}
    >
      {/* Volumetric Light Rays (Soft radial gradients) */}
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.05, 1],
          x: ["-2%", "2%", "-2%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] pointer-events-none mix-blend-screen opacity-20"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* 
        Layer 1: Deep Mountain Haze
        Very slow infinite drift, very large scale. Not tied to scroll. 
      */}
      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 160,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-x-[20%] -inset-y-[20%] w-[140%] h-[140%] opacity-[0.15]"
        style={{
          backgroundImage: FOG_TEXTURE,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 
        Layer 2: Ambient Diagonal Fog 
        Tied to parallaxY1. Moves upward slightly as you scroll down.
      */}
      <motion.div
        animate={{
          x: ["5%", "-5%", "5%"],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-x-[15%] -inset-y-[10%] w-[130%] h-[120%] opacity-[0.25]"
        style={{
          backgroundImage: FOG_TEXTURE,
          backgroundSize: "120% 120%",
          backgroundPosition: "top left",
          y: parallaxY1,
        }}
      />

      {/* 
        Layer 3: Mid-ground Parallax Fog
        Faster scroll reaction, pushes up quickly to create depth.
      */}
      {isHero && (
        <motion.div
          animate={{
            x: ["-2%", "2%", "-2%"],
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-x-[10%] top-[10%] w-[120%] h-[110%] opacity-[0.35]"
          style={{
            backgroundImage: FOG_TEXTURE,
            backgroundSize: "150% 150%",
            backgroundPosition: "bottom right",
            y: parallaxY2,
          }}
        />
      )}

      {/* 
        Layer 4: Foreground Wisps
        Fastest layer, moves slightly downwards during scroll for reverse parallax contrast.
      */}
      <motion.div
        animate={{
          x: ["0%", "-10%", "0%"],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-x-[15%] bottom-[-10%] w-[130%] h-[70%]"
        style={{
          backgroundImage: FOG_TEXTURE,
          backgroundSize: "200% 200%",
          backgroundPosition: "bottom center",
          y: parallaxY3,
        }}
      />

      {/* Particles Integration */}
      <FloatingParticles count={isHero ? 50 : 25} />

      {/* Static Ground Fog Gradient (anchors the mist beautifully to edges) */}
      {(position === "bottom" || isHero) && (
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#0B1D17] via-[#0B1D17]/60 to-transparent pointer-events-none" />
      )}
      {position === "top" && (
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-[#0B1D17] via-[#0B1D17]/60 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
