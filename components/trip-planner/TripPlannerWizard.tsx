"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import {
  Calendar, MapPin, Users, ArrowRight, ArrowLeft,
  MessageCircle, Download, Car, Hotel, Coffee, Tent,
  Check, Thermometer, Clock,
} from "lucide-react";
import { vehiclePricing } from "@/lib/data/pricing";
import { pickupLocations, accommodationPricing, foodPricing } from "@/lib/data/planner";
import { destinations } from "@/lib/data";

/* ─── Types ────────────────────────────────────────── */
type VehicleKey = keyof typeof vehiclePricing;
type AccommodationKey = keyof typeof accommodationPricing;
type TripType = "Family" | "Couple" | "Friends" | "Solo";

const VEHICLE_OPTIONS: VehicleKey[] = ["sedan", "suv", "innova", "tempo"];
const FOOD_KEYS = ["budget", "standard", "premium"] as const;
type FoodKey = (typeof FOOD_KEYS)[number];
const DEST_OPTIONS = ["Ooty", "Coonoor", "Pykara", "Avalanche", "Mudumalai", "Kotagiri"];
const EST_KM_PER_DAY = 80;
const SIGHTSEEING_PER_DAY = 800;
const MISC_FIXED = 1500;

/* ─── Helpers ──────────────────────────────────────── */
function suggestVehicle(pax: number): VehicleKey {
  if (pax <= 4) return "sedan";
  if (pax <= 6) return "suv";
  if (pax <= 7) return "innova";
  return "tempo";
}

function getDestData(name: string) {
  return destinations.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );
}

/* ─── GSAP Counter Hook ────────────────────────────── */
function useCountUp(target: number, duration = 1.2): number {
  const [display, setDisplay] = useState(0);
  const tweenRef = useRef({ val: 0 });

  useEffect(() => {
    const tween = gsap.to(tweenRef.current, {
      val: target,
      duration,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate: () => setDisplay(Math.round(tweenRef.current.val)),
    });
    return () => { tween.kill(); };
  }, [target, duration]);

  return display;
}

/* ─── Slide Variants ───────────────────────────────── */
const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

