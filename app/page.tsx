import dynamic from "next/dynamic";
import HeroJourney from "@/components/journey/HeroJourney";
import JourneyNarrative from "@/components/journey/JourneyNarrative";
import DestinationReveal from "@/components/journey/DestinationReveal";
import AdventureBooking from "@/components/journey/AdventureBooking";
import JourneyFooter from "@/components/journey/JourneyFooter";


const ExperiencesShowcase = dynamic(() => import("@/components/journey/ExperiencesShowcase"));
const ToursShowcase = dynamic(() => import("@/components/journey/ToursShowcase"));
const TestimonialsCinematic = dynamic(() => import("@/components/journey/TestimonialsCinematic"));

import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="relative bg-[#050A08] min-h-screen selection:bg-emerald-500/30 selection:text-white">
      {/* 1. Cinematic Entry */}
      <HeroJourney />
      
      {/* 2. Story Bridge & Vehicle Path starts */}

      <JourneyNarrative />
      
      {/* 3. The Four Worlds */}
      <ExperiencesShowcase />
      
      {/* 4. Immersive Destinations */}
      <DestinationReveal />
      
      {/* 5. Curated Adventures */}
      <ToursShowcase />
      
      {/* 6. Adventure Planner */}
      <AdventureBooking />
      
      {/* 7. Traveler Stories */}
      <TestimonialsCinematic />
      
      {/* 8. The Horizon */}
      <JourneyFooter />
    </div>
  );
}
