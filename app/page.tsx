import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import StoryChapters from "@/components/home/StoryChapters";

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
      
      {/* Chapters 2-5: The Destinations Story */}
      <StoryChapters />

      {/* Chapter 6: Interactive Discovery */}
      <InteractiveExplorer />
      
      {/* Local Authority & Trust */}
      <HiddenGems />
      <TrustSection />
      
      {/* Chapter 7: The Conclusion / Planning */}
      <section className="section-pad bg-[#0B1D17]">
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready To Experience The <span className="text-emerald-400">Nilgiris?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Skip the generic packages. Let us craft a journey that matches your inspiration.
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
