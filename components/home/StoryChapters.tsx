"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const chapters = [
  {
    id: "ooty",
    title: "Sunrise over Doddabetta",
    subtitle: "Ooty • 2,637m",
    description: "The journey begins above the clouds. Feel the crisp mountain air as the first light of dawn reveals the sprawling Nilgiri biosphere below. This is where time slows down.",
    image: "/images/dest_new_doddabetta.png"
  },
  {
    id: "coonoor",
    title: "The Emerald Terraces",
    subtitle: "Coonoor • Tea Estates",
    description: "Descend into endless rolling hills draped in manicured tea bushes. The scent of fresh eucalyptus and crushed tea leaves fills the air as the heritage toy train echoes in the valley.",
    image: "/images/stunning_tea_estate.png"
  },
  {
    id: "pykara",
    title: "The Untamed Waters",
    subtitle: "Pykara • Sacred River",
    description: "Deep in the shola forests, crystal-clear waters plunge over rocky terrains. Protected and pristine, Pykara is the untouched soul of the Nilgiris.",
    image: "/images/stunning_pykara.png"
  },
  {
    id: "mudumalai",
    title: "The Wild Frontier",
    subtitle: "Mudumalai • Biosphere",
    description: "The mist fades into the warm, dense jungles of the Western Ghats. This is the domain of the wild elephant, the elusive leopard, and the majestic Bengal tiger.",
    image: "/images/real_mudumalai.jpg"
  }
];

export default function StoryChapters() {
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const chapterHeight = windowHeight * 1.5;
          
          // rect.top goes negative as we scroll past the start of the container
          const scrolledDistance = -rect.top;
          
          if (scrolledDistance >= 0) {
            const index = Math.min(
              chapters.length - 1,
              Math.max(0, Math.floor(scrolledDistance / chapterHeight))
            );
            setActiveChapter((prev) => prev !== index ? index : prev);
          } else {
            setActiveChapter((prev) => prev !== 0 ? 0 : prev);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: `${chapters.length * 150}vh` }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {chapters.map((chapter, index) => (
          <div 
            key={chapter.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeChapter ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image
              src={chapter.image}
              alt={chapter.title}
              fill
              className="object-cover scale-105" // slight scale to avoid edge bleeding
              priority={index === 0}
            />
            {/* Gradient Overlays for Text Readability & Seamless Transitions */}
            <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent md:w-2/3 z-20 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24 max-w-4xl">
              <span className="text-amber-400 font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-4 block">
                Chapter 0{index + 1}
              </span>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
                {chapter.title}
              </h2>
              <h3 className="text-emerald-400 text-xl md:text-3xl font-light mb-6 font-display">
                {chapter.subtitle}
              </h3>
              <p className="text-white/80 text-lg md:text-2xl leading-relaxed max-w-2xl font-light">
                {chapter.description}
              </p>
            </div>
          </div>
        ))}

        {/* Scroll Progress Indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {chapters.map((_, idx) => (
            <div 
              key={idx}
              className={`w-1 rounded-full transition-all duration-500 ${idx === activeChapter ? 'h-12 bg-emerald-400' : 'h-3 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
