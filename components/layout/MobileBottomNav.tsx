"use client";
import { PhoneCall, MessageCircle, Map } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false); // scrolling down
          } else {
            setIsVisible(true);  // scrolling up
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-[70] md:hidden transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#0B1D17]/95 border-t border-white/10 px-2 py-2 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <a 
          href="tel:+917604904217"
          className="flex flex-col items-center justify-center w-full py-1.5 text-white/80 hover:text-white"
        >
          <div className="bg-blue-500/20 p-2 rounded-full mb-1">
            <PhoneCall className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-[10px] font-medium">Call Now</span>
        </a>
        
        <div className="w-px h-10 bg-white/10 mx-1"></div>

        <a 
          href="https://wa.me/917604904217?text=Hello%20Nilgiris%20Explorers,%20I%20would%20like%20to%20plan%20a%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full py-1.5 text-white/80 hover:text-white relative"
        >
          <div className="bg-[#25D366] p-2.5 rounded-full mb-1 shadow-lg shadow-[#25D366]/30 absolute -top-6 border-4 border-[#0B1D17]">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-medium mt-6 text-[#25D366]">WhatsApp</span>
        </a>

        <div className="w-px h-10 bg-white/10 mx-1"></div>

        <Link 
          href="/tours"
          className="flex flex-col items-center justify-center w-full py-1.5 text-white/80 hover:text-white"
        >
          <div className="bg-amber-500/20 p-2 rounded-full mb-1">
            <Map className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-[10px] font-medium">Packages</span>
        </Link>
      </div>
    </div>
  );
}
