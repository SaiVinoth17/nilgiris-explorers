import HeroSection from "@/components/home/HeroSection";
import BookingWidget from "@/components/home/BookingWidget";
import TrustSection from "@/components/home/TrustSection";
import Destinations from "@/components/home/Destinations";
import DestinationContent from "@/components/home/DestinationContent";
import TourPackages from "@/components/home/TourPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import InteractiveMap from "@/components/home/InteractiveMap";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";
import FaqSection from "@/components/home/FaqSection";
import TravelGuidePreview from "@/components/home/TravelGuidePreview";
import AboutSection from "@/components/home/AboutSection";
import FleetSection from "@/components/home/FleetSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-forest relative">
      <HeroSection />
      <TourPackages />
      <TrustSection />
      <Destinations />
      <Testimonials />
      <TravelGuidePreview />
      <FaqSection />
      <BookingWidget />
    </main>
  );
}
