import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import CinematicMist from "@/components/ui/CinematicMist";

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
        <InteractiveExplorer />
      </div>
      
      {/* Local Authority & Trust */}
      <div className="relative">
        <CinematicMist position="bottom" opacity={0.3} />
        <HiddenGems />
        <TrustSection />
      </div>
      
      {/* Chapter 7: The Conclusion / Your Journey */}
      <section className="section-pad bg-[#0B1D17] relative">
        <CinematicMist position="top" opacity={0.4} />
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Journey, <span className="text-emerald-400">Your Way</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Every traveler sees the Nilgiris differently. Tell us what moves you, and we'll show you the mountains through your eyes.
            </p>
          </div>
          <JourneyRecommender />
        </div>
      </section>

      <FaqSection />
      
      {/* Silent floating assistant */}
      <WhatsAppWidget />
    </main>
  );
}
