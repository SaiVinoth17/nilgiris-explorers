"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Star, MapPin, Clock, CalendarDays, CheckCircle2, Navigation, ArrowRight } from "lucide-react";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: any;
}

export default function DestinationModal({ isOpen, onClose, destination }: DestinationModalProps) {
  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-4xl max-h-[90vh] bg-forest border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            >
              {/* Header Image Area */}
              <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
                
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title & Badges */}
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      {destination.tag}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {destination.rating} ({destination.reviews})
                    </div>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                    {destination.name}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                
                {/* Quick Info Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">Duration</div>
                      <div className="text-sm font-medium text-white">{destination.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">Distance</div>
                      <div className="text-sm font-medium text-white">{destination.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">Best Time</div>
                      <div className="text-sm font-medium text-white truncate" title={destination.bestTime}>{destination.bestTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">Places Covered</div>
                      <div className="text-sm font-medium text-white truncate" title={destination.placesCovered}>{destination.placesCovered}</div>
                    </div>
                  </div>
                </div>

                {/* Description & Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">About {destination.name}</h3>
                      <p className="text-white/70 leading-relaxed">
                        {destination.description}
                      </p>
                    </div>

                    {destination.includedExperiences && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {destination.includedExperiences.map((exp: string, i: number) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-white/80 text-sm">{exp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6 bg-white/5 rounded-2xl p-6 border border-white/5 h-fit">
                    <div>
                      <h3 className="font-bold text-white mb-4">Highlights</h3>
                      <ul className="space-y-3">
                        {destination.highlights?.map((highlight: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white/60 text-sm">
                  Ready to experience the beauty of {destination.name}?
                </p>
                <Link 
                  href={`/#booking?dest=${destination.slug}`} 
                  onClick={onClose}
                  className="btn-primary w-full sm:w-auto px-8 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                >
                  Book This Tour <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
