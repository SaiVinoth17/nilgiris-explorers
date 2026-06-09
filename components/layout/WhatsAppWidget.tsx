"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    package: "",
    travelers: "",
    date: "",
    pickup: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message when step or open state changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 150);
    }
  }, [step, isOpen]);

  // Prevent background scrolling when popup is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const packages = [
    "🚗 Ooty Sightseeing – ₹2,000",
    "🌲 Pykara Sightseeing – ₹2,500",
    "🌄 Coonoor Sightseeing – ₹2,500",
    "✨ Ooty & Coonoor Explorer Package",
    "🗺️ Custom Tour Plan",
  ];

  const travelerOptions = ["1-2", "3-5", "6-10", "10+"];

  const handlePackageSelect = (pkg: string) => {
    setFormData({ ...formData, package: pkg });
    setStep(3);
  };

  const handleTravelerSelect = (count: string) => {
    setFormData({ ...formData, travelers: count });
    setStep(4);
  };

  const handleDateNext = () => {
    if (formData.date) setStep(5);
  };

  const handlePickupNext = () => {
    if (formData.pickup) setStep(6);
  };

  const buildMessage = () => {
    return encodeURIComponent(
      `Hello Nilgiris Explorers,\n\nI am interested in:\n\nPackage: ${formData.package}\nTravelers: ${formData.travelers}\nTravel Date: ${formData.date}\nPickup Location: ${formData.pickup}\n\nPlease share availability and pricing details.`
    );
  };

  const handleWhatsAppRedirect = () => {
    window.open(`https://wa.me/917604904217?text=${buildMessage()}`, "_blank");
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setFormData({ package: "", travelers: "", date: "", pickup: "" });
    }, 500);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Dark overlay for mobile to prevent background interaction */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[80] sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#0B1D17]/95 border border-emerald-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-2xl w-[calc(100vw-3rem)] sm:w-[380px] overflow-hidden flex flex-col mb-4 max-h-[80vh] sm:max-h-[600px]"
            >
              {/* Header */}
              <div className="bg-emerald-600/20 border-b border-emerald-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Nilgiris Explorers</h3>
                    <p className="text-emerald-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online | Replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                {/* Step 1 & 2: Welcome & Package */}
                <div className="flex flex-col gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-sm text-white/90 shadow-sm self-start max-w-[85%]">
                    👋 Welcome to Nilgiris Explorers!
                    <br />
                    How can we help you today?
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-sm text-white/90 shadow-sm self-start max-w-[85%]">
                    Which package are you interested in?
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {packages.map((pkg) => (
                      <button
                        key={pkg}
                        onClick={() => handlePackageSelect(pkg)}
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                          formData.package === pkg
                            ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20"
                            : "bg-emerald-500/10 text-emerald-100 border-emerald-500/20 hover:bg-emerald-500/20"
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Travelers */}
                {step >= 3 && (
                  <div
                    className="flex flex-col gap-3 mt-2"
                  >
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl rounded-tr-sm p-3.5 text-sm text-emerald-100 self-end max-w-[85%]">
                      {formData.package}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-sm text-white/90 self-start max-w-[85%]">
                      How many travelers?
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {travelerOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleTravelerSelect(opt)}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                            formData.travelers === opt
                              ? "bg-emerald-500 text-white border-emerald-400 shadow-lg"
                              : "bg-emerald-500/10 text-emerald-100 border-emerald-500/20 hover:bg-emerald-500/20"
                          }`}
                        >
                          <Users className="w-4 h-4" />
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Date */}
                {step >= 4 && (
                  <div
                    className="flex flex-col gap-3 mt-2"
                  >
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl rounded-tr-sm p-3.5 text-sm text-emerald-100 self-end max-w-[85%]">
                      {formData.travelers} Travelers
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-sm text-white/90 self-start max-w-[85%]">
                      Preferred travel date?
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                        <input
                          type="date"
                          min={today}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-11 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]"
                        />
                      </div>
                      <button
                        onClick={handleDateNext}
                        disabled={!formData.date}
                        className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-1"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Pickup */}
                {step >= 5 && (
                  <div
                    className="flex flex-col gap-3 mt-2"
                  >
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl rounded-tr-sm p-3.5 text-sm text-emerald-100 self-end max-w-[85%]">
                      {formData.date}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-sm text-white/90 self-start max-w-[85%]">
                      Pickup Location?
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                        <input
                          type="text"
                          placeholder="E.g. Ooty Bus Stand, Coimbatore Airport..."
                          value={formData.pickup}
                          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/30"
                        />
                      </div>
                      <button
                        onClick={handlePickupNext}
                        disabled={!formData.pickup}
                        className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-1"
                      >
                        See Summary <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 6: Summary */}
                {step >= 6 && (
                  <div
                    className="flex flex-col gap-3 mt-2 pb-4"
                  >
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl rounded-tr-sm p-3.5 text-sm text-emerald-100 self-end max-w-[85%]">
                      {formData.pickup}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-white/90 self-start w-full max-w-[90%] shadow-lg">
                      <p className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Booking Summary
                      </p>
                      <div className="space-y-2 text-white/80">
                        <p><span className="text-white/50">Package:</span> {formData.package}</p>
                        <p><span className="text-white/50">Travelers:</span> {formData.travelers}</p>
                        <p><span className="text-white/50">Date:</span> {formData.date}</p>
                        <p><span className="text-white/50">Pickup:</span> {formData.pickup}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleWhatsAppRedirect}
                      className="bg-[#25D366] hover:bg-[#20b858] text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)] mt-2"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      Continue on WhatsApp
                    </button>
                  </div>
                )}
                
                {/* Auto-scroll target */}
                <div ref={messagesEndRef} className="h-1 w-full flex-shrink-0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Booking Assistant"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-50 transition-colors duration-300 ${
            isOpen ? "bg-[#1f2937] border border-white/10" : "bg-[#25d366] group"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              {/* Pulse ring for WhatsApp mode */}
              <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 animate-ping" />
              <svg className="w-7 h-7 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.532 5.858L.057 23.57a.5.5 0 0 0 .612.612l5.712-1.475A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.687-.516-5.222-1.414l-.374-.217-3.892 1.005 1.005-3.892-.217-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <span className="absolute right-16 bg-[#0B1D17] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-white/10 pointer-events-none">
                Book a Cab
              </span>
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
