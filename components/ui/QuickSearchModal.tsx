"use client";

import { useState, useEffect } from "react";
import { Search, X, MapPin, Package, ArrowRight, Sparkles } from "lucide-react";
import { destinations } from "@/lib/data/destinations";
import { tourPackages } from "@/lib/data/packages";
import Link from "next/link";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredPackages = tourPackages.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative w-full max-w-2xl bg-[#091410] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-black/40">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search destinations, cabs, packages (e.g. Ooty Lake, Pykara, Safari)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none text-base font-medium"
          />
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="p-4 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Destinations */}
          {filteredDestinations.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Destinations ({filteredDestinations.length})
              </div>
              <div className="space-y-2">
                {filteredDestinations.map(d => (
                  <Link
                    key={d.id}
                    href={`/destinations/${d.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{d.name}</div>
                      <div className="text-xs text-white/50 line-clamp-1">{d.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tour Packages */}
          {filteredPackages.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Tour Packages ({filteredPackages.length})
              </div>
              <div className="space-y-2">
                {filteredPackages.map(p => (
                  <Link
                    key={p.id}
                    href={`/packages/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{p.name}</div>
                      <div className="text-xs text-white/50 line-clamp-1">₹{p.price.toLocaleString()} · {p.duration}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredDestinations.length === 0 && filteredPackages.length === 0 && (
            <div className="text-center py-10">
              <Sparkles className="w-8 h-8 text-white/20 mx-auto mb-2" />
              <div className="text-white/60 font-medium text-sm">No exact matches found for &quot;{query}&quot;</div>
              <div className="text-white/40 text-xs mt-1">Try searching for &quot;Ooty&quot;, &quot;Pykara&quot;, &quot;Safari&quot;, or &quot;Coonoor&quot;</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/60 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">Esc</kbd> to close</span>
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">Cmd + K</kbd> anywhere</span>
        </div>
      </div>
    </div>
  );
}
