import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import CinematicMist from "@/components/ui/CinematicMist";
import AnimatedSection from "@/components/ui/AnimatedSection";

const InteractiveExplorer = dynamic(() => import("@/components/home/InteractiveExplorer"));
const HiddenGems = dynamic(() => import("@/components/home/HiddenGems"));
const JourneyRecommender = dynamic(() => import("@/components/home/JourneyRecommender"));
const TrustSection = dynamic(() => import("@/components/home/TrustSection"));
const FaqSection = dynamic(() => import("@/components/home/FaqSection"));
const WhatsAppWidget = dynamic(() => import("@/components/layout/WhatsAppWidget"));

import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-forest relative selection:bg-emerald-500/30 selection:text-white">
      {/* Chapter 1: Welcome */}
      <HeroSection />

      {/* Chapter 6: Interactive Discovery */}
      <div className="relative">
        <CinematicMist position="top" opacity={0.5} />
        <AnimatedSection id="explore">
          <InteractiveExplorer />
        </AnimatedSection>
      </div>
      
      {/* Local Authority & Trust */}
      <div className="relative">
        <CinematicMist position="bottom" opacity={0.3} />
        <AnimatedSection delay={0.1}>
          <HiddenGems />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <TrustSection />
        </AnimatedSection>
      </div>
      
      {/* Chapter 7: The Conclusion / Your Journey */}
      <section className="section-pad bg-[#0B1D17] relative">
        <CinematicMist position="top" opacity={0.4} />
        <div className="container-default relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                Your Journey, <span className="text-emerald-400">Your Way</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Every traveler sees the Nilgiris differently. Tell us what moves you, and we'll show you the mountains through your eyes.
              </p>
            </div>
            <JourneyRecommender />
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection>
        <FaqSection />
      </AnimatedSection>
      
      {/* Silent floating assistant */}
      <WhatsAppWidget />
    </main>
  );
}
