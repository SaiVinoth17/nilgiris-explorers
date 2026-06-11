"use client";

import { useState } from "react";
import { Users, Camera, Leaf, Bird, Coffee, Landmark, Car, ArrowRight, CheckCircle2, RotateCcw, MapPin } from "lucide-react";

type Step = "who" | "inspires" | "days" | "result";

export default function JourneyRecommender() {
  const [step, setStep] = useState<Step>("who");
  const [who, setWho] = useState("");
  const [inspires, setInspires] = useState<string[]>([]);
  const [days, setDays] = useState("");

  const handleInspireToggle = (item: string) => {
    if (inspires.includes(item)) {
      setInspires(inspires.filter(i => i !== item));
    } else {
      if (inspires.length < 3) {
        setInspires([...inspires, item]);
      }
    }
  };

  const getRecommendation = () => {
    // A simple logic tree to generate customized text
    let route = "";
    let highlights = [];
    let packageSuggestion = "";

    if (who === "Couple") {
      route = "Ooty (1 Night) → Coonoor (1 Night)";
      highlights = ["Sunrise at Doddabetta", "Private Tea Estate Walk", "Romantic Boat Cruise"];
      packageSuggestion = "Honeymoon Special (Luxury)";
    } else if (inspires.includes("Wildlife")) {
      route = "Ooty → Pykara → Mudumalai";
      highlights = ["Jungle Jeep Safari", "Pykara Speed Boating", "Elephant Camp Visit"];
      packageSuggestion = "Adventure & Wilderness Special";
    } else if (who === "Family") {
      route = "Ooty Local → Pykara Circuit";
      highlights = ["Botanical Garden Picnic", "Toy Train Ride", "Safe Pine Forest Walk"];
      packageSuggestion = "Friends & Family Group Package";
    } else {
      route = "Ooty → Coonoor Heritage Trail";
      highlights = ["Heritage Toy Train", "Dolphin's Nose Viewpoint", "Tea Factory Tour"];
      packageSuggestion = "Ooty & Coonoor Explorer Package";
    }

    const duration = days === "4+" ? "4 Days / 3 Nights" : `${days} Days`;
    
    return { route, highlights, packageSuggestion, duration };
  };

  const buildWhatsAppLink = () => {
    const text = `Hello Nilgiris Explorers! I used the Journey Recommender. I am a ${who} traveler planning a ${days}-day trip. I am inspired by ${inspires.join(", ")}. Please help me plan this!`;
    return `https://wa.me/919585219509?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-white/10" id="recommender">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {step !== "result" && (
        <div className="mb-8">
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2 block">
            Step {step === "who" ? "1" : step === "inspires" ? "2" : "3"} of 3
          </span>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: step === "who" ? "33%" : step === "inspires" ? "66%" : "100%" }}
            />
          </div>
        </div>
      )}

      {step === "who" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-3xl font-display font-bold text-white mb-8">Who are you traveling with?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Couple", "Family", "Friends", "Solo Traveler"].map((type) => (
              <button
                key={type}
                onClick={() => { setWho(type); setStep("inspires"); }}
                className="p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 hover:bg-white/5 transition-all text-center group"
              >
                <Users className="w-8 h-8 mx-auto mb-4 text-white/40 group-hover:text-emerald-400 transition-colors" />
                <span className="text-white font-medium">{type}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "inspires" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-3xl font-display font-bold text-white mb-2">What inspires you?</h3>
          <p className="text-white/50 mb-8">Select up to 3 interests.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { id: "Photography", icon: Camera },
              { id: "Nature", icon: Leaf },
              { id: "Wildlife", icon: Bird },
              { id: "Tea Culture", icon: Coffee },
              { id: "Heritage", icon: Landmark },
              { id: "Scenic Drives", icon: Car },
            ].map((item) => {
              const isSelected = inspires.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleInspireToggle(item.id)}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all
                    ${isSelected ? "border-emerald-500 bg-emerald-500/10 text-white" : "border-white/10 text-white/60 hover:bg-white/5"}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isSelected ? "text-emerald-400" : ""}`} />
                  <span className="font-medium">{item.id}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center">
            <button onClick={() => setStep("who")} className="text-white/50 hover:text-white transition-colors">Back</button>
            <button 
              onClick={() => setStep("days")}
              disabled={inspires.length === 0}
              className="px-6 py-3 bg-white text-black font-bold rounded-full disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === "days" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-3xl font-display font-bold text-white mb-8">How many days do you have?</h3>
          <div className="flex flex-wrap gap-4 mb-12">
            {["1", "2", "3", "4+"].map((d) => (
              <button
                key={d}
                onClick={() => { setDays(d); setStep("result"); }}
                className="w-16 h-16 rounded-full border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 text-white text-xl font-display font-bold transition-all flex items-center justify-center"
              >
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => setStep("inspires")} className="text-white/50 hover:text-white transition-colors">Back</button>
        </div>
      )}

      {step === "result" && (
        <div className="animate-in zoom-in-95 duration-700">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-display font-bold text-white mb-4">Your Nilgiris Story</h3>
            <p className="text-white/60 text-lg">Handcrafted from your inspirations.</p>
          </div>

          <div className="bg-[#0B1D17]/50 rounded-2xl p-6 md:p-8 border border-emerald-500/20 mb-8 max-w-2xl mx-auto backdrop-blur-sm">
            {(() => {
              const rec = getRecommendation();
              return (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Ideal Route</p>
                      <p className="text-white text-lg font-bold">{rec.route}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 border-b border-white/10 pb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Must-See Highlights</p>
                      <ul className="space-y-2">
                        {rec.highlights.map((h, i) => (
                          <li key={i} className="text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Car className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Suggested Package ({rec.duration})</p>
                      <p className="text-emerald-400 font-bold">{rec.packageSuggestion}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => { setStep("who"); setWho(""); setInspires([]); setDays(""); }}
              className="px-6 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
            >
              <RotateCcw className="w-4 h-4" /> Start Over
            </button>
            <a 
              href={buildWhatsAppLink()}
              target="_blank"
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Bring This Journey to Life <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
