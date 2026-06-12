"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import {
  MapPin, Calendar, Users, Compass, MessageSquare, ArrowRight, Sparkles, Home, Car, ChevronDown, Clock
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
    <section id="booking" className="relative py-0 -mt-24 z-20">
      {/* Lightweight Mist / Glow Effect behind the widget */}
      <div className="absolute inset-0 flex justify-center pointer-events-none -z-10">
        <div className="w-full max-w-6xl h-full bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen opacity-60" />
      </div>

      <div className="container-default">
        <div className="max-w-6xl mx-auto">
          <div
          className="relative bg-[#0a1f18]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.8)] border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-8 duration-1000"
        >
          {/* Top Form Switcher Tabs */}
          <div className="flex border-b border-white/10 mb-8 overflow-x-auto scrollbar-none gap-3 pb-3">
            <button
              onClick={() => setActiveTab("tour")}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "tour"
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(0,210,106,0.3)] transform scale-[1.02]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === "tour" ? "text-white" : "text-emerald-500"}`} />
              Plan Tour Package
            </button>
            <button
              onClick={() => setActiveTab("cab")}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "cab"
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(0,210,106,0.3)] transform scale-[1.02]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Car className={`w-4 h-4 ${activeTab === "cab" ? "text-white" : "text-emerald-500"}`} />
              Book Sightseeing Cab
            </button>
            <button
              onClick={() => setActiveTab("stay")}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "stay"
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(0,210,106,0.3)] transform scale-[1.02]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Home className={`w-4 h-4 ${activeTab === "stay" ? "text-white" : "text-emerald-500"}`} />
              Book Ooty Cottages / Stay
            </button>
          </div>

          {/* Form Switcher Body */}
          <div className="animate-in fade-in duration-500">
            {activeTab === "tour" && (
              <div
                key="tour-form"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-in slide-in-from-right-4 duration-500"
              >
                {/* Destination */}
                <div className="group">
                  <label htmlFor="trip-destination" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Where do you want to go?
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <MapPin className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
                    <select
                      id="trip-destination"
                      value={tourForm.destination}
                      onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0c201a]">Select destination…</option>
                      {destinations.map((d) => (
                        <option key={d} value={d} className="bg-[#0c201a]">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tour Type */}
                <div className="group">
                  <label htmlFor="tour-type" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Type of Experience
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Compass className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                    <select
                      id="tour-type"
                      value={tourForm.tourType}
                      onChange={(e) => setTourForm({ ...tourForm, tourType: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0c201a]">Select tour type…</option>
                      {tourTypes.map((t) => (
                        <option key={t.value} value={t.label} className="bg-[#0c201a]">{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travel Date */}
                <div className="group">
                  <label htmlFor="travel-date" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Preferred Travel Date
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Calendar className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                    <input
                      id="travel-date"
                      type="date"
                      value={tourForm.date}
                      min={today}
                      onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="group">
                  <label htmlFor="trip-duration" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Trip Duration
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Clock className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-amber-400 transition-colors pointer-events-none" />
                    <select
                      id="trip-duration"
                      value={tourForm.duration}
                      onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0c201a]">Select duration…</option>
                      {durations.map((d) => (
                        <option key={d} value={d} className="bg-[#0c201a]">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travelers */}
                <div className="group">
                  <label htmlFor="travelers-count" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Number of Travelers
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Users className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-rose-400 transition-colors pointer-events-none" />
                    <select
                      id="travelers-count"
                      value={tourForm.travelers}
                      onChange={(e) => setTourForm({ ...tourForm, travelers: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5", "6", "7–10", "11–20", "20+"].map((n) => (
                        <option key={n} value={n} className="bg-[#0c201a]">
                          {n} {parseInt(n) === 1 ? "Traveler" : "Travelers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="group">
                  <label htmlFor="special-requests" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Special Requests (optional)
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <MessageSquare className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-cyan-400 transition-colors pointer-events-none" />
                    <input
                      id="special-requests"
                      type="text"
                      placeholder="Honeymoon setup, tour guides…"
                      value={tourForm.message}
                      onChange={(e) => setTourForm({ ...tourForm, message: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cab" && (
              <div
                key="cab-form"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-in slide-in-from-right-4 duration-500"
              >
                {/* Circuit Dropdown */}
                <div className="group">
                  <label htmlFor="cab-circuit" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Select Sightseeing Circuit
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <MapPin className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
                    <select
                      id="cab-circuit"
                      value={cabForm.circuit}
                      onChange={(e) => setCabForm({ ...cabForm, circuit: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      {sightseeingCircuits.map((c) => (
                        <option key={c.id} value={c.name} className="bg-[#0c201a]">{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Class Selector */}
                <div className="group">
                  <label htmlFor="cab-type" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Preferred Cab Type
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Car className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                    <select
                      id="cab-type"
                      value={cabForm.vehicle}
                      onChange={(e) => setCabForm({ ...cabForm, vehicle: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="Hatchback (Indica)" className="bg-[#0c201a]">Standard Hatchback (Indica/Swift)</option>
                      <option value="Sedan Premium (Etios)" className="bg-[#0c201a]">Sedan Comfort (Dzire/Etios)</option>
                      <option value="SUV Premium (Xylo)" className="bg-[#0c201a]">Spacious SUV (Xylo/Ertiga)</option>
                      <option value="Luxury SUV (Innova)" className="bg-[#0c201a]">Premium SUV (Toyota Innova)</option>
                      <option value="Tempo Traveller" className="bg-[#0c201a]">Large Group Van (Tempo Traveller)</option>
                    </select>
                  </div>
                </div>

                {/* Travel Date */}
                <div className="group">
                  <label htmlFor="cab-date" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Sightseeing Date
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Calendar className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                    <input
                      id="cab-date"
                      type="date"
                      value={cabForm.date}
                      min={today}
                      onChange={(e) => setCabForm({ ...cabForm, date: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="group">
                  <label htmlFor="cab-guests" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Number of Guests
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Users className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-rose-400 transition-colors pointer-events-none" />
                    <select
                      id="cab-guests"
                      value={cabForm.guests}
                      onChange={(e) => setCabForm({ ...cabForm, guests: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9–12", "13+"].map((n) => (
                        <option key={n} value={n} className="bg-[#0c201a]">
                          {n} {n === "1" ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pickup point */}
                <div className="sm:col-span-2 group">
                  <label htmlFor="cab-pickup" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Pickup Location / Hotel Address
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <MessageSquare className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-cyan-400 transition-colors pointer-events-none" />
                    <input
                      id="cab-pickup"
                      type="text"
                      placeholder="e.g. Ooty Railway Station, Lake View Hotel, Sterling Resorts..."
                      value={cabForm.pickup}
                      onChange={(e) => setCabForm({ ...cabForm, pickup: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "stay" && (
              <div
                key="stay-form"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-in slide-in-from-right-4 duration-500"
              >
                {/* Stay Type */}
                <div className="group">
                  <label htmlFor="stay-type" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Choose stay / Cottage type
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Home className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
                    <select
                      id="stay-type"
                      value={stayForm.stayType}
                      onChange={(e) => setStayForm({ ...stayForm, stayType: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      {accommodationPackages.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#0c201a]">{s.name} (starts ₹{s.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Check In Date */}
                <div className="group">
                  <label htmlFor="stay-checkin" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Check-In Date
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Calendar className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                    <input
                      id="stay-checkin"
                      type="date"
                      value={stayForm.checkin}
                      min={today}
                      onChange={(e) => setStayForm({ ...stayForm, checkin: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Check Out Date */}
                <div className="group">
                  <label htmlFor="stay-checkout" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Check-Out Date
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Calendar className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-amber-400 transition-colors pointer-events-none" />
                    <input
                      id="stay-checkout"
                      type="date"
                      value={stayForm.checkout}
                      min={stayForm.checkin || today}
                      onChange={(e) => setStayForm({ ...stayForm, checkout: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Rooms count */}
                <div className="group">
                  <label htmlFor="stay-rooms" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Rooms Required
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Users className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-rose-400 transition-colors pointer-events-none" />
                    <select
                      id="stay-rooms"
                      value={stayForm.rooms}
                      onChange={(e) => setStayForm({ ...stayForm, rooms: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5+"].map((r) => (
                        <option key={r} value={r} className="bg-[#0c201a]">
                          {r} {r === "1" ? "Room" : "Rooms"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests count */}
                <div className="group">
                  <label htmlFor="stay-guests" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Guests Count
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <Users className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                    <select
                      id="stay-guests"
                      value={stayForm.guests}
                      onChange={(e) => setStayForm({ ...stayForm, guests: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5–6", "7–10", "10+"].map((g) => (
                        <option key={g} value={g} className="bg-[#0c201a]">{g} Guests</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="group">
                  <label htmlFor="stay-special" className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2 block group-focus-within:text-emerald-400 transition-colors">
                    Special Stays Requests
                  </label>
                  <div className="relative flex items-center h-[3.5rem] bg-[#0c201a] border border-white/10 rounded-xl group-focus-within:border-emerald-500/50 transition-all shadow-inner overflow-hidden">
                    <MessageSquare className="absolute left-4 w-5 h-5 text-white/30 group-focus-within:text-cyan-400 transition-colors pointer-events-none" />
                    <input
                      id="stay-special"
                      type="text"
                      placeholder="Campfire setup, breakfast included…"
                      value={stayForm.special}
                      onChange={(e) => setStayForm({ ...stayForm, special: e.target.value })}
                      className="w-full h-full pl-12 pr-4 bg-transparent text-white/90 text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 mt-4 border-t border-white/10">
            {/* Promise */}
            <div className="flex-1 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-[inset_0_0_12px_rgba(0,210,106,0.1)]">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm md:text-base font-bold text-white tracking-wide">
                  {activeTab === "tour" ? "Free Custom Planning" : activeTab === "cab" ? "All-Inclusive Sightseeing Cab Fares" : "Direct-to-Owner Cottage Rates"}
                </div>
                <div className="text-xs md:text-sm text-emerald-100/60 mt-1 font-medium">
                  {activeTab === "tour" && "We reply directly within 2 hours • No booking fees"}
                  {activeTab === "cab" && "Includes clean vehicle, expert hill driver, and fuel"}
                  {activeTab === "stay" && "Verified properties, campfire, group dorms, catering setups available"}
                </div>
              </div>
            </div>

            {/* Send to WhatsApp */}
            <a
              href={`https://wa.me/919585219509?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden flex items-center gap-2 justify-center rounded-xl bg-emerald-500 text-white font-bold text-[15px] px-8 h-[3.5rem] w-full sm:w-auto shadow-[0_0_30px_rgba(0,210,106,0.3)] hover:shadow-[0_0_50px_rgba(0,210,106,0.6)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
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

