"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Packages",
    href: "/tours",
    dropdown: [
      { label: "Ooty One Day Tour", href: "/tours" },
      { label: "Ooty & Coonoor Tour", href: "/tours" },
      { label: "Wildlife Safari", href: "/tours" },
      { label: "Honeymoon Package", href: "/tours" },
      { label: "Custom Itinerary", href: "/tours" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#071410]/85 backdrop-blur-2xl shadow-[0_4px_32px_rgba(0,0,0,0.4)] border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-default flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <div className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 backdrop-blur-md shadow-lg'}`}>
              <Image
                src="/images/horizontal-logo-v3.png"
                alt="Nilgiris Explorers"
                width={170}
                height={56}
                className="h-auto w-auto max-h-[44px] object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/6 transition-all duration-200 font-body"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {link.dropdown && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 mt-2 w-52 rounded-xl py-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-[#00D26A]/15"
                      style={{ background: "#0f2820" }}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-white/65 hover:text-white hover:bg-[#00D26A]/8 transition-colors"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919585219509"
              className="flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <Phone className="w-3.5 h-3.5 text-[#00D26A]" />
              +91 95852 19509
            </a>
            <Link href="/tours" className="btn-primary text-sm py-2.5 px-5">
              Book Your Ride
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg border border-[#00D26A]/20 text-white hover:bg-[#00D26A]/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed inset-y-0 right-0 z-50 w-72 flex flex-col pt-20 pb-8 px-5 lg:hidden border-l border-[#00D26A]/10"
              style={{ background: "#071410" }}
            >
              {/* Mobile Logo */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <Link href="/" onClick={() => setMobileOpen(false)} className="bg-white/95 px-3 py-2 rounded-xl">
                  <Image
                    src="/images/compact-logo-v3.png"
                    alt="Nilgiris Explorers"
                    width={140}
                    height={40}
                    className="h-auto w-auto object-contain"
                  />
                </Link>
              </div>

              <nav className="flex-1 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-[#00D26A]/8 transition-colors font-medium"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="ml-4 mt-1 space-y-0.5">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 px-4 rounded-lg text-sm text-white/50 hover:text-white hover:bg-[#00D26A]/6 transition-colors"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <a
                  href="tel:+919585219509"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors px-4"
                >
                  <Phone className="w-4 h-4 text-[#00D26A]" />
                  +91 95852 19509
                </a>
                <Link
                  href="/tours"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Book Your Ride
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
