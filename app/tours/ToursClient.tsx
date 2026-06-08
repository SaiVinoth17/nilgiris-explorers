"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Users, CheckCircle, ArrowRight, Filter, Mountain, Search } from "lucide-react";
import { tourPackages } from "@/lib/data";
import Link from "next/link";

const filters = ["All", "Day Tours", "Multi-Day", "Wildlife", "Romantic", "Adventure", "Custom"];

const badgeColors: Record<string, string> = {
  "Best Seller": "from-[#00D26A] to-[#00A855]",
  "Popular": "from-blue-500 to-indigo-600",
  "Adventure": "from-amber-500 to-orange-500",
  "Wildlife": "from-green-500 to-emerald-600",
  "Romantic": "from-rose-500 to-pink-600",
  "Customizable": "from-violet-500 to-purple-600",
};

export default function ToursClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredPackages = useMemo(() => {
    return tourPackages
      .filter((pkg) => {
        const matchesFilter = activeFilter === "All" || pkg.badge === activeFilter || pkg.description.includes(activeFilter);
        const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return 0; // recommended
      });
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-default">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <span className="section-label">Tour Packages</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Curated <span className="gradient-text">Nilgiris Experiences</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From thrilling wildlife safaris to romantic mountain escapes — choose an experience crafted for your perfect Nilgiris journey.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-center gap-4 justify-between mb-10">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 justify-center lg:justify-start"
          >
            <Filter className="w-4 h-4 text-white/40 text-white/40" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeFilter === f
                    ? "bg-[#00D26A] text-white border-[#00D26A] shadow-lg"
                    : "glass border-gray-200 border-white/10 text-gray-600 text-white/60 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Search & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto"
          >
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search packages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white"
              />
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-full sm:w-40 appearance-none bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </motion.div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass-card rounded-2xl overflow-hidden card-hover flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16332a] via-transparent to-transparent" />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${badgeColors[pkg.badge] || "from-gray-600 to-gray-700"} shadow-lg`}>
                  {pkg.badge}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 glass px-2.5 py-1 rounded-lg">
                  <Clock className="w-3 h-3 text-[#00D26A]" />
                  <span className="text-xs text-white font-medium">{pkg.duration}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00D26A] transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">{pkg.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {pkg.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00D26A] flex-shrink-0" />
                      <span className="text-xs text-white/60 truncate min-w-0 flex-1">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pkg.includes.map((inc) => (
                    <span key={inc} className="text-xs bg-white/5 border border-white/8 text-white/50 px-2.5 py-1 rounded-lg">
                      {inc}
                    </span>
                  ))}
                </div>

                <div className="flex-1" />

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
                          <div className="text-xl font-bold gradient-text">Custom Price</div>
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
            </motion.div>
          ))}
        </div>

        {/* Custom Tour CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass-card rounded-3xl p-10 text-center"
        >
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Can't Find The Perfect Package?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8 text-lg">
            Tell us your dream Nilgiris experience. We'll craft a fully customized itinerary just for you — any dates, any budget, any destinations.
          </p>
          <a
            href={`https://wa.me/919585219509?text=${encodeURIComponent("Hello! I'd like to build a custom Nilgiris tour package. Please help me plan my trip.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-4"
          >
            Plan My Custom Tour <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
