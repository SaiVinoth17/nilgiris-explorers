"use client";

import Image from "next/image";
import { Clock, Users, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { tourPackages } from "@/lib/data";
import Link from "next/link";

const badgeColors: Record<string, string> = {
  "Best Seller": "from-[#00D26A] to-[#00A855]",
  "Popular": "from-blue-500 to-indigo-600",
  "Adventure": "from-amber-500 to-orange-500",
  "Wildlife": "from-green-500 to-emerald-600",
  "Romantic": "from-rose-500 to-pink-600",
  "Customizable": "from-violet-500 to-purple-600",
};

export default function TourPackages() {
  return (
    <section id="tours" className="section-pad section-forest">
      <div className="container-default">
        {/* Header */}
        <div
          className="text-center mb-14"
        >
          <span className="inline-block section-label-text mb-3">
            Curated Experiences
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Premium <span className="gradient-text">Tour Packages</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Handcrafted itineraries designed by local experts for an unforgettable experience.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourPackages.map((pkg, i) => (
            <div
              key={pkg.id}
              className="group glass-card rounded-2xl overflow-hidden card-hover flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-700 lg:group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16332a] via-transparent to-transparent pointer-events-none" />

                {/* Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${badgeColors[pkg.badge] || "from-gray-600 to-gray-700"} shadow-lg`}>
                  {pkg.badge}
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 glass px-2.5 py-1 rounded-lg">
                  <Clock className="w-3 h-3 text-[#00D26A]" />
                  <span className="text-xs text-white font-medium">{pkg.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00D26A] transition-colors flex-1 leading-snug">
                    {pkg.name}
                  </h3>
                </div>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">{pkg.description}</p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {pkg.highlights.slice(0, 4).map((h) => (
                    <div key={h} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00D26A] flex-shrink-0" />
                      <span className="text-xs text-white/60 truncate min-w-0 flex-1">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Includes */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.includes.map((inc) => (
                    <span key={inc} className="text-xs bg-white/5 border border-white/8 text-white/50 px-2 py-1 rounded-lg">
                      {inc}
                    </span>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Pricing + CTA */}
                <div className="pt-4 border-t border-white/8 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      {pkg.price > 0 ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-xs text-white/50 font-medium tracking-wide uppercase mb-0.5">Starting From</span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-white">₹{pkg.price.toLocaleString()}</span>
                              {pkg.originalPrice > 0 && (
                                <span className="text-sm text-white/30 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className="text-lg font-bold gradient-text">Custom Price</div>
                          <div className="text-xs text-white/40">Based on itinerary</div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="btn-secondary bg-white/5 text-white hover:bg-white/10 text-xs py-2.5 px-3 rounded-lg border border-white/10"
                      >
                        Details
                      </Link>
                      <a
                        href={`https://wa.me/919585219509?text=${encodeURIComponent(`Hello! I'm interested in booking the ${pkg.name}. Please share details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1"
                      >
                        Book Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                  <div className="text-[10px] text-center text-white/40 italic">
                    Contact us for custom tour plans and group pricing.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="mt-12 glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Can't find the right package?</h3>
              <p className="text-white/50 text-sm mt-1">Tell us your requirements and we'll create a custom Nilgiris experience just for you.</p>
            </div>
          </div>
          <Link href="/tours" className="btn-primary whitespace-nowrap px-8 py-4">
            Build Custom Tour <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
