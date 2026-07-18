"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Experiences",
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
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileOpen]);

  const handleWhatsApp = () => {
    const text = "Hello! I would like to plan a luxury trip to the Nilgiris.";
    window.open(`https://wa.me/919585219509?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-forest/85 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6"
        }`}
      >
        <div className="container-default flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 touch-feedback relative z-50">
            <div className={`relative px-4 py-2 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white/95 shadow-[0_4px_20px_rgba(255,255,255,0.1)] scale-95' : 'bg-transparent hover:scale-105'}`}>
              <Image
                src="/images/horizontal-logo-v3.png"
                alt="Nilgiris Explorers"
                width={170}
                height={56}
                className="h-auto w-auto max-h-[44px] object-contain transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium tracking-wide transition-all duration-300 font-body relative ${
                      isActive ? 'text-[var(--color-brand-emerald)]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === link.label ? "rotate-180 text-[var(--color-brand-emerald)]" : "opacity-60"
                        }`}
                      />
                    )}
                    {/* Animated Underline */}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-brand-emerald)] transform origin-left transition-transform duration-300 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 rounded-2xl py-3 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[var(--color-brand-emerald)]/20 transition-all duration-300 ease-out origin-top glass-card ${
                        openDropdown === link.label ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-4 invisible"
                      }`}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-forest border-t border-l border-[var(--color-brand-emerald)]/20 rotate-45" />
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-6 py-3 text-sm text-white/70 hover:text-[var(--color-brand-emerald)] font-body hover:bg-[var(--color-brand-emerald)]/10 transition-colors relative z-10"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+919585219509"
              className="flex items-center gap-2 text-[15px] font-medium font-body text-white/80 hover:text-[var(--color-brand-emerald)] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-brand-emerald)]/20 transition-colors">
                <Phone className="w-4 h-4 text-[var(--color-brand-emerald)]" />
              </div>
              <span>+91 95852 19509</span>
            </a>
            <button 
              onClick={handleWhatsApp}
              className="btn-primary"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 p-3 rounded-xl transition-colors text-white hover:bg-white/10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
              <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-80 flex flex-col pt-28 pb-8 px-6 lg:hidden border-l border-[var(--color-brand-emerald)]/20 bg-gradient-to-b from-forest to-void transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <div 
                key={link.label}
                className="transform transition-all duration-500 font-body"
                style={{ 
                  transitionDelay: mobileOpen ? `${100 + (i * 50)}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 px-5 rounded-2xl text-[17px] font-medium transition-all ${
                    isActive 
                      ? 'text-[var(--color-brand-emerald)] bg-[var(--color-brand-emerald)]/10 shadow-[inset_0_0_20px_rgba(0,210,106,0.05)]' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-6 pr-4 mt-2 mb-4 border-l border-white/10 space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 px-4 rounded-xl text-[15px] font-body text-white/50 hover:text-[var(--color-brand-emerald)] hover:bg-[var(--color-brand-emerald)]/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={`mt-8 space-y-4 pt-8 border-t border-white/10 transform transition-all duration-700 ${mobileOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}`}>
          <a
            href="tel:+919585219509"
            className="flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-medium font-body text-white/80 hover:text-[var(--color-brand-emerald)] bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5 text-[var(--color-brand-emerald)]" />
            +91 95852 19509
          </a>
          <button
            onClick={() => { setMobileOpen(false); handleWhatsApp(); }}
            className="btn-primary w-full"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </button>
        </div>
      </div>
    </>
  );
}
