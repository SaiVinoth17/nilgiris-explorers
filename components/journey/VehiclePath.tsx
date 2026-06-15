"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function VehiclePath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    // We only run this on desktop and if motion is allowed
    const ctx = gsap.context(() => {
      if (!pathRef.current || !vehicleRef.current) return;

      const pathLength = pathRef.current.getTotalLength();
      
      // Set initial dash for drawing effect
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // The main timeline tied to page scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
        }
      });

      // 1. Draw the road ahead of the vehicle
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none"
      }, 0);

      // 2. Move the vehicle along the path
      tl.to(vehicleRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: "none"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 right-0 w-[200px] h-screen pointer-events-none z-40 hidden md:block"
    >
      <svg 
        className="w-full h-full drop-shadow-lg" 
        viewBox="0 0 100 1000" 
        preserveAspectRatio="none"
      >
        {/* The winding mountain road path */}
        <path
          ref={pathRef}
          id="mountain-road"
          d="M 50 0 C 80 100, 20 200, 50 300 C 80 400, 20 500, 50 600 C 80 700, 20 800, 50 900 C 80 950, 50 1000, 50 1000"
          fill="none"
          stroke="rgba(16, 185, 129, 0.2)"
          strokeWidth="3"
          strokeDasharray="6 6"
        />

        {/* The vehicle (Jeep/SUV) */}
        <g ref={vehicleRef} className="text-emerald-400">
          <rect x="-10" y="-15" width="20" height="30" rx="4" fill="currentColor" />
          <rect x="-12" y="-10" width="2" height="6" fill="#fff" opacity="0.8" />
          <rect x="10" y="-10" width="2" height="6" fill="#fff" opacity="0.8" />
          <rect x="-12" y="10" width="2" height="6" fill="#fff" opacity="0.8" />
          <rect x="10" y="10" width="2" height="6" fill="#fff" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
