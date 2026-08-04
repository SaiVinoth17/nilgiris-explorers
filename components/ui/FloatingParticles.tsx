"use client";

import { motion } from "framer-motion";
import { useMemo, useSyncExternalStore } from "react";

interface FloatingParticlesProps {
  count?: number;
}

const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export default function FloatingParticles({ count = 30 }: FloatingParticlesProps) {
  const mounted = useIsMounted();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const pseudoRand = (seed: number) => {
        const x = Math.sin(seed + i * 999) * 10000;
        return x - Math.floor(x);
      };

      const size = pseudoRand(1) * 3 + 1;
      const top = pseudoRand(2) * 100;
      const left = pseudoRand(3) * 100;
      const duration = pseudoRand(4) * 15 + 15;
      const delay = pseudoRand(5) * -30;
      const opacity = pseudoRand(6) * 0.5 + 0.2;
      const xShift = pseudoRand(7) * 60 - 30;

      return {
        id: i,
        size,
        top: `${top}%`,
        left: `${left}%`,
        duration,
        delay,
        baseOpacity: opacity,
        xShift,
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
            x: [0, p.xShift, 0],
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
            },
          }}
        />
      ))}
    </div>
  );
}