/* ─── Active Pill Button ───────────────────────────── */
function Pill({ active, onClick, children, className = "" }: {
  active: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
        active
          ? "bg-[var(--color-brand-emerald)]/15 border-[var(--color-brand-emerald)]/40 text-[var(--color-brand-emerald)]"
          : "bg-black/20 border-white/10 text-white/60 hover:bg-white/5"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function TripPlannerWizard() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    pickupId: "coimbatore",
    destinations: [] as string[],
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
    tripType: "Family" as TripType,
    vehicleKey: "sedan" as VehicleKey,
    accKey: "standard" as AccommodationKey,
    foodKey: "standard" as FoodKey,
  });

  /* Auto-upgrade vehicle when passengers exceed capacity */
  const pax = formData.adults + formData.children;
  const recommended = suggestVehicle(pax);

  useEffect(() => {
    const cap = vehiclePricing[formData.vehicleKey].capacity;
    if (pax > cap) {
      setFormData((p) => ({ ...p, vehicleKey: suggestVehicle(pax) }));
    }
  }, [pax, formData.vehicleKey]);

  /* Primary destination for preview / summary */
  const primaryDest = formData.destinations.length > 0 ? getDestData(formData.destinations[0]) : null;

  /* ─── Cost Calculations ────────────────────────── */
  const costs = useMemo(() => {
    let nights = 2;
    if (formData.startDate && formData.endDate) {
      const s = new Date(formData.startDate);
      const e = new Date(formData.endDate);
      if (e > s) nights = Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
    }
    const days = nights + 1;
    const rooms = Math.max(1, Math.ceil(formData.adults / 2));
    const totalPax = formData.adults + formData.children;

    const v = vehiclePricing[formData.vehicleKey];
    const vehicleCost = (v.baseRatePerKm * EST_KM_PER_DAY + v.driverBata) * days + v.hillCharge;
    const accCost = accommodationPricing[formData.accKey].pricePerNight * rooms * nights;
    const foodCost = foodPricing[formData.foodKey].pricePerPersonPerDay * totalPax * days;
    const sightseeingCost = SIGHTSEEING_PER_DAY * days;
    const total = vehicleCost + accCost + foodCost + sightseeingCost + MISC_FIXED;

    return { nights, days, rooms, totalPax, vehicleCost, accCost, foodCost, sightseeingCost, total };
  }, [formData]);

  const animatedTotal = useCountUp(costs.total);

  /* ─── Navigation ───────────────────────────────── */
  const goTo = useCallback((next: number) => {
    setIsLoading(true);
    setTimeout(() => { setStep(next); setIsLoading(false); }, 350);
  }, []);

  const canProceed = formData.pickupId && formData.destinations.length > 0 && formData.startDate && formData.endDate;

  /* ─── WhatsApp ─────────────────────────────────── */
  const pickup = pickupLocations.find((p) => p.id === formData.pickupId);

  const buildWhatsApp = useCallback(() => {
    const v = vehiclePricing[formData.vehicleKey];
    const h = accommodationPricing[formData.accKey];
    const f = foodPricing[formData.foodKey];
    const text = `Hello Nilgiris Explorers! I used the Trip Planner and would like to proceed:\n\n*Trip Details:*\n📍 Pickup: ${pickup?.name ?? formData.pickupId}\n🗺️ Destinations: ${formData.destinations.join(", ")}\n📅 Dates: ${formData.startDate} to ${formData.endDate} (${costs.nights} Nights)\n👥 Travelers: ${formData.adults} Adults, ${formData.children} Children\n🚘 Vehicle: ${v.name}\n🏨 Hotel: ${h.name}\n🍽️ Meals: ${f.name}\n\n*Estimated Total:* ₹${costs.total.toLocaleString("en-IN")}\n\nCould you check availability and confirm?`;
    return `https://wa.me/919585219509?text=${encodeURIComponent(text)}`;
  }, [formData, costs, pickup]);

  /* ─── PDF Download ─────────────────────────────── */
  const handlePDF = useCallback(async () => {
    const el = printRef.current;
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#050A08" });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, w, h);
      pdf.save(`Nilgiris-Trip-Estimate-${formData.startDate || "Plan"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  }, [formData.startDate]);

  /* ─── Toggle Destination ───────────────────────── */
  const toggleDest = (dest: string) => {
    setFormData((p) => ({
      ...p,
      destinations: p.destinations.includes(dest)
        ? p.destinations.filter((d) => d !== dest)
        : [...p.destinations, dest],
    }));
  };

  /* ─── Fare line items ──────────────────────────── */
  const fareItems = [
    { icon: Car, label: `Transport (${vehiclePricing[formData.vehicleKey].name})`, amount: costs.vehicleCost },
    { icon: Hotel, label: `Stay (${accommodationPricing[formData.accKey].name})`, amount: costs.accCost },
    { icon: Coffee, label: `Meals (${foodPricing[formData.foodKey].name})`, amount: costs.foodCost },
    { icon: Tent, label: "Sightseeing & Activities", amount: costs.sightseeingCost },
    { icon: Check, label: "Permits, Parking & Misc", amount: MISC_FIXED },
  ];

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-brand-emerald)]/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-brand-emerald)]/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* ── Progress header (steps 1–2) ── */}
      {step < 3 && (
        <div className="relative z-10 p-6 md:p-10 pb-0">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-brand-emerald)] block mb-1">
                Smart Trip Planner
              </span>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                {step === 1 && "Plan Your Trip"}
                {step === 2 && "Your Trip Summary"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? "w-10 bg-[var(--color-brand-emerald)]" : "w-6 bg-white/10"}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 min-h-[420px]">
        {isLoading ? (
          <div className="p-8 md:p-10 space-y-6 animate-pulse">
            <div className="h-5 w-48 bg-white/10 rounded-lg" />
            <div className="h-4 w-72 bg-white/5 rounded" />
            <div className="grid grid-cols-2 gap-4"><div className="h-28 bg-white/5 rounded-xl" /><div className="h-28 bg-white/5 rounded-xl" /></div>
            <div className="h-12 w-40 bg-white/10 rounded-full ml-auto" />
          </div>
        ) : (
          <AnimatePresence mode="wait">

            {/* ═══════ STEP 1 — TRIP DETAILS ═══════ */}
            {step === 1 && (
              <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="p-6 md:p-10 pt-4 space-y-8">

                {/* Where & When */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Where & When</h3>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2.5 block">Pickup Location</label>
                    <div className="flex flex-wrap gap-2">
                      {pickupLocations.map((loc) => (
                        <Pill key={loc.id} active={formData.pickupId === loc.id} onClick={() => setFormData({ ...formData, pickupId: loc.id })}>
                          {loc.name}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2.5 block">Destinations</label>
                    <div className="flex flex-wrap gap-2">
                      {DEST_OPTIONS.map((dest) => (
                        <Pill key={dest} active={formData.destinations.includes(dest)} onClick={() => toggleDest(dest)} className="rounded-full">
                          {formData.destinations.includes(dest) && <Check className="w-3.5 h-3.5 inline mr-1 -ml-0.5" />}
                          {dest}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  {/* Destination preview card */}
                  {primaryDest && (
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 max-w-md">
                      <div className="relative h-32">
                        <Image src={primaryDest.image} alt={primaryDest.name} fill className="object-cover" sizes="400px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                          <div>
                            <p className="text-white font-display font-bold text-lg leading-tight">{primaryDest.name}</p>
                            <p className="text-white/50 text-xs">{primaryDest.tag}</p>
                          </div>
                          {primaryDest.temperature && (
                            <span className="text-[11px] text-white/50 flex items-center gap-1 shrink-0">
                              <Thermometer className="w-3 h-3" /> {primaryDest.temperature.split(";")[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4 space-y-2.5">
                        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{primaryDest.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {primaryDest.highlights?.slice(0, 3).map((h) => (
                            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">{h}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-2 block">Check-in</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-brand-emerald)]/60" />
                        <input type="date" min={today} value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full bg-black/30 border border-white/15 rounded-xl pl-10 pr-3 py-3 text-white text-sm focus:outline-none focus:border-[var(--color-brand-emerald)]/50 transition-colors [color-scheme:dark]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-2 block">Check-out</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-brand-emerald)]/60" />
                        <input type="date" min={formData.startDate || today} value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          disabled={!formData.startDate}
                          className="w-full bg-black/30 border border-white/15 rounded-xl pl-10 pr-3 py-3 text-white text-sm focus:outline-none focus:border-[var(--color-brand-emerald)]/50 transition-colors [color-scheme:dark] disabled:opacity-40" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Travelers</h3>
                  <div className="grid grid-cols-2 gap-6 max-w-md">
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-1 flex justify-between">Adults <span className="text-white font-bold">{formData.adults}</span></label>
                      <input type="range" min="1" max="15" value={formData.adults} onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })} className="w-full accent-[var(--color-brand-emerald)]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-1 flex justify-between">Children <span className="text-white font-bold">{formData.children}</span></label>
                      <input type="range" min="0" max="10" value={formData.children} onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })} className="w-full accent-[var(--color-brand-emerald)]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2.5 block">Trip Type</label>
                    <div className="flex flex-wrap gap-2">
                      {(["Family", "Couple", "Friends", "Solo"] as TripType[]).map((t) => (
                        <Pill key={t} active={formData.tripType === t} onClick={() => setFormData({ ...formData, tripType: t })} className="rounded-full">{t}</Pill>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2"><Car className="w-3.5 h-3.5" /> Preferences</h3>
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2.5 block">Vehicle</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {VEHICLE_OPTIONS.map((key) => {
                        const v = vehiclePricing[key];
                        return (
                          <button key={key} onClick={() => setFormData({ ...formData, vehicleKey: key })}
                            className={`p-3 rounded-xl border text-left text-sm transition-all relative ${formData.vehicleKey === key ? "bg-[var(--color-brand-emerald)]/15 border-[var(--color-brand-emerald)]/40" : "bg-black/20 border-white/10 hover:bg-white/5"}`}>
                            <span className={`block font-medium ${formData.vehicleKey === key ? "text-[var(--color-brand-emerald)]" : "text-white/80"}`}>{v.name.split("(")[0].trim()}</span>
                            <span className="text-[11px] text-white/40">Up to {v.capacity} pax</span>
                            {key === recommended && <span className="absolute -top-2 right-2 text-[9px] bg-[var(--color-brand-emerald)] text-black font-bold px-1.5 py-0.5 rounded-full">Best Fit</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2.5 block">Hotel Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(accommodationPricing) as AccommodationKey[]).map((key) => {
                        const a = accommodationPricing[key];
                        return (
                          <button key={key} onClick={() => setFormData({ ...formData, accKey: key })}
                            className={`p-3 rounded-xl border text-left text-sm transition-all ${formData.accKey === key ? "bg-[var(--color-brand-emerald)]/15 border-[var(--color-brand-emerald)]/40" : "bg-black/20 border-white/10 hover:bg-white/5"}`}>
                            <span className={`block font-medium ${formData.accKey === key ? "text-[var(--color-brand-emerald)]" : "text-white/80"}`}>{a.name}</span>
                            <span className="text-[11px] text-white/40">₹{a.pricePerNight.toLocaleString()}/night</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2.5 block">Meal Plan</label>
                    <div className="flex flex-wrap gap-2">
                      {FOOD_KEYS.map((key) => {
                        const f = foodPricing[key];
                        return (
                          <Pill key={key} active={formData.foodKey === key} onClick={() => setFormData({ ...formData, foodKey: key })}>
                            {f.name} · ₹{f.pricePerPersonPerDay}/p/day
                          </Pill>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button onClick={() => goTo(2)} disabled={!canProceed} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed group">
                    View Summary <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════ STEP 2 — TRIP SUMMARY ═══════ */}
            {step === 2 && (
              <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="p-6 md:p-10 pt-4 space-y-8">
                {/* Hero summary card */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  {primaryDest && (
                    <div className="absolute inset-0">
                      <Image src={primaryDest.image} alt={primaryDest.name} fill className="object-cover opacity-25" sizes="800px" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
                    </div>
                  )}
                  <div className="relative z-10 p-6 md:p-8">
                    {/* Route */}
                    <div className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
                      <span className="bg-white/10 px-3 py-1 rounded-lg font-medium">{pickup?.name}</span>
                      <ArrowRight className="w-4 h-4 text-[var(--color-brand-emerald)]" />
                      {formData.destinations.map((d, i) => (
                        <React.Fragment key={d}>
                          {i > 0 && <ArrowRight className="w-3 h-3 text-white/30" />}
                          <span className="bg-[var(--color-brand-emerald)]/15 px-3 py-1 rounded-lg font-medium text-[var(--color-brand-emerald)]">{d}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      {[
                        { label: "Duration", value: `${costs.nights}N / ${costs.days}D`, ic: Clock },
                        { label: "Travelers", value: `${formData.adults}A, ${formData.children}C`, ic: Users },
                        { label: "Vehicle", value: vehiclePricing[formData.vehicleKey].name.split("(")[0].trim(), ic: Car },
                        { label: "Weather", value: primaryDest?.temperature?.split(";")[0] ?? "Pleasant", ic: Thermometer },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                          <s.ic className="w-4 h-4 text-[var(--color-brand-emerald)] mb-2" />
                          <p className="text-[11px] text-white/40 uppercase tracking-wider">{s.label}</p>
                          <p className="text-white font-medium text-sm mt-1 truncate">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    {/* Animated total */}
                    <div className="text-center py-4 border-t border-white/10">
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Estimated Total</p>
                      <p className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-emerald)] counter-value">
                        ₹{animatedTotal.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-white/30 mt-2">*Taxes & GST may apply</p>
                    </div>
                  </div>
                </div>

                {/* Climate note */}
                {primaryDest?.climate && (
                  <div className="p-4 rounded-xl bg-[var(--color-brand-emerald)]/5 border border-[var(--color-brand-emerald)]/15 flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-[var(--color-brand-emerald)] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-brand-emerald)] mb-1">Climate Note</p>
                      <p className="text-xs text-white/60 leading-relaxed">{primaryDest.climate} Best time: {primaryDest.bestTime}</p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <button onClick={() => goTo(1)} className="text-white/50 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Edit Details
                  </button>
                  <button onClick={() => goTo(3)} className="btn-primary group">
                    View Breakdown <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════ STEP 3 — FARE BREAKDOWN ═══════ */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center pb-8">

                {/* Printable estimate card */}
                <div ref={printRef} className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 mx-4 md:mx-auto" style={{ background: "#050A08" }}>
                  <div className="p-6 md:p-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                      <div>
                        <h1 className="text-xl font-display font-bold text-white tracking-wide">NILGIRIS EXPLORERS</h1>
                        <p className="text-[var(--color-brand-emerald)] text-xs mt-1 uppercase tracking-widest font-semibold">Premium Trip Estimate</p>
                      </div>
                      <QRCodeSVG value="https://nilgirisexplorers.com" size={56} bgColor="transparent" fgColor="#00D26A" />
                    </div>

                    {/* Trip meta */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {[
                        { l: "Duration", v: `${costs.nights}N / ${costs.days}D` },
                        { l: "Dates", v: formData.startDate ? new Date(formData.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—" },
                        { l: "Travelers", v: `${formData.adults}A, ${formData.children}C` },
                        { l: "Pickup", v: pickup?.name ?? "—" },
                      ].map((m) => (
                        <div key={m.l}>
                          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">{m.l}</p>
                          <p className="text-white font-medium text-sm">{m.v}</p>
                        </div>
                      ))}
                    </div>

                    {/* Route */}
                    <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">Route</p>
                      <p className="text-white font-medium text-sm flex items-center gap-2 flex-wrap">
                        <MapPin className="w-4 h-4 text-[var(--color-brand-emerald)]" />
                        {pickup?.name} → {formData.destinations.join(" → ")}
                      </p>
                    </div>

                    {/* Fare breakdown with animated bars */}
                    <div className="mb-8 space-y-5">
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">Cost Breakdown</p>
                      {fareItems.map((item, i) => {
                        const pct = costs.total > 0 ? (item.amount / costs.total) * 100 : 0;
                        return (
                          <div key={item.label} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-white/70 flex items-center gap-2.5">
                                <item.icon className="w-4 h-4 text-[var(--color-brand-emerald)]/70" /> {item.label}
                              </span>
                              <span className="text-white font-medium counter-value">₹{item.amount.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-emerald)] to-[var(--color-brand-emerald-dark)] fare-bar"
                                style={{ width: `${pct}%`, animationDelay: `${i * 120}ms` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Grand total */}
                    <div className="border-t border-white/10 pt-6 flex justify-between items-end mb-8">
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Estimated Total</p>
                        <p className="text-white/50 text-[10px]">*Taxes & GST may apply</p>
                      </div>
                      <p className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-emerald)] counter-value">
                        ₹{animatedTotal.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-white/30 text-[10px] border-t border-white/10 pt-4">
                      <p>Contact: hello@nilgirisexplorers.com | +91 95852 19509</p>
                      <p className="mt-1">This is an automated estimate and subject to availability at the time of booking.</p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl px-6 md:px-0 mt-8">
                  <button onClick={handlePDF} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-5 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary py-3.5 text-sm">
                    <MessageCircle className="w-4 h-4" /> Book via WhatsApp
                  </a>
                </div>

                {/* Back / Start Over */}
                <div className="flex gap-6 mt-6">
                  <button onClick={() => goTo(2)} className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={() => { setStep(1); setIsLoading(false); }} className="text-white/40 hover:text-white text-sm underline underline-offset-4 transition-colors">
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
