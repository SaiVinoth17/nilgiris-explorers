import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import StoryChapters from "@/components/home/StoryChapters";
import FounderSection from "@/components/home/FounderSection";

const InteractiveExplorer = dynamic(() => import("@/components/home/InteractiveExplorer"));
const HiddenGems = dynamic(() => import("@/components/home/HiddenGems"));
const JourneyRecommender = dynamic(() => import("@/components/home/JourneyRecommender"));
const TrustSection = dynamic(() => import("@/components/home/TrustSection"));
const FaqSection = dynamic(() => import("@/components/home/FaqSection"));
const WhatsAppWidget = dynamic(() => import("@/components/layout/WhatsAppWidget"));
const BookingWidget = dynamic(() => import("@/components/home/BookingWidget"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const TravelGuidePreview = dynamic(() => import("@/components/home/TravelGuidePreview"));
const TourPackages = dynamic(() => import("@/components/home/TourPackages"));

import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-forest relative selection:bg-emerald-500/30 selection:text-white">
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Booking / Conversion */}
      <BookingWidget />

      {/* 3. Initial Trust Building */}
      <WhyChooseUs />
      <FounderSection />

      {/* 4. The Emotional Pitch */}
      <StoryChapters />

      {/* 5. Destinations & Exploration */}
      <InteractiveExplorer />
      <HiddenGems />

      {/* 6. Popular Routes / Packages */}
      <TourPackages />

      {/* 7. Social Proof & Authority */}
      <Testimonials />
      <TrustSection />

      {/* 8. Content & Guides */}
      <TravelGuidePreview />
      
      {/* 9. Final CTA & Recommendation */}
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

      {/* 10. FAQ */}
      <FaqSection />
      
      <WhatsAppWidget />
    </main>
  );
}
