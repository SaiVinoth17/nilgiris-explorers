"use client";
import { useEffect } from "react";

import Image from "next/image";
import { X, Star, MapPin, Clock, CalendarDays, CheckCircle2, ArrowRight, Users, Camera } from "lucide-react";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name?: string;
    tagline?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    bestTime?: string;
    idealDuration?: string;
    locationCategory?: string;
    description?: string;
    highlights?: string[];
    travelerTips?: string[];
    photographyGuide?: string;
    includedExperiences?: string[];
    [key: string]: unknown;
  } | null;
}

export default function DestinationModal({ isOpen, onClose, destination }: DestinationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A100D] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Banner Image */}
        <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
          <Image
            src={destination.image || "/images/dest_ooty_lake.jpg"}
            alt={destination.name || "Destination"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {destination.locationCategory || "Nilgiris"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
              {destination.name}
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-medium">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs text-white/50">Rating</div>
                <div className="text-sm font-bold text-white">{destination.rating || 4.9} ({destination.reviewCount || 120}+)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-white/50">Best Time</div>
                <div className="text-sm font-bold text-white">{destination.bestTime || "Oct - May"}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-white/50">Ideal Duration</div>
                <div className="text-sm font-bold text-white">{destination.idealDuration || "3-4 Hours"}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-white/50">Perfect For</div>
                <div className="text-sm font-bold text-white">Families & Couples</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">About {destination.name}</h3>
            <p className="text-white/70 leading-relaxed text-base">
              {destination.description}
            </p>
          </div>

          {/* Highlights & Features */}
          {destination.highlights && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photography Guide if available */}
          {destination.photographyGuide && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-300 font-bold mb-2">
                <Camera className="w-5 h-5" /> Photography & Sunset Spots
              </div>
              <p className="text-white/70 leading-relaxed">
                {destination.photographyGuide}
              </p>
            </div>
          )}

          {destination.includedExperiences && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What&apos;s Included</h3>
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

        {/* Modal Footer CTA */}
        <div className="p-6 bg-black/40 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-white/50">Ready to explore?</div>
            <div className="text-white font-bold text-lg">Book private cab or custom tour package</div>
          </div>
          <a
            href={`/booking?dest=${destination.slug}`}
            className="w-full sm:w-auto btn-primary px-6 py-3 text-sm flex items-center justify-center gap-2"
          >
            Plan Trip to {destination.name} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
