import dynamic from "next/dynamic";
import HeroJourney from "@/components/journey/HeroJourney";
import JourneyNarrative from "@/components/journey/JourneyNarrative";
import DestinationReveal from "@/components/journey/DestinationReveal";
import AdventureBooking from "@/components/journey/AdventureBooking";
import JourneyFooter from "@/components/journey/JourneyFooter";
import Scroll3DReveal from "@/components/ui/Scroll3DReveal";


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
      {/* 1. Cinematic Entry — no 3D wrap, visible on load */}
      <HeroJourney />
      
      {/* 2. Story Bridge */}
      <Scroll3DReveal variant="rise">
        <JourneyNarrative />
      </Scroll3DReveal>
      
      {/* 3. The Four Worlds */}
      <Scroll3DReveal variant="tiltLeft">
        <ExperiencesShowcase />
      </Scroll3DReveal>
      
      {/* 4. Immersive Destinations */}
      <Scroll3DReveal variant="depth" perspective={1200}>
        <DestinationReveal />
      </Scroll3DReveal>
      
      {/* 5. Curated Adventures */}
      <Scroll3DReveal variant="tiltRight">
        <ToursShowcase />
      </Scroll3DReveal>
      
      {/* 6. Adventure Planner */}
      <Scroll3DReveal variant="rise">
        <AdventureBooking />
      </Scroll3DReveal>
      
      {/* 7. Traveler Stories */}
      <Scroll3DReveal variant="depth">
        <TestimonialsCinematic />
      </Scroll3DReveal>
      
      {/* 8. The Horizon */}
      <Scroll3DReveal variant="float">
        <JourneyFooter />
      </Scroll3DReveal>
    </div>
  );
}
