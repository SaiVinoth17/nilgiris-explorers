"use client";

import Link from "next/link";
import { tourPackages } from "@/lib/data";

const displayPackages = tourPackages.slice(0, 5);

function formatPrice(price: number): { text: string; color: string } {
  if (price > 0) {
    return { text: `₹${price.toLocaleString("en-IN")}`, color: "text-[var(--color-brand-emerald)]" };
  }
  return { text: "Custom Quote", color: "text-amber-400" };
}

function isBestSeller(tour: (typeof tourPackages)[number]): boolean {
  return tour.id === 8 || tour.badge === "Best Seller";
}

export default function ToursShowcase() {
  return (
    <section className="relative section-pad overflow-hidden bg-void" aria-labelledby="tours-heading">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[var(--color-brand-emerald)]/[0.03] blur-[120px]" />
      </div>

      <div className="container-default relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="section-label mb-4 justify-center">Handpicked Experiences</span>
          <h2 id="tours-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4">
            Curated <span className="gradient-text">Adventures</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto font-body">
            Hand-crafted journeys through the Nilgiris
          </p>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayPackages.map((tour, index) => {
            const { text: priceText, color: priceColor } = formatPrice(tour.price);
            const bestSeller = isBestSeller(tour);
            const stepNum = String(index + 1).padStart(2, "0");
            const isFeatured = index === 0;
            const whatsappUrl = `https://wa.me/919585219509?text=${encodeURIComponent(`Hi! I'm interested in the ${tour.name} package.`)}`;

            return (
              <div
                key={tour.id}
                className={`
                  group relative rounded-2xl p-6 md:p-8
                  glass-card
                  ${isFeatured ? "md:col-span-2" : ""}
                `}
              >
                {/* Step number */}
                <span className="absolute top-4 right-6 text-7xl font-display font-bold opacity-[0.06] select-none pointer-events-none leading-none" aria-hidden="true">
                  {stepNum}
                </span>

                {bestSeller && (
                  <span className="absolute top-4 left-6 tag-badge">
                    ★ Best Seller
                  </span>
                )}

                <div className={`relative z-10 ${isFeatured ? "md:flex md:items-start md:gap-10" : ""}`}>
                  <div className={`flex-1 ${bestSeller ? "mt-8" : ""}`}>
                    <h3 className="text-2xl font-display font-bold tracking-tight text-white">{tour.name}</h3>
                    <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.06] text-white/60 border border-white/[0.08]">
                      {tour.duration}
                    </span>
                    <div className="mt-4">
                      <span className={`text-xl font-bold ${priceColor}`}>{priceText}</span>
                      {tour.price > 0 && <span className="text-white/30 text-sm ml-2">/ {tour.persons}</span>}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      {tour.highlights.slice(0, 4).map((h, i) => (
                        <span key={h} className="flex items-center gap-2">
                          <span className="text-sm text-white/50 font-body">{h}</span>
                          {i < Math.min(tour.highlights.length, 4) - 1 && (
                            <span className="w-1 h-1 rounded-full bg-[var(--color-brand-emerald)]/40" aria-hidden="true" />
                          )}
                        </span>
                      ))}
                    </div>
                    {isFeatured && (
                      <p className="mt-4 text-sm text-white/40 font-body leading-relaxed max-w-lg">{tour.description}</p>
                    )}
                  </div>

                  <div className={isFeatured ? "md:flex md:items-end md:self-end mt-6 md:mt-0" : "mt-6"}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Plan This Journey →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="mt-12 md:mt-16 text-center">
          <Link href="/tours" className="inline-flex items-center gap-2 text-[var(--color-brand-emerald)] hover:text-white font-display font-semibold text-base transition-colors duration-200">
            View All Adventures →
          </Link>
        </div>
      </div>
    </section>
  );
}
