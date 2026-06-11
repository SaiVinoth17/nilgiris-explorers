"use client";

import Image from "next/image";
import { Quote, CheckCircle2, ArrowRight } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="section-pad bg-[#0B1D17] relative overflow-hidden">
      {/* Background Mist Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-default relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Column */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              {/* Note: In a real production environment, we would use an actual photo of Agustin. Using a premium placeholder nature shot for now that fits the theme */}
              <Image
                src="/images/tour_ooty.jpg"
                alt="Agustin - Founder of Nilgiris Explorers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D17] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="glass px-6 py-4 rounded-2xl backdrop-blur-md border border-white/20">
                  <h3 className="font-display text-2xl font-bold text-white mb-1">Agustin</h3>
                  <p className="text-emerald-400 font-medium text-sm">Founder, Nilgiris Explorers</p>
                </div>
              </div>
            </div>
            
            {/* Floating Experience Badge */}
            <div className="absolute top-8 -right-4 lg:-right-8 glass px-6 py-4 rounded-2xl border border-emerald-500/30 shadow-2xl animate-in slide-in-from-right-8 duration-1000 delay-300">
              <p className="text-3xl font-display font-bold text-white mb-1">10+</p>
              <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">Years Local<br/>Expertise</p>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Quote className="w-3.5 h-3.5" /> A Word From Our Founder
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                "We don't just show you the hills. We share our home."
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Growing up in the Nilgiris, I learned every hidden trail, every secret waterfall, and the true stories behind our heritage. Nilgiris Explorers was born from a simple desire: to offer travelers an authentic, premium experience away from the crowded tourist traps.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                We believe in customer-first service. When you book with us, you aren't just getting a cab or a hotel—you are getting a dedicated local friend who ensures your journey is safe, memorable, and entirely personalized to you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {[
                "100% Local Native Guides",
                "Personalized Trip Planning",
                "24/7 Priority Support",
                "Premium Fleet & Stays"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-white/80 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a 
                href="https://wa.me/919585219509?text=Hi%20Agustin!%20I%20would%20like%20your%20help%20planning%20my%20Nilgiris%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Plan Your Trip With Agustin <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
