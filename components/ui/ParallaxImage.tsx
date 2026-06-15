"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Parallax speed — negative moves up on scroll, positive moves down. Default: -50 */
  speed?: number;
  className?: string;
  /** Image priority for LCP */
  priority?: boolean;
  /** Overlay darkness 0-100 */
  overlay?: number;
}

export default function ParallaxImage({
  src,
  alt,
  speed = -50,
  className = "",
  priority = false,
  overlay = 0,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    tl.fromTo(
      image,
      { y: -speed },
      { y: speed, ease: "none" }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill());
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ top: "-10%", bottom: "-10%", height: "120%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      {overlay > 0 && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ backgroundColor: `rgba(0,0,0,${overlay / 100})` }}
        />
      )}
    </div>
  );
}
