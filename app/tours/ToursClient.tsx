"use client";
import { useState, useMemo } from "react";

import Image from "next/image";
import { Clock, CheckCircle, ArrowRight, Filter, Mountain, Search } from "lucide-react";
import { tourPackages } from "@/lib/data";
import Link from "next/link";

// Expanded filters based on requirements
const filters = [
  "All", "Day Tours", "Multi-Day", "Wildlife", "Romantic", "Adventure", 
  "Family", "Nature", "Photography", "Custom"
];

const badgeColors: Record<string, string> = {
  "Best Seller": "from-[[var(--color-brand-emerald)]] to-[#00A855]",
  "Popular": "from-blue-500 to-indigo-600",
  "Adventure": "from-amber-500 to-orange-500",
  "Wildlife": "from-green-500 to-emerald-600",
  "Romantic": "from-rose-500 to-pink-600",
  "Group Tour": "from-purple-500 to-fuchsia-600",
  "Heritage": "from-amber-500 to-yellow-600",
  "Nature": "from-emerald-400 to-green-500",
  "Premium Luxury": "from-rose-500 to-pink-600",
};

export default function ToursClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredPackages = useMemo(() => {
    return tourPackages
      .filter((pkg) => {
        // Expanded matching to cover the requested search terms
        const searchString = `
          ${pkg.name} ${pkg.description} ${pkg.badge} 
          ${pkg.highlights?.join(" ")} ${pkg.includes?.join(" ")}
          ${pkg.familySuitability} ${pkg.coupleSuitability}
        `.toLowerCase();
        
        const matchesSearch = searchString.includes(searchQuery.toLowerCase());

        if (activeFilter === "All") return matchesSearch;
        if (activeFilter === "Day Tours") return matchesSearch && (pkg.duration.includes("1 Day") || pkg.duration.includes("Full-Day"));
        if (activeFilter === "Multi-Day") return matchesSearch && pkg.duration.includes("Days");
        if (activeFilter === "Wildlife") return matchesSearch && (pkg.badge === "Wildlife" || pkg.name.includes("Mudumalai") || pkg.name.includes("Safari"));
        if (activeFilter === "Romantic") return matchesSearch && (pkg.badge === "Romantic" || pkg.name.includes("Honeymoon") || pkg.name.includes("Couple"));
        if (activeFilter === "Adventure") return matchesSearch && (pkg.badge === "Adventure" || pkg.name.includes("Trek") || pkg.name.includes("Jeep"));
        if (activeFilter === "Family") return matchesSearch && (pkg.familySuitability?.includes("Family") || pkg.name.includes("Family") || pkg.badge === "Popular");
        if (activeFilter === "Nature") return matchesSearch && (pkg.badge === "Nature" || pkg.name.includes("Pykara") || pkg.name.includes("Avalanche"));
        if (activeFilter === "Photography") return matchesSearch && (pkg.highlights?.some(h => h.toLowerCase().includes("photo") || h.toLowerCase().includes("view")) || false);
        if (activeFilter === "Custom") return matchesSearch && pkg.name.includes("Custom");

        return matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return 0; // Default/recommended order
      });
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-brand-emerald)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-default relative z-10">
        {/* Header */}
        <div
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-emerald)] to-[#0B9FD4] flex items-center justify-center">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <span className="section-label">Handcrafted Journeys</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Explore All <span className="gradient-text">Tour Packages</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            From 1-day sightseeing circuits to 5-day luxury honeymoons — discover the Nilgiris with Ooty&apos;s most trusted local experts.
          </p>
        </div>

        {/* Search Bar & Controls */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tours, places (e.g. Pykara, Safari)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D26A]"
            />
          </div>

          {/* Filter Pills Scrollable Container */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="w-4 h-4 text-white/40 flex-shrink-0 hidden lg:block" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-[#00D26A] text-[#0a0e1a] shadow-lg shadow-[#00D26A]/20"
                    : "glass text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-white/40 uppercase tracking-wider font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/40 border border-white/10 text-xs font-semibold text-white/80 rounded-xl px-3 py-2 focus:outline-none focus:border-[#00D26A]"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group glass-card rounded-2xl overflow-hidden card-hover flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-black/20" />

                {/* Badge */}
                {pkg.badge && (
                  <div className={`absolute top-3 left-3 bg-gradient-to-r ${badgeColors[pkg.badge] || "from-emerald-500 to-teal-600"} text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg`}>
                    {pkg.badge}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#00D26A]" /> {pkg.duration}</span>
                    <span>·</span>
                    <span>Best: {pkg.bestSeason}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#00D26A] transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {pkg.highlights.slice(0, 3).map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00D26A] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Starting From</div>
                    <div className="text-2xl font-bold text-white">₹{pkg.price.toLocaleString()}</div>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5"
                  >
                    View Package <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tour CTA */}
        <div
          className="mt-16 glass-card rounded-3xl p-10 text-center"
        >
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Can&apos;t Find The Perfect Package?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8 text-lg">
            Tell us your dream Nilgiris experience. We&apos;ll craft a fully customized itinerary just for you — any dates, any budget, any destinations.
          </p>
          <a
            href={`https://wa.me/919585219509?text=${encodeURIComponent("Hello! I'd like to build a custom Nilgiris tour package. Please help me plan my trip.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-4"
          >
            Plan My Custom Tour <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
