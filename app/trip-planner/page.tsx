import { Metadata } from "next";
import TripPlannerWizard from "@/components/trip-planner/TripPlannerWizard";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Trip Planner | Nilgiris Explorers",
  description: "Plan your perfect Ooty and Nilgiris itinerary with our interactive trip planner. Get personalized recommendations for your upcoming vacation.",
  alternates: {
    canonical: "https://nilgirisexplorers.com/trip-planner",
  },
};

export default function TripPlannerPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 relative bg-[#0B1D17]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/real_hero.jpg"
          alt="Nilgiris Landscape"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D17] via-transparent to-[#0B1D17]" />
      </div>

      <div className="container-default relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            Interactive Trip Planner
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Plan Your <span className="gradient-text">Perfect Getaway</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tell us about your travel plans, and we'll craft a customized itinerary with a dedicated driver for a truly personalized Nilgiris experience.
          </p>
        </div>

        <TripPlannerWizard />
      </div>
    </main>
  );
}
