"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface CinematicMistProps {
  position?: "top" | "bottom" | "full" | "hero";
  opacity?: number;
}

export default function CinematicMist({ position = "full", opacity = 1 }: CinematicMistProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (shouldReduceMotion) return null;

  // Different layout/layer structures depending on where the mist is used
  const isHero = position === "hero";
  const isTransition = position === "bottom" || position === "top";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${
        position === "bottom" ? "top-auto h-[60vh]" : ""
      } ${position === "top" ? "bottom-auto h-[60vh]" : ""}`}
      style={{ opacity }}
    >
      {/* Texture blending base (Optional to give the gradients some grit if needed, but keeping it light) */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.015] mix-blend-overlay" />

      {/* Mist Layer 1: Slow, large, deep background drift */}
      <motion.div
        animate={{
          x: ["-5%", "2%", "-5%"],
          y: ["0%", "-2%", "0%"],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-x-[20%] -inset-y-[10%] w-[140%] h-[120%]"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(200, 255, 230, 0.12) 0%, transparent 60%)",
          transformOrigin: "center",
        }}
      />

      {/* Mist Layer 2: Mid-ground, slightly faster, counter-movement for parallax */}
      <motion.div
        animate={{
          x: ["2%", "-5%", "2%"],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-x-[15%] top-[10%] w-[130%] h-[100%]"
        style={{
          background: "radial-gradient(ellipse at 40% 70%, rgba(180, 245, 220, 0.15) 0%, transparent 55%)",
        }}
      />

      {/* Mist Layer 3: Close foreground, wispy */}
      {isHero && (
        <motion.div
          animate={{
            x: ["-3%", "4%", "-3%"],
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-x-[10%] top-[30%] w-[120%] h-[90%]"
          style={{
            background: "radial-gradient(ellipse at 60% 80%, rgba(220, 255, 240, 0.12) 0%, transparent 65%)",
          }}
        />
      )}

      {/* Static Ground Fog Gradient (anchor the mist to the bottom beautifully) */}
      {(position === "bottom" || isHero) && (
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0B1D17]/40 via-[#0B1D17]/10 to-transparent" />
      )}
      {position === "top" && (
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#0B1D17]/40 via-[#0B1D17]/10 to-transparent" />
      )}
    </div>
  );
}
