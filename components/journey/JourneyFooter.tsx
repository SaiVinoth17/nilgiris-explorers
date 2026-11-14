"use client";

import Link from "next/link";
import Image from "next/image";

const CONTACT = {
  phone: "+91 95852 19509",
  email: "nilgirisexplorers@gmail.com",
  address: "Ooty, The Nilgiris, Tamil Nadu",
};

export default function JourneyFooter() {
  return (
    <footer className="bg-void relative pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Mountain horizon SVG */}
      <div className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-20 text-emerald-900">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
          <path 
            d="M0,120 L0,60 Q120,40 240,70 T480,40 T720,80 T960,30 T1200,60 T1440,20 L1440,120 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container-default relative z-10">
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
                    className="text-white/50 hover:text-[var(--color-brand-emerald)] transition-colors"
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
                <a href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[var(--color-brand-emerald)] transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--color-brand-emerald)] transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 pb-20 md:pb-0 text-center lg:text-left">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Nilgiris Explorers. All rights reserved.
          </p>

          <p className="text-white/40 text-xs sm:text-sm tracking-wide">
            <span>Designed &amp; Developed by </span>
            <a
              href="https://www.linkedin.com/in/saivinoth17/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-white/50 font-medium tracking-wide opacity-90 transition-opacity duration-300 ease-out hover:opacity-100 hover:text-white/80 focus-visible:outline-none focus-visible:opacity-100 focus-visible:text-white/80 focus-visible:ring-1 focus-visible:ring-[var(--color-brand-emerald)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-forest rounded-sm after:content-[''] after:absolute after:left-0 after:-bottom-px after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
            >
              Sai Vinoth
            </a>
            <span> · </span>
            <a
              href="https://www.aevionstudio.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-white/50 font-medium tracking-wide opacity-90 transition-all duration-300 ease-out hover:opacity-100 hover:text-[var(--color-brand-emerald)] focus-visible:outline-none focus-visible:opacity-100 focus-visible:text-[var(--color-brand-emerald)] focus-visible:ring-1 focus-visible:ring-[var(--color-brand-emerald)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-forest rounded-sm after:content-[''] after:absolute after:left-0 after:-bottom-px after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-brand-emerald)] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
            >
              Aevion Studios
            </a>
            <span>. All Rights Reserved.</span>
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

