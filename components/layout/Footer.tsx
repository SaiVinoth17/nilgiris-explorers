"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Local Sightseeing", href: "/destinations" },
    { label: "Tour Packages", href: "/tours" },
    { label: "Airport Transfer", href: "/#booking" },
    { label: "Railway Station Pickup", href: "/#booking" },
    { label: "Corporate Travel", href: "/#booking" },
    { label: "Honeymoon Packages", href: "/tours" },
    { label: "Group Tours", href: "/tours" },
    { label: "Outstation Taxi", href: "/#booking" },
  ],
  destinations: [
    { label: "Ooty", href: "/destinations" },
    { label: "Coonoor", href: "/destinations" },
    { label: "Doddabetta Peak", href: "/destinations" },
    { label: "Pykara Lake", href: "/destinations" },
    { label: "Avalanche Lake", href: "/destinations" },
    { label: "Mudumalai Reserve", href: "/destinations" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const socialLinks = [
  {
    href: "#",
    label: "Instagram",
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />,
  },
  {
    href: "#",
    label: "Facebook",
    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    href: "#",
    label: "YouTube",
    svg: <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />,
  },
  {
    href: "#",
    label: "WhatsApp",
    svg: (
      <>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.532 5.858L.057 23.57a.5.5 0 0 0 .612.612l5.712-1.475A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.687-.516-5.222-1.414l-.374-.217-3.892 1.005 1.005-3.892-.217-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#071410", borderTop: "1px solid rgba(0,210,106,0.10)" }}>
      {/* Main Footer */}
      <div className="container-default py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 bg-white/95 p-3 rounded-xl shadow-lg inline-block w-max">
              <Image
                src="/images/horizontal-logo-v3.png"
                alt="Nilgiris Explorers"
                width={200}
                height={80}
                className="w-auto h-12"
              />
            </Link>

            {/* Tagline */}
            <p className="text-[#00D26A] text-xs font-semibold tracking-[0.14em] uppercase mb-3">
              — Explore Beyond The Mist
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Ooty's most trusted travel agency — crafting unforgettable tour experiences
              across the Nilgiris mountains since 2018.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+919585219509" className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                     style={{ background: "rgba(0,210,106,0.10)" }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: "#00D26A" }} />
                </div>
                +91 95852 19509
              </a>
              <a href="mailto:nilgiriexplorersootytourstrave@gmail.com" className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                     style={{ background: "rgba(0,210,106,0.10)" }}>
                  <Mail className="w-3.5 h-3.5" style={{ color: "#00D26A" }} />
                </div>
                nilgiriexplorersootytourstrave@gmail.com
              </a>
              <div className="flex items-start gap-3 text-white/55 text-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: "rgba(0,210,106,0.10)" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#00D26A" }} />
                </div>
                <span>Commercial Road, Ooty (Udhagamandalam),<br />Nilgiris - 643001, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mt-6">
              {socialLinks.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(0,210,106,0.07)",
                    border: "1px solid rgba(0,210,106,0.15)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#00D26A";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,210,106,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,210,106,0.07)";
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">{svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/45 hover:text-[#00D26A] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Destinations
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/45 hover:text-[#00D26A] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/45 hover:text-[#00D26A] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919585219509?text=Hello%20Nilgiris%20Explorers%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(37,211,102,0.10)",
                border: "1px solid rgba(37,211,102,0.25)",
                color: "#25d366",
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.532 5.858L.057 23.57a.5.5 0 0 0 .612.612l5.712-1.475A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.687-.516-5.222-1.414l-.374-.217-3.892 1.005 1.005-3.892-.217-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Brand Values Bar */}
      <div style={{ borderTop: "1px solid rgba(0,210,106,0.08)", background: "rgba(0,0,0,0.2)" }}>
        <div className="container-default py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {["Nature First", "Authentic Experiences", "Premium Comfort", "Local Expertise", "Responsible Travel"].map((val) => (
              <span key={val} className="text-xs text-white/30 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#00D26A] inline-block" />
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-default py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2026 Nilgiris Explorers Tours & Travels. All rights reserved.
          </p>
          <a href="https://wa.me/917604904217" target="_blank" rel="noopener noreferrer" className="text-white/25 text-xs transition-all duration-300 group">
            <span className="group-hover:text-white/50 transition-colors">Designed & Developed by </span>
            <span className="text-amber-400 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all duration-300 font-medium">Sai Vinoth</span>
          </a>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/20">Trusted by</span>
            <span className="text-xs font-semibold" style={{ color: "#00D26A" }}>10,000+ travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
