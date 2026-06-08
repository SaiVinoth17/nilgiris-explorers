"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Users, ArrowRight, Sparkles, HelpCircle,
  Shield, CheckCircle2, Building, Home, BedDouble, Calendar, Star, Car
} from "lucide-react";
import { sightseeingCircuits, outstationTransfers, accommodationPackages } from "@/lib/data";
import Image from "next/image";

type CategoryTab = "sightseeing" | "transfers" | "stays";

export default function SightseeingRates() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("sightseeing");
  const [selectedCircuitId, setSelectedCircuitId] = useState("ooty");

  const selectedCircuit = sightseeingCircuits.find(c => c.id === selectedCircuitId) || sightseeingCircuits[0];

  const buildWhatsAppMessage = (type: string, detail: string, price: number, vehicle?: string) => {
    let message = "";
    if (type === "sightseeing") {
      message = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to book a Sightseeing Tour:\n🗺️ Circuit: ${detail}\n🚗 Vehicle Choice: ${vehicle || "Standard"}\n💰 Rate Reference: ₹${price}\n\nPlease check availability and details. Thank you!`;
    } else if (type === "transfer") {
      message = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to book an Outstation Transfer:\n📍 Transfer Route: ${detail}\n🚗 Vehicle Choice: ${vehicle || "Standard"}\n💰 Rate Reference: ₹${price}\n\nPlease check availability and details. Thank you!`;
    } else if (type === "stay") {
      message = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to make an Accommodation Enquiry:\n🏡 Stay Type: ${detail}\n💰 Rate Reference: Starting at ₹${price}/night\n\nPlease share availability and package details. Thank you!`;
    }
    return `https://wa.me/919585219509?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="rates" className="section-pad section-forest relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00D26A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-default relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block section-label-text mb-3">
            Real-Time Fares & Services
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Transparent <span className="gradient-text">Pricing Matrix</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            No hidden costs, no commission. Pick from our verified sightseeing circuits, outstation transfers, or local stay options.
          </p>
        </motion.div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="flex p-1.5 rounded-full glass border border-white/8 relative z-10 shadow-lg">
            <button
              onClick={() => setActiveTab("sightseeing")}
              className={`px-5 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "sightseeing"
                  ? "bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] text-[#0a0e1a] shadow-[0_4px_20px_rgba(0,210,106,0.3)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Car className="w-4 h-4" />
              Sightseeing Cabs
            </button>
            <button
              onClick={() => setActiveTab("transfers")}
              className={`px-5 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "transfers"
                  ? "bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] text-[#0a0e1a] shadow-[0_4px_20px_rgba(0,210,106,0.3)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Outstation Pick/Drop
            </button>
            <button
              onClick={() => setActiveTab("stays")}
              className={`px-5 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "stays"
                  ? "bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] text-[#0a0e1a] shadow-[0_4px_20px_rgba(0,210,106,0.3)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Home className="w-4 h-4" />
              Luxury Stays
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "sightseeing" && (
            <motion.div
              key="sightseeing-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Circuits Side Picker */}
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2 px-1">Select Sightseeing Circuit:</div>
                {sightseeingCircuits.map((circuit) => (
                  <button
                    key={circuit.id}
                    onClick={() => setSelectedCircuitId(circuit.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedCircuitId === circuit.id
                        ? "bg-gradient-to-r from-[#00D26A]/10 to-[#0B9FD4]/10 border-[#00D26A] shadow-[0_4px_25px_rgba(0,210,106,0.05)]"
                        : "glass border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${selectedCircuitId === circuit.id ? "text-[#00D26A]" : "text-white"}`}>
                        {circuit.name}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${selectedCircuitId === circuit.id ? "translate-x-1 text-[#00D26A]" : "text-white/20"}`} />
                    </div>
                    <p className="text-xs text-white/40 mt-1.5 line-clamp-1">{circuit.places}</p>
                  </button>
                ))}
              </div>

              {/* Rates display area */}
              <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 relative">
                <div className="flex items-center gap-2 mb-4 bg-white/5 border border-white/8 px-4 py-2 rounded-xl w-fit">
                  <Sparkles className="w-4 h-4 text-[#00D26A]" />
                  <span className="text-xs text-white/80 font-medium">Verified Regional Fare Standard</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">{selectedCircuit.name} Package</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  <span className="font-semibold text-white/80">Key Attractions:</span> {selectedCircuit.places}
                </p>

                {/* Grid of Vehicles and exact fares */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {selectedCircuit.rates.map((rate, i) => (
                    <motion.div
                      key={rate.vehicle}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="glass border border-white/5 p-5 rounded-2xl flex flex-col justify-between group hover:border-[#00D26A]/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold text-sm group-hover:text-[#00D26A] transition-colors">{rate.vehicle}</span>
                          <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-medium">{rate.capacity} Seater</span>
                        </div>
                        <div className="text-2xl font-extrabold text-white mt-1">
                          ₹{rate.price.toLocaleString()}
                          <span className="text-[10px] text-white/40 font-normal ml-1">all inclusive</span>
                        </div>
                      </div>
                      <a
                        href={buildWhatsAppMessage("sightseeing", selectedCircuit.name, rate.price, rate.vehicle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-[#0a0e1a] bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] flex items-center justify-center gap-1 shadow-lg shadow-[#00D26A]/10 opacity-90 group-hover:opacity-100 transition-opacity"
                      >
                        Book Cab <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Exclusions info */}
                <div className="mt-6 flex items-start gap-2.5 bg-[#1a284c]/20 border border-white/5 p-4 rounded-xl">
                  <HelpCircle className="w-5 h-5 text-[#0B9FD4] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white/40 leading-normal">
                    <span className="font-semibold text-white/70 block mb-0.5">What's included vs. excluded:</span>
                    Includes clean sightseeing vehicle, expert hill driver, fuel, all parking, and toll fees. 
                    Excludes entry tickets to sightseeing spots (e.g. gardens, parks, boat houses) and safari fees.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "transfers" && (
            <motion.div
              key="transfers-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 overflow-hidden"
            >
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Outstation Airport &amp; Station Transfers</h3>
                  <p className="text-white/50 text-sm mt-1">Direct pick-up and drops connecting Ooty with major cities, airports, and railway junctions.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#00D26A]/10 border border-[#00D26A]/20 px-4 py-2 rounded-xl text-xs font-semibold text-[#00D26A]">
                  <Shield className="w-4 h-4" /> GPS-Tracked &amp; AC Cabs
                </div>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/8 text-white/50 text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-4">Destination</th>
                      <th className="py-4 px-4">Distance / Time</th>
                      <th className="py-4 px-4 text-center">Hatchback</th>
                      <th className="py-4 px-4 text-center">Sedan</th>
                      <th className="py-4 px-4 text-center">SUV (Xylo)</th>
                      <th className="py-4 px-4 text-center">Luxury SUV</th>
                      <th className="py-4 px-4 text-center">Tempo Traveller</th>
                      <th className="py-4 px-4 text-right">Inquiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {outstationTransfers.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors text-sm text-white/80">
                        <td className="py-4.5 px-4 font-semibold text-white">{item.name}</td>
                        <td className="py-4.5 px-4 text-white/50">{item.distance}</td>
                        <td className="py-4.5 px-4 text-center font-bold">₹{item.rates.hatchback.toLocaleString()}</td>
                        <td className="py-4.5 px-4 text-center font-bold">₹{item.rates.sedan.toLocaleString()}</td>
                        <td className="py-4.5 px-4 text-center font-bold">₹{item.rates.suv.toLocaleString()}</td>
                        <td className="py-4.5 px-4 text-center font-bold text-[#00D26A]">₹{item.rates.innova.toLocaleString()}</td>
                        <td className="py-4.5 px-4 text-center font-bold">₹{item.rates.tempo.toLocaleString()}</td>
                        <td className="py-4.5 px-4 text-right">
                          <a
                            href={buildWhatsAppMessage("transfer", item.name, item.rates.sedan, "Sedan")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-[#00D26A] hover:text-[#0a0e1a] text-white transition-all"
                          >
                            Enquire <ArrowRight className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "stays" && (
            <motion.div
              key="stays-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Side: Stays Showcase */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {accommodationPackages.map((stay) => (
                  <div key={stay.id} className="group glass-card rounded-2xl overflow-hidden card-hover flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={stay.image}
                        alt={stay.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16332a] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-violet-500 to-indigo-600 shadow-md">
                        {stay.badge}
                      </span>
                      <span className="absolute top-3 right-3 flex items-center gap-0.5 glass px-2 py-0.5 rounded-lg text-[10px] font-semibold text-white">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {stay.rating}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[10px] text-[#00D26A] font-semibold uppercase tracking-wider mb-1">{stay.type}</span>
                      <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#00D26A] transition-colors">{stay.name}</h4>
                      <div className="space-y-1.5 mb-4">
                        {stay.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D26A] flex-shrink-0" />
                            <span className="text-xs text-white/50">{h}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1" />
                      <div className="flex items-end justify-between pt-3 border-t border-white/5">
                        <div>
                          <span className="text-xs text-white/40 block">Starting at</span>
                          <span className="text-xl font-extrabold text-white">₹{stay.price.toLocaleString()}</span>
                          <span className="text-[10px] text-white/40 ml-0.5">/ night</span>
                        </div>
                        <a
                          href={buildWhatsAppMessage("stay", stay.name, stay.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs py-2 px-4"
                        >
                          Enquire Now <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side: Stay Booking Helper */}
              <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center mb-5">
                    <BedDouble className="w-6 h-6 text-[#0a0e1a]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Book Ooty Cottages &amp; Stays</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Planning a trip to Ooty but not sure where to stay? From cozy wooden tea valley cottages to luxury hilltop resorts, we partner with verified local properties to get you the lowest rates.
                  </p>

                  <ul className="space-y-3.5 text-sm text-white/70 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] text-xs font-bold">✓</div>
                      100% Verified, Clean Properties
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] text-xs font-bold">✓</div>
                      Campfire &amp; BBQ arrangements
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] text-xs font-bold">✓</div>
                      Free pick &amp; drop from Ooty station
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] text-xs font-bold">✓</div>
                      No booking commissions
                    </li>
                  </ul>
                </div>

                <a
                  href={`https://wa.me/919585219509?text=${encodeURIComponent("Hello! I'm interested in booking accommodations (cottage/resort) in Ooty. Please share available options and price quotes.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl text-sm font-semibold text-[#0a0e1a] bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] flex items-center justify-center gap-1.5 shadow-xl shadow-[#00D26A]/10"
                >
                  Custom Accommodation Enquiry <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
