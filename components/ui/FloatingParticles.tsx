"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface FloatingParticlesProps {
  count?: number;
}

export default function FloatingParticles({ count = 30 }: FloatingParticlesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate particles once to prevent re-renders
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1; // 1px to 4px
      const top = Math.random() * 100; // 0% to 100%
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 15 + 15; // 15s to 30s
      const delay = Math.random() * -30; // Negative delay so they start out-of-sync immediately
      const opacity = Math.random() * 0.5 + 0.2; // 0.2 to 0.7
      
      return {
        id: i,
        size,
        top: `${top}%`,
        left: `${left}%`,
        duration,
        delay,
        baseOpacity: opacity,
      };
    });
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, p.baseOpacity, p.baseOpacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
            opacity: {
              duration: p.duration,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }
          }}
        />
      ))}
    </div>
  );
}
