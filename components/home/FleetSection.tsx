"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import { fleet } from "@/lib/data";

export default function FleetSection() {
  const showcaseFleet = fleet.filter(f => ["Sedan", "SUV", "Tempo Traveller"].includes(f.name));

  return (
    <section id="fleet" className="section-pad section-forest relative overflow-hidden">
      <div className="container-default">
        {/* Header */}
        <div
          className="text-center mb-16"
        >
          <span className="inline-block section-label-text mb-3">
            Premium Vehicles
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Fleet Showcase</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Travel in comfort and safety with our meticulously maintained, AC-equipped, and GPS-tracked tourist vehicles.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseFleet.map((vehicle, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl overflow-hidden group hover:border-[#00D26A]/50 transition-colors duration-500"
            >
              {/* Image Placeholder - Replace with actual images if available */}
              <div className="relative h-56 bg-white/5 flex items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  {vehicle.icon}
                </div>
                {vehicle.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-[#00D26A] transition-colors">
                  {vehicle.name}
                </h3>
                <p className="text-white/40 text-sm mb-6">{vehicle.model}</p>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2 text-white/70">
                    <Users className="w-4 h-4 text-[#00D26A]" />
                    <span className="text-sm font-medium">{vehicle.capacity} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Briefcase className="w-4 h-4 text-[#0B9FD4]" />
                    <span className="text-sm font-medium">{vehicle.luggage}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00D26A]" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919585219509?text=${encodeURIComponent(`Hello! I'm interested in booking a ${vehicle.name} (${vehicle.model}) for my Nilgiris trip. Please share availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0a0e1a] bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] flex items-center justify-center gap-2 shadow-xl shadow-[#00D26A]/20 hover:scale-[1.02] transition-transform"
                >
                  Enquire Vehicle <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
