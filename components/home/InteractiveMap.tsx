"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Info, Car } from "lucide-react";
import Link from "next/link";

const locations = [
  { id: 1, name: "Ooty Lake", x: 48, y: 51, type: "attraction", desc: "Scenic lake offering boating.", price: "₹1,800 Cab" },
  { id: 2, name: "Doddabetta Peak", x: 58, y: 52, type: "attraction", desc: "Highest peak in the Nilgiris.", price: "₹2,000 Cab" },
  { id: 3, name: "Pykara Falls", x: 29, y: 42, type: "attraction", desc: "Beautiful waterfalls and boat house.", price: "₹2,500 Cab" },
  { id: 4, name: "Coonoor", x: 70, y: 65, type: "town", desc: "Tea gardens and the toy train.", price: "₹2,200 Cab" },
  { id: 5, name: "Mudumalai", x: 19, y: 16, type: "safari", desc: "Wildlife sanctuary and tiger reserve.", price: "₹3,000 Cab" },
];

export default function InteractiveMap() {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <section className="section-pad relative overflow-hidden" id="map" style={{ background: '#0B1D17' }}>
      <div className="container-default relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Navigation className="w-4 h-4" style={{ color: '#00D26A' }} />
            <span className="text-sm font-semibold tracking-wide text-white/80">Explore The Nilgiris</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Interactive <span className="gradient-text">Sightseeing Map</span>
          </h2>
          <p className="text-white/55 text-lg">
            Discover the most beautiful spots in the Nilgiris. Click on a destination to explore cab rates and book your ride instantly.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full max-w-5xl mx-auto h-[500px] lg:h-[600px] rounded-3xl overflow-hidden glass-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Satellite Google Map Background */}
          <iframe 
            src="https://maps.google.com/maps?q=Ooty,+Tamil+Nadu&t=k&z=11&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Subtle overlay to ensure custom brand markers remain clearly visible over the complex satellite imagery */}
          <div className="absolute inset-0 bg-[#0B1D17]/40 z-10 pointer-events-none" />

          {/* Map Pins */}
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute group z-20"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActivePin(activePin === loc.id ? null : loc.id)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                  activePin === loc.id 
                    ? 'text-white' 
                    : 'text-white hover:text-white'
                }`}
                style={{ background: activePin === loc.id ? '#00D26A' : 'rgba(15,40,32,0.9)', border: '2px solid #00D26A' }}
              >
                <MapPin className="w-5 h-5" />
                
                {/* Ping animation */}
                <div className={`absolute inset-0 rounded-full border-2 border-[#00D26A] -z-10 ${activePin === loc.id ? 'animate-ping' : ''}`} />
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {activePin === loc.id && (
                  <motion.div
                    /* removed initial */
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 w-64 p-4 rounded-2xl shadow-2xl backdrop-blur-sm"
                    style={{ background: '#16332a', border: '1px solid rgba(0,210,106,0.20)' }}
                  >
                    <h4 className="text-lg font-bold text-gray-900 text-white mb-1">{loc.name}</h4>
                    <p className="text-sm text-white/55 mb-3">{loc.desc}</p>
                    
                    <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,210,106,0.15)' }}>
                      <div className="flex items-center gap-1.5 text-[#00D26A] font-semibold text-sm">
                        <Car className="w-4 h-4" />
                        {loc.price}
                      </div>
                      <Link
                        href={`https://wa.me/917604904217?text=Hi,%20I%20want%20to%20book%20a%20cab%20for%20${loc.name}%20sightseeing`}
                        target="_blank"
                        className="text-xs bg-[#00D26A] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#00A855] transition-colors"
                      >
                        Book
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
