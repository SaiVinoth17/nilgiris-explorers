"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, Users, Compass, MessageSquare, ArrowRight, Sparkles, Home, Car, ChevronDown
} from "lucide-react";
import { sightseeingCircuits, accommodationPackages } from "@/lib/data";

const destinations = [
  "Ooty & Surroundings",
  "Coonoor",
  "Doddabetta Peak",
  "Avalanche Lake",
  "Pykara Lake & Falls",
  "Mudumalai Wildlife",
  "Ooty + Coonoor Combo",
  "Custom Itinerary",
];

const slugMap: Record<string, string> = {
  "ooty-lake": "Ooty & Surroundings",
  "doddabetta-peak": "Doddabetta Peak",
  "botanical-garden": "Ooty & Surroundings",
  "tea-estates": "Ooty & Surroundings",
  "pykara-lake": "Pykara Lake & Falls",
  "avalanche-lake": "Avalanche Lake",
  "mudumalai-reserve": "Mudumalai Wildlife",
  "coonoor": "Coonoor"
};

const tourTypes = [
  { value: "sightseeing", label: "🗺️ Sightseeing Tour" },
  { value: "wildlife", label: "🐘 Wildlife Safari" },
  { value: "honeymoon", label: "💑 Honeymoon Package" },
  { value: "family", label: "👨‍👩‍👧 Family Tour" },
  { value: "group", label: "🚌 Group Tour" },
  { value: "corporate", label: "💼 Corporate Outing" },
  { value: "adventure", label: "🏕️ Adventure Trip" },
  { value: "custom", label: "✨ Custom Itinerary" },
];

const durations = ["1 Day", "2 Days", "3 Days", "4–5 Days", "1 Week", "Flexible"];

type WidgetTab = "tour" | "cab" | "stay";

function BookingWidgetContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<WidgetTab>("tour");

  // Tour Form State
  const [tourForm, setTourForm] = useState({
    destination: "",
    tourType: "",
    date: "",
    duration: "",
    travelers: "2",
    message: "",
  });

  useEffect(() => {
    const destSlug = searchParams?.get("dest");
    if (destSlug && slugMap[destSlug]) {
      setTourForm(prev => ({ ...prev, destination: slugMap[destSlug] }));
      setActiveTab("tour");
    }
  }, [searchParams]);

  // Cab Form State
  const [cabForm, setCabForm] = useState({
    circuit: "Ooty Local Sightseeing",
    vehicle: "Sedan Premium (Etios)",
    date: "",
    guests: "2",
    pickup: "",
  });

  // Stay Form State
  const [stayForm, setStayForm] = useState({
    stayType: "Premium Tea Valley Cottage",
    checkin: "",
    checkout: "",
    rooms: "1",
    guests: "2",
    special: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const buildWhatsAppMessage = () => {
    let text = "";
    if (activeTab === "tour") {
      text = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to plan a Custom Tour Package:\n📍 Destination: ${tourForm.destination || "TBD"}\n🎒 Tour Type: ${tourForm.tourType || "TBD"}\n📅 Travel Date: ${tourForm.date || "TBD"}\n⏱️ Duration: ${tourForm.duration || "TBD"}\n👥 Travelers: ${tourForm.travelers}\n💬 Special Requests: ${tourForm.message || "None"}\n\nPlease share standard options and pricing. Thank you!`;
    } else if (activeTab === "cab") {
      text = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to book a Sightseeing Cab:\n🗺️ Circuit: ${cabForm.circuit}\n🚗 Vehicle: ${cabForm.vehicle}\n📅 Travel Date: ${cabForm.date || "TBD"}\n👥 Number of Guests: ${cabForm.guests}\n📍 Pickup Location: ${cabForm.pickup || "TBD"}\n\nPlease confirm availability and booking. Thank you!`;
    } else if (activeTab === "stay") {
      text = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to book Ooty Stay & Accommodations:\n🏡 Stay Type: ${stayForm.stayType}\n📅 Check-In: ${stayForm.checkin || "TBD"}\n📅 Check-Out: ${stayForm.checkout || "TBD"}\n🔑 Rooms Required: ${stayForm.rooms}\n👥 Number of Guests: ${stayForm.guests}\n💬 Special Requests: ${stayForm.special || "None"}\n\nPlease share quotes and availability. Thank you!`;
    }
    return encodeURIComponent(text);
  };

  return (
    <section id="booking" className="relative py-0 -mt-20 z-20">
      <div className="container-default">
        <div className="max-w-5xl mx-auto">
          <div
          className="relative bg-[#0f2820] rounded-3xl p-6 sm:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-emerald-500/20"
        >
          {/* Top Form Switcher Tabs */}
          <div className="flex border-b border-emerald-500/10 mb-8 overflow-x-auto scrollbar-none gap-2 pb-2">
            <button
              onClick={() => setActiveTab("tour")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "tour"
                  ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500 shadow-inner"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Compass className="w-4 h-4 text-[#00D26A]" />
              Plan Tour Package
            </button>
            <button
              onClick={() => setActiveTab("cab")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "cab"
                  ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500 shadow-inner"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Car className="w-4 h-4 text-[#00D26A]" />
              Book Sightseeing Cab
            </button>
            <button
              onClick={() => setActiveTab("stay")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "stay"
                  ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500 shadow-inner"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Home className="w-4 h-4 text-[#00D26A]" />
              Book Ooty Cottages / Stay
            </button>
          </div>

          {/* Form Switcher Body */}
          <AnimatePresence mode="wait">
            {activeTab === "tour" && (
              <motion.div
                key="tour-form"
                /* removed initial */
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5"
              >
                {/* Destination */}
                <div>
                  <label htmlFor="trip-destination" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Where do you want to go?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#00D26A]" />
                    <select
                      id="trip-destination"
                      value={tourForm.destination}
                      onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      <option value="" className="bg-[#16332a]">Select destination…</option>
                      {destinations.map((d) => (
                        <option key={d} value={d} className="bg-[#16332a]">{d}</option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Tour Type */}
                <div>
                  <label htmlFor="tour-type" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Type of Experience
                  </label>
                  <div className="relative">
                    <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-violet-400" />
                    <select
                      id="tour-type"
                      value={tourForm.tourType}
                      onChange={(e) => setTourForm({ ...tourForm, tourType: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      <option value="" className="bg-[#16332a]">Select tour type…</option>
                      {tourTypes.map((t) => (
                        <option key={t.value} value={t.label} className="bg-[#16332a]">{t.label}</option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Travel Date */}
                <div>
                  <label htmlFor="travel-date" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Preferred Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-blue-400" />
                    <input
                      id="travel-date"
                      type="date"
                      value={tourForm.date}
                      min={today}
                      onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                      className="input-field pl-11 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="trip-duration" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Trip Duration
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-amber-400" />
                    <select
                      id="trip-duration"
                      value={tourForm.duration}
                      onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      <option value="" className="bg-[#16332a]">Select duration…</option>
                      {durations.map((d) => (
                        <option key={d} value={d} className="bg-[#16332a]">{d}</option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Travelers */}
                <div>
                  <label htmlFor="travelers-count" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-rose-400" />
                    <select
                      id="travelers-count"
                      value={tourForm.travelers}
                      onChange={(e) => setTourForm({ ...tourForm, travelers: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5", "6", "7–10", "11–20", "20+"].map((n) => (
                        <option key={n} value={n} className="bg-[#16332a]">
                          {n} {parseInt(n) === 1 ? "Traveler" : "Travelers"}
                        </option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="special-requests" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Special Requests (optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-cyan-400" />
                    <input
                      id="special-requests"
                      type="text"
                      placeholder="Honeymoon setup, tour guides…"
                      value={tourForm.message}
                      onChange={(e) => setTourForm({ ...tourForm, message: e.target.value })}
                      className="input-field pl-11"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "cab" && (
              <motion.div
                key="cab-form"
                /* removed initial */
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5"
              >
                {/* Circuit Dropdown */}
                <div>
                  <label htmlFor="cab-circuit" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Select Sightseeing Circuit
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#00D26A]" />
                    <select
                      id="cab-circuit"
                      value={cabForm.circuit}
                      onChange={(e) => setCabForm({ ...cabForm, circuit: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      {sightseeingCircuits.map((c) => (
                        <option key={c.id} value={c.name} className="bg-[#16332a]">{c.name}</option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Vehicle Class Selector */}
                <div>
                  <label htmlFor="cab-type" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Preferred Cab Type
                  </label>
                  <div className="relative">
                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-violet-400" />
                    <select
                      id="cab-type"
                      value={cabForm.vehicle}
                      onChange={(e) => setCabForm({ ...cabForm, vehicle: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      <option value="Hatchback (Indica)" className="bg-[#16332a]">Standard Hatchback (Indica/Swift)</option>
                      <option value="Sedan Premium (Etios)" className="bg-[#16332a]">Sedan Comfort (Dzire/Etios)</option>
                      <option value="SUV Premium (Xylo)" className="bg-[#16332a]">Spacious SUV (Xylo/Ertiga)</option>
                      <option value="Luxury SUV (Innova)" className="bg-[#16332a]">Premium SUV (Toyota Innova)</option>
                      <option value="Tempo Traveller" className="bg-[#16332a]">Large Group Van (Tempo Traveller)</option>
                    </select>
                                      </div>
                </div>

                {/* Travel Date */}
                <div>
                  <label htmlFor="cab-date" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Sightseeing Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-blue-400" />
                    <input
                      id="cab-date"
                      type="date"
                      value={cabForm.date}
                      min={today}
                      onChange={(e) => setCabForm({ ...cabForm, date: e.target.value })}
                      className="input-field pl-11 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="cab-guests" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-rose-400" />
                    <select
                      id="cab-guests"
                      value={cabForm.guests}
                      onChange={(e) => setCabForm({ ...cabForm, guests: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9–12", "13+"].map((n) => (
                        <option key={n} value={n} className="bg-[#16332a]">
                          {n} {n === "1" ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Pickup point */}
                <div className="sm:col-span-2">
                  <label htmlFor="cab-pickup" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Pickup Location / Hotel Address
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-cyan-400" />
                    <input
                      id="cab-pickup"
                      type="text"
                      placeholder="e.g. Ooty Railway Station, Lake View Hotel, Sterling Resorts..."
                      value={cabForm.pickup}
                      onChange={(e) => setCabForm({ ...cabForm, pickup: e.target.value })}
                      className="input-field pl-11"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stay" && (
              <motion.div
                key="stay-form"
                /* removed initial */
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5"
              >
                {/* Stay Type */}
                <div>
                  <label htmlFor="stay-type" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Choose stay / Cottage type
                  </label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#00D26A]" />
                    <select
                      id="stay-type"
                      value={stayForm.stayType}
                      onChange={(e) => setStayForm({ ...stayForm, stayType: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      {accommodationPackages.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#16332a]">{s.name} (starts ₹{s.price})</option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Check In Date */}
                <div>
                  <label htmlFor="stay-checkin" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Check-In Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-blue-400" />
                    <input
                      id="stay-checkin"
                      type="date"
                      value={stayForm.checkin}
                      min={today}
                      onChange={(e) => setStayForm({ ...stayForm, checkin: e.target.value })}
                      className="input-field pl-11 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Check Out Date */}
                <div>
                  <label htmlFor="stay-checkout" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Check-Out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-amber-400" />
                    <input
                      id="stay-checkout"
                      type="date"
                      value={stayForm.checkout}
                      min={stayForm.checkin || today}
                      onChange={(e) => setStayForm({ ...stayForm, checkout: e.target.value })}
                      className="input-field pl-11 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Rooms count */}
                <div>
                  <label htmlFor="stay-rooms" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Rooms Required
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-rose-400" />
                    <select
                      id="stay-rooms"
                      value={stayForm.rooms}
                      onChange={(e) => setStayForm({ ...stayForm, rooms: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5+"].map((r) => (
                        <option key={r} value={r} className="bg-[#16332a]">
                          {r} {r === "1" ? "Room" : "Rooms"}
                        </option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Guests count */}
                <div>
                  <label htmlFor="stay-guests" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Guests Count
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-violet-400" />
                    <select
                      id="stay-guests"
                      value={stayForm.guests}
                      onChange={(e) => setStayForm({ ...stayForm, guests: e.target.value })}
                      className="input-field pl-11 cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5–6", "7–10", "10+"].map((g) => (
                        <option key={g} value={g} className="bg-[#16332a]">{g} Guests</option>
                      ))}
                    </select>
                                      </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="stay-special" className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2 block">
                    Special Stays Requests
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-cyan-400" />
                    <input
                      id="stay-special"
                      type="text"
                      placeholder="Campfire setup, breakfast included…"
                      value={stayForm.special}
                      onChange={(e) => setStayForm({ ...stayForm, special: e.target.value })}
                      className="input-field pl-11"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/8">
            {/* Promise */}
            <div className="flex-1 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00D26A]/15 border border-[#00D26A]/20 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#00D26A]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {activeTab === "tour" ? "Free Custom Planning" : activeTab === "cab" ? "All-Inclusive Sightseeing Cab Fares" : "Direct-to-Owner Cottage Rates"}
                </div>
                <div className="text-xs text-white/40 mt-0.5">
                  {activeTab === "tour" && "We reply directly within 2 hours • No booking fees"}
                  {activeTab === "cab" && "Includes clean vehicle, expert hill driver, and fuel"}
                  {activeTab === "stay" && "Verified properties, campfire, group dorms, catering setups available"}
                </div>
              </div>
            </div>

            {/* Send to WhatsApp */}
            <a
              href={`https://wa.me/917604904217?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default function BookingWidget() {
  return (
    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-emerald-500">Loading booking widget...</div>}>
      <BookingWidgetContent />
    </Suspense>
  );
}

