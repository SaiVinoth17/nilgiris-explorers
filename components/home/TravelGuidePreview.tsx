"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const guides = [
  {
    title: "Best Places To Visit In Ooty For A Perfect 2-Day Trip",
    excerpt: "Planning a quick weekend getaway? Discover the ultimate 2-day Ooty itinerary covering the Botanical Garden, Doddabetta Peak, and serene lakes.",
    image: "/images/dest_ooty_lake.jpg",
    date: "Dec 10, 2025",
    readTime: "5 min read",
    link: "/destinations",
  },
  {
    title: "Ooty Honeymoon Guide: Romantic Spots & Experiences",
    excerpt: "From cozy cottages to breathtaking sunset viewpoints in Coonoor, explore the most romantic experiences for couples in the Nilgiris.",
    image: "/images/gallery_sunset_hills.jpg",
    date: "Jan 15, 2026",
    readTime: "7 min read",
    link: "/tours",
  },
  {
    title: "Hidden Gems In The Nilgiris You Shouldn't Miss",
    excerpt: "Escape the crowds and discover offbeat destinations like Avalanche Lake, Emerald Valley, and quiet tea estate trails known only to locals.",
    image: "/images/dest_tea_estate.jpg",
    date: "Feb 02, 2026",
    readTime: "6 min read",
    link: "/destinations",
  },
];

export default function TravelGuidePreview() {
  return (
    <section className="section-pad section-deep border-t border-[#00D26A]/10">
      <div className="container-default">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-label mb-3">Travel Blog & Guides</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Nilgiris <span className="gradient-text">Travel Guides</span>
            </h2>
            <p className="text-white/60 text-lg">
              Get insider tips, detailed itineraries, and expert recommendations for your upcoming trip to Ooty.
            </p>
          </div>
          <Link href="/destinations" className="btn-secondary hidden md:flex shrink-0">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group card-hover flex flex-col h-full"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-[#0B1D17]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" style={{ color: '#00D26A' }} />
                  <span className="text-xs font-semibold text-white/80">{guide.date}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-[#00D26A] uppercase tracking-wider mb-3">
                  {guide.readTime}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00D26A] transition-colors">
                  <Link href={guide.link} className="after:absolute after:inset-0">
                    {guide.title}
                  </Link>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {guide.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 text-[#00D26A] font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/destinations" className="btn-secondary w-full justify-center">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
