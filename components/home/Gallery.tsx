"use client";
import { useState } from "react";

import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-pad bg-[#0B1D17]">
      <div className="container-default">
        {/* Header */}
        <div
          className="text-center mb-14"
        >
          <span className="inline-block section-label-text mb-3">
            Photo Gallery
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            The Nilgiris Through <span className="gradient-text">Our Lens</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Breathtaking moments captured across tea estates, mountains, wildlife reserves, and misty valleys.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <div className={`relative ${i === 0 ? "aspect-[4/5]" : i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full glass border border-white/30 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="glass rounded-lg px-3 py-1.5">
                    <p className="text-xs font-medium text-white truncate">{img.alt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <>
        {lightbox !== null && (
          <div
            /* removed initial */
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <div
              /* removed initial */
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[85vh]">
                <Image
                  src={galleryImages[lightbox].src}
                  alt={galleryImages[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              {/* Close button */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              {/* Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                    className={`h-1.5 rounded-full transition-all ${i === lightbox ? "w-6 bg-[#00D26A]" : "w-1.5 bg-white/30"}`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
              {/* Caption */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="glass px-4 py-1.5 rounded-full text-sm text-white/80">
                  {galleryImages[lightbox].alt}
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    </section>
  );
}
