"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Adventures" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Connect" },
];

export default function CinematicNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > window.innerHeight * 0.5);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto px-6 md:px-10 py-3">
          <div
            className="flex items-center justify-between rounded-full px-6 py-2.5 backdrop-blur-xl"
            style={{ backgroundColor: "rgba(5, 10, 8, 0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Link href="/" className="flex-shrink-0">
              <Image src="/images/horizontal-logo-v3.png" alt="Nilgiris Explorers" width={140} height={36} className="h-8 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="https://wa.me/919585219509?text=Hi!%20I%27d%20like%20to%20plan%20my%20Nilgiris%20journey."
                target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                Plan Journey
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex items-center justify-center w-10 h-10 text-white/80" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[55] md:hidden flex flex-col items-center justify-center gap-8 px-8" style={{ backgroundColor: "rgba(3, 8, 6, 0.97)" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif font-bold text-white/80 hover:text-emerald-400 transition-colors duration-200">
              {link.label}
            </Link>
          ))}
          <Link
            href="https://wa.me/919585219509?text=Hi!%20I%27d%20like%20to%20plan%20my%20Nilgiris%20journey."
            target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}
            className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-lg px-8 py-3.5 rounded-full transition-colors duration-200"
          >
            Plan Journey
          </Link>
          <a href="tel:+919585219509" className="flex items-center gap-2 text-white/50 text-sm">
            <Phone size={14} /> +91 95852 19509
          </a>
        </div>
      )}
    </>
  );
}
