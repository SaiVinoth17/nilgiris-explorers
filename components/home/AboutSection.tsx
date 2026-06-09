"use client";
import { useEffect, useRef, useState } from "react";

import { stats } from "@/lib/data";
import { Mountain, Award, Heart } from "lucide-react";

function useInView(ref: React.RefObject<any>, options: { once?: boolean } = {}) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once) observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.once]);
  return isInView;
}

function CountUp({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const duration = 2000;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-pad section-forest">
      <div className="container-default">
        {/* Main about layout */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          {/* Left — Brand Card (No picture) */}
          <div
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden h-96 sm:h-[480px] bg-gradient-to-br from-[#16332a] to-[#0a0e1a] border border-white/5 flex flex-col justify-center items-center p-8 text-center shadow-2xl">
              {/* Glowing decorative circles */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#00D26A]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#0B9FD4]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center mb-6 shadow-xl relative z-10 animate-pulse">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 relative z-10">Nilgiris Explorers Tours & Travels</h3>
              <p className="text-white/40 text-sm max-w-xs relative z-10 leading-relaxed">
                An independently owned local tourism and travel service based in Ooty, focused on providing personalized travel experiences across the Nilgiris region.
              </p>
            </div>

            {/* Floating stats card */}
            <div
              className="absolute -bottom-6 -right-4 glass-card rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#00D26A]/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#00D26A]" />
                </div>
                <span className="text-white font-semibold text-sm">Trusted Since 2021</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">8+</div>
                  <div className="text-xs text-white/40">Years of Service</div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div className="text-2xl font-bold gradient-text">50+</div>
                  <div className="text-xs text-white/40">Expert Drivers</div>
                </div>
              </div>
            </div>

            {/* Floating local tag */}
            <div
              className="absolute -top-4 -left-4 glass-card rounded-xl px-4 py-2.5 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span className="text-white text-sm font-medium">Ooty's Favourite Local Experts Since 2021</span>
            </div>
          </div>

          {/* Right — Content */}
          <div
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="section-label">Our Story</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Born In The Mist,{" "}
              <span className="gradient-text">Built For You</span>
            </h2>

            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                Nilgiris Explorers was born in 2021 from a deep love for the mountains of Ooty. Our founders — lifelong Nilgiris residents — watched visitors struggle to discover the true soul of this place: the hidden lakes, the misty sunrise trails, the tea estate walks unknown to guidebooks.
              </p>
              <p>
                We set out to change that. As a full-service local experts, we design every tour around your interests, pace, and budget. From a romantic honeymoon in the mist to a thrilling wildlife safari in Mudumalai, every itinerary is handcrafted with personalized service and direct communication with local experts.
              </p>
              <p>
                Today, with 50+ vehicles, a trusted network of certified guides, and direct partnerships with the finest resorts in the Nilgiris, our owner-operated business has helped over 10,000 travelers create memories that last a lifetime.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {["Award-Winning Local Experts", "Local Expert Guides", "100% Customizable"].map((val, i) => (
                <div key={val} className="text-center p-4 glass-card rounded-xl">
                  <div className="text-2xl mb-2">{["🏆", "🏔️", "✨"][i]}</div>
                  <div className="text-xs font-semibold text-white">{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Stats */}
        <div
          className="glass-card rounded-3xl p-8 sm:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl font-bold text-white">
              Numbers That <span className="gradient-text">Tell Our Story</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <div className="text-white/50 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
