"use client";
import { useState } from "react";

import { Calendar, MapPin, Users, Clock, ArrowRight, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const daysOptions = ["1 Day", "2 Days", "3 Days", "4+ Days"];
const travelerOptions = ["1-2", "3-5", "6-10", "10+"];
const destinationOptions = [
  "Ooty Local",
  "Coonoor",
  "Pykara",
  "Avalanche",
  "Mudumalai",
];

export default function TripPlannerWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    days: "",
    travelers: "",
    destinations: [] as string[],
    date: "",
  });

  const toggleDestination = (dest: string) => {
    if (formData.destinations.includes(dest)) {
      setFormData({
        ...formData,
        destinations: formData.destinations.filter((d) => d !== dest),
      });
    } else {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, dest],
      });
    }
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const buildWhatsAppMessage = () => {
    const text = `Hello Nilgiris Explorers,\n\nI used your Trip Planner and would like to get a quote:\n\nDuration: ${formData.days}\nTravelers: ${formData.travelers}\nDestinations: ${formData.destinations.join(", ")}\nTravel Date: ${formData.date}\n\nPlease share availability and pricing details.`;
    return encodeURIComponent(text);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-3xl mx-auto glass-card rounded-3xl p-6 md:p-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Progress Bar */}
      <div className="mb-8 relative z-10">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-emerald-400">Step {step} of 5</span>
          <span className="text-sm font-medium text-white/50">
            {step === 1 && "Duration"}
            {step === 2 && "Travelers"}
            {step === 3 && "Destinations"}
            {step === 4 && "Dates"}
            {step === 5 && "Complete"}
          </span>
        </div>
        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full"
            /* removed initial */
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[300px] relative z-10">
        <>
          {step === 1 && (
            <div
              key="step1"
              /* removed initial */
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
                How many days are you planning?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {daysOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFormData({ ...formData, days: opt });
                      setTimeout(handleNext, 300);
                    }}
                    className={`p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                      formData.days === opt
                        ? "bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(0,210,106,0.2)]"
                        : "glass border-white/10 hover:border-emerald-500/50 hover:bg-white/5"
                    }`}
                  >
                    <Clock className={`w-8 h-8 ${formData.days === opt ? "text-emerald-400" : "text-white/60"}`} />
                    <span className={`font-semibold ${formData.days === opt ? "text-emerald-100" : "text-white/80"}`}>
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              key="step2"
              /* removed initial */
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
                How many people are traveling?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {travelerOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFormData({ ...formData, travelers: opt });
                      setTimeout(handleNext, 300);
                    }}
                    className={`p-4 md:p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                      formData.travelers === opt
                        ? "bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(0,210,106,0.2)]"
                        : "glass border-white/10 hover:border-emerald-500/50 hover:bg-white/5"
                    }`}
                  >
                    <Users className={`w-8 h-8 ${formData.travelers === opt ? "text-emerald-400" : "text-white/60"}`} />
                    <span className={`font-semibold ${formData.travelers === opt ? "text-emerald-100" : "text-white/80"}`}>
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              key="step3"
              /* removed initial */
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Where do you want to go?
              </h3>
              <p className="text-white/50 mb-6 text-sm">Select one or more destinations.</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {destinationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleDestination(opt)}
                    className={`px-5 py-3 rounded-full border flex items-center gap-2 transition-all ${
                      formData.destinations.includes(opt)
                        ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,210,106,0.4)]"
                        : "glass border-white/10 hover:border-emerald-500/50 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium text-sm">{opt}</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={formData.destinations.length === 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div
              key="step4"
              /* removed initial */
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
                When are you arriving?
              </h3>
              <div className="max-w-md mx-auto w-full relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-2xl px-12 py-4 text-white text-lg focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="mt-auto flex justify-end pt-12">
                <button
                  onClick={handleNext}
                  disabled={!formData.date}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Recommendation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div
              key="step5"
              /* removed initial */
              className="flex flex-col items-center text-center h-full py-6"
            >
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-3">
                Your Custom Itinerary is Ready!
              </h3>
              <p className="text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
                Based on your selections ({formData.days}, {formData.travelers} travelers, heading to {formData.destinations.join(", ")}), we have the perfect local owner-operated experience for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a
                  href={`https://wa.me/919585219509?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00D26A] hover:bg-[#00A855] text-black font-semibold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(0,210,106,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Get Details on WhatsApp
                </a>
              </div>
              <p className="text-white/40 text-xs mt-6 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Owner responds instantly
              </p>
            </div>
          )}
        </>
      </div>

      {/* Back button */}
      {step > 1 && step < 5 && (
        <button
          onClick={handleBack}
          className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white/50 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
    </div>
  );
}
