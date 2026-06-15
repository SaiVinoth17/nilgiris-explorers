"use client";

import Link from "next/link";
import Image from "next/image";

const CONTACT = {
  phone: "+91 95852 19509",
  email: "hello@nilgirisexplorers.com",
  address: "Ooty, The Nilgiris, Tamil Nadu",
};

export default function JourneyFooter() {
  return (
    <footer className="bg-[#050A08] relative pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Mountain horizon SVG */}
      <div className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-20 text-emerald-900">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
          <path 
            d="M0,120 L0,60 Q120,40 240,70 T480,40 T720,80 T960,30 T1200,60 T1440,20 L1440,120 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo-light.png"
                alt="Nilgiris Explorers"
                width={180}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-white/60 font-serif italic text-lg max-w-sm">
              The mountains are calling. Let us guide you through the emerald heart of South India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              {["Destinations", "Tours", "Our Story", "Contact", "FAQ"].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white/50 hover:text-emerald-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-6">Connect</h4>
            <ul className="space-y-4 text-white/50">
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-emerald-400 transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-emerald-400 transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Nilgiris Explorers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">TripAdvisor</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
