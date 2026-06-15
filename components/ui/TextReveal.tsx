"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Split mode: 'words' reveals word by word, 'lines' reveals line by line */
  splitBy?: "words" | "lines";
  /** Initial opacity of unrevealed text */
  dimOpacity?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Additional delay before animation starts */
  delay?: number;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  splitBy = "words",
  dimOpacity = 0.15,
  start = "top 85%",
  end = "top 25%",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show all text at full opacity
      const spans = el.querySelectorAll("span[data-reveal]");
      spans.forEach((span) => {
        (span as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const spans = el.querySelectorAll("span[data-reveal]");

    gsap.set(spans, { opacity: dimOpacity });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 0.5,
      },
    });

    tl.to(spans, {
      opacity: 1,
      duration: 1,
      stagger: splitBy === "words" ? 0.05 : 0.2,
      delay,
      ease: "none",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [children, splitBy, dimOpacity, start, end, delay]);

  // Split text into spans
  const renderContent = () => {
    if (splitBy === "words") {
      return children.split(" ").map((word, i) => (
        <span
          key={i}
          data-reveal
          className="inline-block"
          style={{ opacity: 0.15 }}
        >
          {word}
          {i < children.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ));
    }

    // Lines mode — split by newline or sentence
    return children.split(". ").map((line, i, arr) => (
      <span
        key={i}
        data-reveal
        className="block"
        style={{ opacity: 0.15 }}
      >
        {line}
        {i < arr.length - 1 ? ". " : ""}
      </span>
    ));
  };

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={containerRef} className={className}>
      {renderContent()}
    </Tag>
  );
}
