"use client";

import { useState } from "react";
import { Users, Heart, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

type TravelerType = "Solo" | "Couple" | "Family" | "Group";
type Interest = "Nature" | "Tea" | "Wildlife" | "Trains" | "Photography";

export default function AdventureBooking() {
  const [step, setStep] = useState(1);
  const [travelerType, setTravelerType] = useState<TravelerType | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [duration, setDuration] = useState(3);

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleInterestToggle = (interest: Interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const buildWhatsAppMessage = () => {
    const text = `Hi! I'm planning an adventure to the Nilgiris.\n\n*Travelers:* ${travelerType || "Not sure"}\n*Duration:* ${duration} Days\n*Interests:* ${interests.length ? interests.join(", ") : "Open to suggestions"}\n\nPlease help me customize a package!`;
    return `https://wa.me/919585219509?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="bg-[#050A08] py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-12">
          <span className="text-emerald-500 font-semibold uppercase tracking-widest text-sm">Adventure Planner</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">Craft Your Story</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Progress */}
          <div className="md:col-span-3 flex md:flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-3 ${step >= i ? "text-emerald-400" : "text-white/20"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border text-sm ${step === i ? "border-emerald-400 bg-emerald-400/20" : "border-current"}`}>
                  {i}
                </div>
                <span className="hidden md:block font-medium text-sm">
                  {i === 1 ? "Travelers" : i === 2 ? "Interests" : i === 3 ? "Duration" : "Review"}
                </span>
              </button>
            ))}
          </div>

          {/* Steps */}
          <div className="md:col-span-9">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Who is joining the adventure?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(["Solo", "Couple", "Family", "Group"] as TravelerType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTravelerType(type)}
                      className={`p-5 rounded-xl border transition-colors duration-200 text-left flex flex-col gap-3 ${
                        travelerType === type
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 hover:border-white/25 text-white/70"
                      }`}
                    >
                      <Users className="w-7 h-7" />
                      <span className="font-semibold text-lg">{type}</span>
                    </button>
                  ))}
                </div>
                <button disabled={!travelerType} onClick={handleNext} className="mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors duration-200 flex items-center gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">What calls to you?</h3>
                <div className="flex flex-wrap gap-3">
                  {(["Nature", "Tea", "Wildlife", "Trains", "Photography"] as Interest[]).map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-5 py-2.5 rounded-full border transition-colors duration-200 flex items-center gap-2 ${
                        interests.includes(interest)
                          ? "border-emerald-500 bg-emerald-500 text-black font-medium"
                          : "border-white/20 text-white/80 hover:border-white/40"
                      }`}
                    >
                      {interests.includes(interest) && <CheckCircle2 size={16} />}
                      {interest}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-emerald-400 transition-colors duration-200 flex items-center gap-2">
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">How long is your journey?</h3>
                <div className="py-6">
                  <input
                    type="range" min="1" max="10" value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="mt-6 flex justify-center items-end gap-2 text-emerald-400">
                    <span className="text-5xl md:text-6xl font-display font-bold">{duration}</span>
                    <span className="text-xl mb-1">Days</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white/70 rounded-full hover:border-white/40 transition-colors duration-200">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-emerald-400 transition-colors duration-200 flex items-center gap-2">
                    View Journey <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Your Custom Journey</h3>
                <p className="text-lg text-white/60 font-serif italic">
                  A {duration}-day {travelerType?.toLowerCase()} adventure focusing on {interests.length ? interests.join(", ") : "everything the Nilgiris offers"}.
                </p>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 inline-block text-left">
                  <h4 className="text-emerald-400 font-semibold uppercase tracking-widest text-xs mb-1">Recommended</h4>
                  <p className="text-xl font-display text-white">The Signature Explorer</p>
                </div>
                <br />
                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-10 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-colors duration-200 text-lg"
                >
                  Plan on WhatsApp →
                </a>
                <p className="text-white/40 text-sm mt-3">Or call: +91 95852 19509</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
