"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface CinematicMistProps {
  position?: "top" | "bottom" | "full" | "hero";
  opacity?: number;
}

// Highly optimized SVG procedural fog texture baked into a Data URI.
// Rendered once by the browser into a static image buffer.
const FOG_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fog'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005 0.01' numOctaves='3' result='noise'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 -0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fog)'/%3E%3C/svg%3E")`;

export default function CinematicMist({ position = "full", opacity = 1 }: CinematicMistProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax mappings tied to window scroll
  const parallaxY1 = useTransform(scrollY, [0, 2000], [0, -150]);
  const parallaxY2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const parallaxY3 = useTransform(scrollY, [0, 2000], [0, 100]); // Moves down slightly

  if (!mounted) return null;
  if (shouldReduceMotion) return null;

  const isHero = position === "hero";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${
        position === "bottom" ? "top-auto h-[70vh]" : ""
      } ${position === "top" ? "bottom-auto h-[70vh]" : ""}`}
      style={{ opacity }}
    >
      {/* 
        Layer 1: Deep Mountain Haze
        Very slow infinite drift, very large scale. Not tied to scroll. 
      */}
      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-x-[20%] -inset-y-[20%] w-[140%] h-[140%] opacity-[0.25]"
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
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-x-[15%] -inset-y-[10%] w-[130%] h-[120%] opacity-[0.35]"
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
            duration: 60,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-x-[10%] top-[20%] w-[120%] h-[100%] opacity-[0.4]"
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
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-x-[15%] bottom-0 w-[130%] h-[60%]"
        style={{
          backgroundImage: FOG_TEXTURE,
          backgroundSize: "200% 200%",
          backgroundPosition: "bottom center",
          y: parallaxY3,
        }}
      />

      {/* Static Ground Fog Gradient (anchors the mist beautifully to edges) */}
      {(position === "bottom" || isHero) && (
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0B1D17]/80 via-[#0B1D17]/20 to-transparent" />
      )}
      {position === "top" && (
        <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-[#0B1D17]/80 via-[#0B1D17]/20 to-transparent" />
      )}
    </div>
  );
}
