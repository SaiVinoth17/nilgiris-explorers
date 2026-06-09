import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";

const TourPackages = dynamic(() => import("@/components/home/TourPackages"));
const TrustSection = dynamic(() => import("@/components/home/TrustSection"));
const Destinations = dynamic(() => import("@/components/home/Destinations"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const TravelGuidePreview = dynamic(() => import("@/components/home/TravelGuidePreview"));
const FaqSection = dynamic(() => import("@/components/home/FaqSection"));
const BookingWidget = dynamic(() => import("@/components/home/BookingWidget"));

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
