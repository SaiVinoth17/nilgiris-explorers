"use client";

import { useState } from "react";
import { Users, Calendar, ArrowRight, CheckCircle2, Car, MessageSquare, Clock } from "lucide-react";

type TravelerType = "Solo" | "Couple" | "Family" | "Group";
type Interest = "Nature" | "Tea" | "Wildlife" | "Trains" | "Photography";
type VehicleType = "Hatchback" | "Sedan" | "SUV" | "Tempo Traveller";

export default function AdventureBooking() {
  const [step, setStep] = useState(1);
  const [travelerType, setTravelerType] = useState<TravelerType | null>(null);
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [date, setDate] = useState("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [duration, setDuration] = useState(3);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [tripType, setTripType] = useState("");

  const handleNext = () => { if (step < 6) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleInterestToggle = (interest: Interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const buildWhatsAppMessage = () => {
    const text = `Hi! I'm planning an adventure to the Nilgiris.\n\n*Trip Type:* ${tripType || "Not sure"}\n*Travelers:* ${travelerType || "Not sure"} (${passengerCount} people)\n*Travel Date:* ${date || "Not decided"}\n*Duration:* ${duration} Days\n*Interests:* ${interests.length ? interests.join(", ") : "Open to suggestions"}\n*Preferred Vehicle:* ${vehicle || "Any"}\n*Pickup Location:* ${pickupLocation || "TBD"}\n*Special Requests:* ${specialRequests || "None"}\n\nPlease help me customize a package!`;
    return `https://wa.me/919585219509?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="bg-void section-pad relative overflow-hidden">
      <div className="container-default max-w-4xl relative z-10">
        <div className="mb-12">
          <span className="text-[var(--color-brand-emerald)] font-semibold uppercase tracking-widest text-sm">Adventure Planner</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">Craft Your Story</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Progress Sidebar */}
          <div className="md:col-span-3 flex md:flex-col gap-4 overflow-x-auto pb-4 md:pb-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-3 shrink-0 ${step >= i ? "text-[var(--color-brand-emerald)]" : "text-white/20"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border text-sm ${step === i ? "border-[var(--color-brand-emerald)] bg-[var(--color-brand-emerald)]/20" : "border-current"}`}>
                  {i}
                </div>
                <span className="hidden md:block font-medium text-sm">
                  {i === 1 ? "Travelers" : i === 2 ? "Dates & Pickup" : i === 3 ? "Duration" : i === 4 ? "Interests" : i === 5 ? "Vehicle" : "Review"}
                </span>
              </button>
            ))}
          </div>

          {/* Steps */}
          <div className="md:col-span-9">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Who is joining the adventure?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(["Solo", "Couple", "Family", "Group"] as TravelerType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTravelerType(type)}
                      className={`p-5 rounded-xl border transition-colors duration-200 text-left flex flex-col gap-3 ${
                        travelerType === type
                          ? "border-[var(--color-brand-emerald)] bg-[var(--color-brand-emerald)]/10 text-[var(--color-brand-emerald)]"
                          : "border-white/10 hover:border-white/25 text-white/70"
                      }`}
                    >
                      <Users className="w-7 h-7" />
                      <span className="font-semibold text-lg">{type}</span>
                    </button>
                  ))}
                </div>
                {travelerType && travelerType !== "Solo" && (
                  <div className="pt-4">
                    <label className="block text-white/70 text-sm mb-2">Number of Passengers</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="50" 
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(parseInt(e.target.value) || 2)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-emerald)]"
                    />
                  </div>
                )}
                <button disabled={!travelerType} onClick={handleNext} className="mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-brand-emerald)] text-black transition-colors duration-200 flex items-center gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">When and where?</h3>
                <div>
                  <label className="block text-white/70 text-sm mb-2 flex items-center gap-2"><Calendar className="w-4 h-4"/> Travel Date (Approximate)</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-emerald)]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2 flex items-center gap-2"><Car className="w-4 h-4"/> Trip Type</label>
                  <select 
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-emerald)] [&>option]:bg-forest [&>option]:text-white mb-4"
                  >
                    <option value="">Select Trip Type</option>
                    <option value="Local Sightseeing">Local Sightseeing</option>
                    <option value="One-way Drop">One-way Drop</option>
                    <option value="Round Trip">Round Trip</option>
                    <option value="Airport/Railway Pickup">Airport/Railway Pickup</option>
                    <option value="Multi-day Tour">Multi-day Tour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Preferred Pickup Location</label>
                  <select 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-emerald)] [&>option]:bg-forest [&>option]:text-white"
                  >
                    <option value="">Select Pickup Location</option>
                    <option value="Coimbatore Airport/Station">Coimbatore Airport/Station</option>
                    <option value="Ooty Bus Stand/Hotel">Ooty Bus Stand/Hotel</option>
                    <option value="Coonoor Station/Hotel">Coonoor Station/Hotel</option>
                    <option value="Mettupalayam Station">Mettupalayam Station</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mysore">Mysore</option>
                    <option value="Other">Other (Specify in requests)</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-[var(--color-brand-emerald)] text-black transition-colors duration-200 flex items-center gap-2">
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">How long is your journey?</h3>
                <div className="py-6">
                  <input
                    type="range" min="1" max="10" value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-emerald)]"
                  />
                  <div className="mt-6 flex justify-center items-end gap-2 text-[var(--color-brand-emerald)]">
                    <span className="text-5xl md:text-6xl font-display font-bold">{duration}</span>
                    <span className="text-xl mb-1">Days</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-[var(--color-brand-emerald)] text-black transition-colors duration-200 flex items-center gap-2">
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">What calls to you?</h3>
                <div className="flex flex-wrap gap-3">
                  {(["Nature", "Tea", "Wildlife", "Trains", "Photography", "Adventure", "Camping", "Lakes"] as string[]).map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest as Interest)}
                      className={`px-5 py-2.5 rounded-full border transition-colors duration-200 flex items-center gap-2 ${
                        interests.includes(interest as Interest)
                          ? "border-[var(--color-brand-emerald)] bg-[var(--color-brand-emerald)] text-black font-medium"
                          : "border-white/20 text-white/80 hover:border-white/40"
                      }`}
                    >
                      {interests.includes(interest as Interest) && <CheckCircle2 size={16} />}
                      {interest}
                    </button>
                  ))}
                </div>
                <div className="pt-4">
                  <label className="block text-white/70 text-sm mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Special Requests or Notes</label>
                  <textarea 
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., Require wheelchair accessibility, preferring vegetarian food..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-emerald)]"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-[var(--color-brand-emerald)] text-black transition-colors duration-200 flex items-center gap-2">
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Preferred Vehicle Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(["Hatchback", "Sedan", "SUV", "Tempo Traveller"] as VehicleType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setVehicle(type)}
                      className={`p-5 rounded-xl border transition-colors duration-200 text-left flex flex-col gap-3 ${
                        vehicle === type
                          ? "border-[var(--color-brand-emerald)] bg-[var(--color-brand-emerald)]/10 text-[var(--color-brand-emerald)]"
                          : "border-white/10 hover:border-white/25 text-white/70"
                      }`}
                    >
                      <Car className="w-7 h-7" />
                      <span className="font-semibold text-lg">{type}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-[var(--color-brand-emerald)] text-black transition-colors duration-200 flex items-center gap-2">
                    Review Journey <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 text-center animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Your Custom Journey</h3>
                <p className="text-lg text-white/60 font-serif italic max-w-2xl mx-auto">
                  A {duration}-day {travelerType?.toLowerCase()} adventure for {passengerCount} people focusing on {interests.length ? interests.join(", ") : "everything the Nilgiris offers"}, traveling in a {vehicle || "comfortable vehicle"}.
                </p>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 inline-block text-left mt-4">
                  <h4 className="text-[var(--color-brand-emerald)] font-semibold uppercase tracking-widest text-xs mb-1">Recommended</h4>
                  <p className="text-xl font-display text-white">The Signature Explorer</p>
                </div>
                <br />
                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => import("@/lib/analytics").then(m => m.trackEvent("booking_whatsapp_click", { duration, travelerType, passengerCount }))}
                  className="inline-flex px-10 py-4 bg-[var(--color-brand-emerald)] text-black font-bold rounded-full hover:bg-[var(--color-brand-emerald)] text-black transition-colors duration-200 text-lg mt-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  Confirm on WhatsApp →
                </a>
                <p className="text-white/40 text-sm mt-3">Or call: +91 95852 19509</p>
                <div className="flex justify-center mt-6">
                  <button onClick={handleBack} className="px-6 py-2 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200 text-sm">Make Changes</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

