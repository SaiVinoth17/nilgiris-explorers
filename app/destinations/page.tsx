import { Metadata } from "next";
import Image from "next/image";
import DestinationContent from "@/components/home/DestinationContent";

export const metadata: Metadata = {
  title: "Destinations in Nilgiris | Ooty, Coonoor, Avalanche",
  description: "Explore the best places to visit in the Nilgiris. Discover Ooty, Coonoor, Pykara, Mudumalai, and hidden gems with our premium sightseeing taxi packages.",
};

export default function DestinationsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/dest_ooty_lake.jpg"
            alt="Nilgiris Destinations"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D17]/80 via-[#0B1D17]/40 to-[#0B1D17]" />
        </div>
        
        <div className="container-default relative z-10 text-center">
          <span className="section-label mb-4">Sightseeing</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Places To Visit In <span className="gradient-text">Ooty</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
            From misty peaks to serene lakes, explore the breathtaking beauty of the Blue Mountains with our expert local drivers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <DestinationContent />
      
      {/* Additional SEO text for the destinations page */}
      <section className="section-pad section-forest border-t border-white/5">
        <div className="container-default max-w-4xl mx-auto text-center">
           <h2 className="font-display text-3xl font-bold text-white mb-6">
             Why Book A Dedicated <span className="gradient-text">Sightseeing Cab?</span>
           </h2>
           <p className="text-white/60 leading-relaxed text-lg mb-8">
             Navigating the winding hill roads of the Nilgiris requires skill and local knowledge. By booking a dedicated sightseeing taxi with Nilgiris Explorers, you avoid the hassle of public transport, the stress of driving on steep hairpin bends, and the confusion of finding parking at crowded tourist spots.
           </p>
           <p className="text-white/60 leading-relaxed text-lg">
             Our drivers know the optimal routes, the best times to visit each attraction to avoid crowds, and can recommend authentic local dining experiences along the way. Whether you want to cover the standard Ooty local sightseeing circuit or venture off the beaten path to Emerald Lake, your itinerary is completely customizable.
           </p>
        </div>
      </section>
    </>
  );
}
