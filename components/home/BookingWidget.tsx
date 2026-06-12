"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";

import {
  MapPin, Calendar, Users, Compass, MessageSquare, ArrowRight, Sparkles, Home, Car,
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

// Reusable field wrapper — ensures every label+input pair has identical layout
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] leading-none">
        {label}
      </label>
      {children}
    </div>
  );
}

// Reusable icon-prefixed input wrapper — keeps icon and field perfectly centred
function InputWrap({ icon: Icon, iconColor, children }: {
  icon: React.ElementType;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Icon
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 shrink-0"
        style={{ color: iconColor }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

function BookingWidgetContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<WidgetTab>("tour");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer for entrance animation — no heavy JS, just toggling a class
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const tabs: { id: WidgetTab; icon: React.ElementType; label: string }[] = [
    { id: "tour", icon: Compass, label: "Plan Tour Package" },
    { id: "cab",  icon: Car,     label: "Book Sightseeing Cab" },
    { id: "stay", icon: Home,    label: "Book Ooty Stay" },
  ];

  const fieldBase =
    "w-full h-12 pl-10 pr-4 rounded-xl text-white text-[16px] font-medium " +
    "bg-white/5 border border-white/10 " +
    "transition-all duration-200 ease-out " +
    "hover:border-emerald-500/30 hover:bg-white/8 " +
    "focus:outline-none focus:border-emerald-500 focus:bg-[#16332a]/80 focus:shadow-[0_0_0_3px_rgba(0,210,106,0.15)] " +
    "placeholder:text-white/25 [color-scheme:dark] appearance-none";

  const selectFieldBase =
    fieldBase +
    " cursor-pointer " +
    "bg-[image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.35)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")] " +
    "bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.1rem] pr-9";

  return (
    <section id="booking" className="relative py-0 -mt-20 z-20">
      <div className="container-default">
        <div className="max-w-5xl mx-auto">

          {/* Subtle mist glow behind the widget */}
          <div
            className="absolute inset-x-8 -top-12 h-40 rounded-full blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,210,106,0.12) 0%, transparent 70%)",
              transform: "translateZ(0)",
            }}
            aria-hidden="true"
          />

          {/* Main Card */}
          <div
            ref={sectionRef}
            className="relative rounded-3xl border border-emerald-500/15 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
            style={{
              background: "linear-gradient(145deg, rgba(15,40,32,0.97) 0%, rgba(11,29,23,0.99) 100%)",
              backdropFilter: "blur(24px)",
              // Entrance animation driven by Intersection Observer
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Subtle inner top glow line */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,106,0.35), transparent)" }}
              aria-hidden="true"
            />

            <div className="p-5 sm:p-7 lg:p-8">

              {/* ── Tab Switcher ── */}
              <div className="flex gap-1 mb-7 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                {tabs.map(({ id, icon: Icon, label }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={[
                        "relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold",
                        "transition-all duration-250 whitespace-nowrap min-w-0",
                        isActive
                          ? "text-white"
                          : "text-white/40 hover:text-white/70",
                      ].join(" ")}
                      style={{
                        background: isActive ? "rgba(0,210,106,0.15)" : "transparent",
                        boxShadow: isActive ? "inset 0 0 0 1px rgba(0,210,106,0.3)" : "none",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? "#00D26A" : "currentColor" }} />
                      <span className="hidden sm:inline truncate">{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ── TOUR FORM ── */}
              {activeTab === "tour" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <FieldGroup label="Where do you want to go?">
                    <InputWrap icon={MapPin} iconColor="#00D26A">
                      <select
                        id="trip-destination"
                        value={tourForm.destination}
                        onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                        className={selectFieldBase}
                      >
                        <option value="" className="bg-[#0f2820]">Select destination…</option>
                        {destinations.map((d) => (
                          <option key={d} value={d} className="bg-[#0f2820]">{d}</option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Type of Experience">
                    <InputWrap icon={Compass} iconColor="#a78bfa">
                      <select
                        id="tour-type"
                        value={tourForm.tourType}
                        onChange={(e) => setTourForm({ ...tourForm, tourType: e.target.value })}
                        className={selectFieldBase}
                      >
                        <option value="" className="bg-[#0f2820]">Select tour type…</option>
                        {tourTypes.map((t) => (
                          <option key={t.value} value={t.label} className="bg-[#0f2820]">{t.label}</option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Preferred Travel Date">
                    <InputWrap icon={Calendar} iconColor="#60a5fa">
                      <input
                        id="travel-date"
                        type="date"
                        value={tourForm.date}
                        min={today}
                        onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                        className={fieldBase}
                      />
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Trip Duration">
                    <InputWrap icon={Calendar} iconColor="#fbbf24">
                      <select
                        id="trip-duration"
                        value={tourForm.duration}
                        onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                        className={selectFieldBase}
                      >
                        <option value="" className="bg-[#0f2820]">Select duration…</option>
                        {durations.map((d) => (
                          <option key={d} value={d} className="bg-[#0f2820]">{d}</option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Number of Travelers">
                    <InputWrap icon={Users} iconColor="#f87171">
                      <select
                        id="travelers-count"
                        value={tourForm.travelers}
                        onChange={(e) => setTourForm({ ...tourForm, travelers: e.target.value })}
                        className={selectFieldBase}
                      >
                        {["1", "2", "3", "4", "5", "6", "7–10", "11–20", "20+"].map((n) => (
                          <option key={n} value={n} className="bg-[#0f2820]">
                            {n} {parseInt(n) === 1 ? "Traveler" : "Travelers"}
                          </option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Special Requests (optional)">
                    <InputWrap icon={MessageSquare} iconColor="#22d3ee">
                      <input
                        id="special-requests"
                        type="text"
                        placeholder="Honeymoon setup, tour guides…"
                        value={tourForm.message}
                        onChange={(e) => setTourForm({ ...tourForm, message: e.target.value })}
                        className={fieldBase}
                      />
                    </InputWrap>
                  </FieldGroup>
                </div>
              )}

              {/* ── CAB FORM ── */}
              {activeTab === "cab" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <FieldGroup label="Select Sightseeing Circuit">
                    <InputWrap icon={MapPin} iconColor="#00D26A">
                      <select
                        id="cab-circuit"
                        value={cabForm.circuit}
                        onChange={(e) => setCabForm({ ...cabForm, circuit: e.target.value })}
                        className={selectFieldBase}
                      >
                        {sightseeingCircuits.map((c) => (
                          <option key={c.id} value={c.name} className="bg-[#0f2820]">{c.name}</option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Preferred Cab Type">
                    <InputWrap icon={Car} iconColor="#a78bfa">
                      <select
                        id="cab-type"
                        value={cabForm.vehicle}
                        onChange={(e) => setCabForm({ ...cabForm, vehicle: e.target.value })}
                        className={selectFieldBase}
                      >
                        <option value="Hatchback (Indica)" className="bg-[#0f2820]">Standard Hatchback (Indica/Swift)</option>
                        <option value="Sedan Premium (Etios)" className="bg-[#0f2820]">Sedan Comfort (Dzire/Etios)</option>
                        <option value="SUV Premium (Xylo)" className="bg-[#0f2820]">Spacious SUV (Xylo/Ertiga)</option>
                        <option value="Luxury SUV (Innova)" className="bg-[#0f2820]">Premium SUV (Toyota Innova)</option>
                        <option value="Tempo Traveller" className="bg-[#0f2820]">Large Group Van (Tempo Traveller)</option>
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Sightseeing Date">
                    <InputWrap icon={Calendar} iconColor="#60a5fa">
                      <input
                        id="cab-date"
                        type="date"
                        value={cabForm.date}
                        min={today}
                        onChange={(e) => setCabForm({ ...cabForm, date: e.target.value })}
                        className={fieldBase}
                      />
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Number of Guests">
                    <InputWrap icon={Users} iconColor="#f87171">
                      <select
                        id="cab-guests"
                        value={cabForm.guests}
                        onChange={(e) => setCabForm({ ...cabForm, guests: e.target.value })}
                        className={selectFieldBase}
                      >
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9–12", "13+"].map((n) => (
                          <option key={n} value={n} className="bg-[#0f2820]">
                            {n} {n === "1" ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Pickup Location / Hotel Address">
                    <InputWrap icon={MessageSquare} iconColor="#22d3ee">
                      <input
                        id="cab-pickup"
                        type="text"
                        placeholder="e.g. Ooty Railway Station, Sterling Resorts…"
                        value={cabForm.pickup}
                        onChange={(e) => setCabForm({ ...cabForm, pickup: e.target.value })}
                        className={`${fieldBase} sm:col-span-2`}
                      />
                    </InputWrap>
                  </FieldGroup>
                </div>
              )}

              {/* ── STAY FORM ── */}
              {activeTab === "stay" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <FieldGroup label="Choose Stay / Cottage Type">
                    <InputWrap icon={Home} iconColor="#00D26A">
                      <select
                        id="stay-type"
                        value={stayForm.stayType}
                        onChange={(e) => setStayForm({ ...stayForm, stayType: e.target.value })}
                        className={selectFieldBase}
                      >
                        {accommodationPackages.map((s) => (
                          <option key={s.id} value={s.name} className="bg-[#0f2820]">{s.name} (starts ₹{s.price})</option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Check-In Date">
                    <InputWrap icon={Calendar} iconColor="#60a5fa">
                      <input
                        id="stay-checkin"
                        type="date"
                        value={stayForm.checkin}
                        min={today}
                        onChange={(e) => setStayForm({ ...stayForm, checkin: e.target.value })}
                        className={fieldBase}
                      />
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Check-Out Date">
                    <InputWrap icon={Calendar} iconColor="#fbbf24">
                      <input
                        id="stay-checkout"
                        type="date"
                        value={stayForm.checkout}
                        min={stayForm.checkin || today}
                        onChange={(e) => setStayForm({ ...stayForm, checkout: e.target.value })}
                        className={fieldBase}
                      />
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Rooms Required">
                    <InputWrap icon={Users} iconColor="#f87171">
                      <select
                        id="stay-rooms"
                        value={stayForm.rooms}
                        onChange={(e) => setStayForm({ ...stayForm, rooms: e.target.value })}
                        className={selectFieldBase}
                      >
                        {["1", "2", "3", "4", "5+"].map((r) => (
                          <option key={r} value={r} className="bg-[#0f2820]">
                            {r} {r === "1" ? "Room" : "Rooms"}
                          </option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Guests Count">
                    <InputWrap icon={Users} iconColor="#a78bfa">
                      <select
                        id="stay-guests"
                        value={stayForm.guests}
                        onChange={(e) => setStayForm({ ...stayForm, guests: e.target.value })}
                        className={selectFieldBase}
                      >
                        {["1", "2", "3", "4", "5–6", "7–10", "10+"].map((g) => (
                          <option key={g} value={g} className="bg-[#0f2820]">{g} Guests</option>
                        ))}
                      </select>
                    </InputWrap>
                  </FieldGroup>

                  <FieldGroup label="Special Requests">
                    <InputWrap icon={MessageSquare} iconColor="#22d3ee">
                      <input
                        id="stay-special"
                        type="text"
                        placeholder="Campfire setup, breakfast included…"
                        value={stayForm.special}
                        onChange={(e) => setStayForm({ ...stayForm, special: e.target.value })}
                        className={fieldBase}
                      />
                    </InputWrap>
                  </FieldGroup>
                </div>
              )}

              {/* ── Bottom Bar ── */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-5 border-t border-white/[0.07]">
                {/* Promise badge */}
                <div className="flex-1 flex items-center gap-3 w-full sm:w-auto">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(0,210,106,0.12)", border: "1px solid rgba(0,210,106,0.2)" }}>
                    <Sparkles className="w-5 h-5" style={{ color: "#00D26A" }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white leading-tight">
                      {activeTab === "tour" ? "Free Custom Planning" : activeTab === "cab" ? "All-Inclusive Sightseeing Fares" : "Direct-to-Owner Cottage Rates"}
                    </div>
                    <div className="text-xs text-white/35 mt-0.5 leading-tight">
                      {activeTab === "tour" && "We reply within 2 hours · No booking fees"}
                      {activeTab === "cab" && "Includes clean vehicle, expert hill driver & fuel"}
                      {activeTab === "stay" && "Verified properties · campfire · group setups available"}
                    </div>
                  </div>
                </div>

                {/* CTA Button with premium glow */}
                <a
                  href={`https://wa.me/919585219509?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white text-[15px] overflow-hidden touch-feedback"
                  style={{
                    background: "linear-gradient(135deg, #00D26A 0%, #00A855 100%)",
                    boxShadow: "0 4px 24px rgba(0,210,106,0.35), 0 0 0 0 rgba(0,210,106,0)",
                    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 40px rgba(0,210,106,0.55), 0 0 60px rgba(0,210,106,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(0,210,106,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Shimmer overlay */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)",
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative">Get Free Quote</span>
                  <ArrowRight className="relative w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BookingWidget() {
  return (
    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-emerald-500/50 text-sm">Loading booking widget…</div>}>
      <BookingWidgetContent />
    </Suspense>
  );
}
