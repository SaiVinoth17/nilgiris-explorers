"use client";

import Image from "next/image";
import { Clock, Users, ArrowRight, Sparkles, MapPin, Map, Sun, Compass } from "lucide-react";
import { tourPackages } from "@/lib/data";
import Link from "next/link";

const badgeColors: Record<string, string> = {
  "Best Seller": "from-[#00D26A] to-[#00A855]",
  "Popular": "from-blue-400 to-indigo-500",
  "Adventure": "from-amber-400 to-orange-500",
  "Nature": "from-emerald-400 to-teal-500",
  "Heritage": "from-amber-500 to-yellow-600",
  "Romantic": "from-rose-400 to-pink-500",
  "Premium Luxury": "from-purple-500 to-fuchsia-600",
  "Group Tour": "from-indigo-400 to-violet-500",
};

export default function TourPackages() {
  return (
    <section id="tours" className="section-pad relative overflow-hidden bg-[#040A08]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-default relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
            <Sparkles className="w-4 h-4" /> Curated Experiences
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Tour Packages</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Handcrafted itineraries designed by local experts for an unforgettable journey through the Queen of Hill Stations.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tourPackages.map((pkg) => {
            const distanceText = (pkg as any).distance || (pkg.duration.includes("Days") ? "300+ km route" : "Local transit");
            const attractionsCount = pkg.itinerary?.reduce((acc, d) => acc + (d.locations?.length || 0), 0) || pkg.highlights.length;
            const seasonText = pkg.bestSeason.split(" ")[0].replace(".", "");

            return (
              <div
                key={pkg.id}
                className="group relative bg-[#071410] rounded-[32px] overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_20px_80px_rgba(0,210,106,0.15)] flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071410] via-[#071410]/40 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-emerald-500/20 to-transparent mix-blend-overlay" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${badgeColors[pkg.badge] || "from-gray-600 to-gray-700"} shadow-lg backdrop-blur-md`}>
                      {pkg.badge}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1 relative z-10 -mt-6">
                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight mb-3">
                      {pkg.name}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-0.5">Duration</div>
                        <div className="text-xs text-white/90 font-medium truncate">{pkg.duration.split("(")[0]}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-0.5">Distance</div>
                        <div className="text-xs text-white/90 font-medium truncate">{distanceText}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Map className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-0.5">Attractions</div>
                        <div className="text-xs text-white/90 font-medium truncate">{attractionsCount} Top Spots</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-0.5">Suitable For</div>
                        <div className="text-xs text-white/90 font-medium truncate">{pkg.persons}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1" />

                  {/* Pricing & CTA */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      {pkg.price > 0 ? (
                        <>
                          <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-1 block">Starting Price</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-display font-bold text-white">₹{pkg.price.toLocaleString()}</span>
                            {pkg.originalPrice > 0 && (
                              <span className="text-sm text-white/30 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                        </>
                      ) : (
                        <div>
                          <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-1 block">Starting Price</span>
                          <span className="text-xl font-bold text-emerald-400">Custom Built</span>
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300 transform group-hover:scale-110 shadow-lg"
                      aria-label="View Package Details"
                    >
                      <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#071410] to-[#0a2019] border border-white/10 shadow-2xl p-8 lg:p-12">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start sm:items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(0,210,106,0.3)] mx-auto sm:mx-0">
                <Compass className="w-8 h-8 text-[#040A08]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">Can't find the perfect itinerary?</h3>
                <p className="text-white/60 text-base max-w-xl">
                  Let our local travel experts design a completely personalized Nilgiris experience tailored to your exact requirements and schedule.
                </p>
              </div>
            </div>
            
            <Link 
              href="/tours" 
              className="group relative px-8 py-4 rounded-2xl overflow-hidden flex items-center gap-3 shadow-[0_0_20px_rgba(0,210,106,0.2)] hover:shadow-[0_0_40px_rgba(0,210,106,0.4)] transition-shadow w-full lg:w-auto justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-bold text-black relative z-10 text-lg">Build Custom Tour</span>
              <ArrowRight className="w-5 h-5 text-black relative z-10 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
