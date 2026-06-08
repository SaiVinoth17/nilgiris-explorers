import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Nilgiris Explorers",
  description: "Read the terms and conditions for booking cabs, tours, and services with Nilgiris Explorers.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0B1D17] min-h-screen">
      <div className="container-default max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
          Terms & <span className="gradient-text">Conditions</span>
        </h1>
        
        <div className="prose prose-invert prose-emerald max-w-none text-white/70">
          <p className="lead text-lg mb-8">
            Last updated: January 2026
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Booking Policies</h2>
            <p className="mb-4">
              By booking a cab or tour package with Nilgiris Explorers, you agree to these terms and conditions. All bookings are subject to vehicle availability. A booking is only confirmed once an advance payment has been received and acknowledged by us directly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Cancellation & Refunds</h2>
            <p className="mb-4">
              We understand that plans change. Our cancellation policy is as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Cancellations made 48 hours before the scheduled trip: 100% refund of the advance amount.</li>
              <li>Cancellations made 24-48 hours before the scheduled trip: 50% refund.</li>
              <li>Cancellations made less than 24 hours before the trip: No refund.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">3. Pricing and Additional Charges</h2>
            <p className="mb-4">
              Our quoted prices for sightseeing packages include fuel and driver allowances for the specified route and duration (typically 100 km / 10 hours for day trips).
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Any extra kilometers driven beyond the package limit will be charged at the standard per-km rate for that vehicle category.</li>
              <li>Toll fees, state entry taxes (for outstation trips), and parking charges are NOT included in the base fare unless explicitly stated, and must be paid by the customer directly.</li>
              <li>AC will be turned off in steep hilly terrains to prevent engine overheating and ensure safety.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Liability</h2>
            <p className="mb-4">
              Nilgiris Explorers acts only as an agent for the passengers in all matters relating to transport. We shall not be liable for any injury, loss, delay, or damage caused by circumstances beyond our control (e.g., landslides, roadblocks, severe weather conditions).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
