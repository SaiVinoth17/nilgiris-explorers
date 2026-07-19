"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Animation Presets ────────────────────────────── */
const PRESETS = {
  /** Section tilts up from below like a rising card */
  rise: {
    from: { rotateX: 12, y: 100, scale: 0.92, opacity: 0 },
    to: { rotateX: 0, y: 0, scale: 1, opacity: 1 },
    origin: "center bottom",
  },
  /** Section sweeps in from the left with a Y-axis tilt */
  tiltLeft: {
    from: { rotateY: -8, x: -80, scale: 0.94, opacity: 0 },
    to: { rotateY: 0, x: 0, scale: 1, opacity: 1 },
    origin: "left center",
  },
  /** Section sweeps in from the right with a Y-axis tilt */
  tiltRight: {
    from: { rotateY: 8, x: 80, scale: 0.94, opacity: 0 },
    to: { rotateY: 0, x: 0, scale: 1, opacity: 1 },
    origin: "right center",
  },
  /** Section zooms forward from deep Z-space */
  depth: {
    from: { z: -300, scale: 0.8, opacity: 0 },
    to: { z: 0, scale: 1, opacity: 1 },
    origin: "center center",
  },
  /** Subtle lift with no rotation — gentler variant */
  float: {
    from: { y: 60, scale: 0.97, opacity: 0 },
    to: { y: 0, scale: 1, opacity: 1 },
    origin: "center center",
  },
} as const;

export type ScrollRevealVariant = keyof typeof PRESETS;

interface Scroll3DRevealProps {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  /** Perspective distance in px — lower = more dramatic (default 1000) */
  perspective?: number;
  /** ScrollTrigger scrub value — higher = smoother but slower (default 0.6) */
  scrub?: number;
  /** When the animation starts relative to viewport (default "top 90%") */
  start?: string;
  /** When the animation ends / section is fully revealed (default "top 30%") */
  end?: string;
  className?: string;
}

export default function Scroll3DReveal({
  children,
  variant = "rise",
  perspective = 1000,
  scrub = 0.6,
  start = "top 90%",
  end = "top 30%",
  className = "",
}: Scroll3DRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const preset = PRESETS[variant];

    // Set 3D perspective on the wrapper
    gsap.set(el, {
      transformPerspective: perspective,
      transformOrigin: preset.origin,
      ...preset.from,
    });

    const tween = gsap.to(el, {
      ...preset.to,
      ease: "none", // scrub handles easing via scroll position
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, perspective, scrub, start, end]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}
