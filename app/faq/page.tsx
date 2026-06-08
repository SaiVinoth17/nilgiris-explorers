import { Metadata } from "next";
import FaqSection from "@/components/home/FaqSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Nilgiris Explorers",
  description: "Find answers to all your questions about booking cabs, sightseeing packages, and traveling in Ooty and the Nilgiris.",
};

export default function FAQPage() {
  return (
    <>
      <div className="pt-24 bg-[#0B1D17]">
        {/* We use the FaqSection component directly, adding some top padding to clear the navbar */}
        <FaqSection />
      </div>
    </>
  );
}
