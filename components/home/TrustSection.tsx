"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShieldCheck, Map, PhoneCall, Award, ThumbsUp } from "lucide-react";

const reviews = [
  {
    name: "Ramesh Kumar",
    date: "2 weeks ago",
    text: "Outstanding service. The driver was a true local who knew all the hidden spots away from the crowds. Worth every penny.",
    avatar: "R"
  },
  {
    name: "Priya Sharma",
    date: "1 month ago",
    text: "Booked an Innova for a 3-day trip. Extremely clean vehicle and driver Sanju was courteous, punctual, and very helpful.",
    avatar: "P"
  },
  {
    name: "Anand & Family",
    date: "2 months ago",
    text: "The Pykara trip was unforgettable. Nilgiris Explorers made our vacation stress-free. Highly recommended!",
    avatar: "A"
  }
];

export default function TrustSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-[#0B1D17]">
      <div className="container-default relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D26A]/30 bg-[#00D26A]/10 text-[#00D26A] text-sm font-medium tracking-wide mb-4">
            <Star className="w-4 h-4 fill-[#00D26A]" /> Why Travelers Trust Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Born and Raised in the <span className="gradient-text">Nilgiris</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Every road, every shortcut, every hidden waterfall — our drivers grew up here. When you travel with us, you&apos;re not hiring a service. You&apos;re gaining a friend who knows these mountains like the back of their hand.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Guarantees */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="relative w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/40 blur-md animate-pulse"></div>
                <ShieldCheck className="w-6 h-6 text-emerald-400 relative z-10" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Honest by Nature</h3>
                <p className="text-white/60 text-sm leading-relaxed">In the hills, a handshake still means something. We quote one price, upfront, with everything included. No surprises on the road.</p>
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="relative w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-md animate-pulse"></div>
                <Map className="w-6 h-6 text-blue-400 relative z-10" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">They Grew Up on These Roads</h3>
                <p className="text-white/60 text-sm leading-relaxed">Our drivers didn&apos;t learn these hairpin bends from a map. They walked them as children, rode them on cycles, and now they navigate them with decades of mountain instinct.</p>
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="relative w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-purple-500/40 blur-md animate-pulse"></div>
                <ThumbsUp className="w-6 h-6 text-purple-400 relative z-10" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">One Family, One Promise</h3>
                <p className="text-white/60 text-sm leading-relaxed">There&apos;s no call centre, no middleman. When you message us, you&apos;re talking to the person who built this from the ground up — and who&apos;ll make sure your journey is perfect.</p>
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="relative w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-amber-500/40 blur-md animate-pulse"></div>
                <Award className="w-6 h-6 text-amber-400 relative z-10" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">The Stories They Tell</h3>
                <p className="text-white/60 text-sm leading-relaxed">We don&apos;t chase ratings. We chase the look on a child&apos;s face seeing a wild elephant, or the silence of a couple watching sunrise from Doddabetta.</p>
              </div>
            </div>
          </div>

          {/* Owner Highlight Card */}
          <div className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D26A]/10 rounded-full blur-[40px] pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00D26A]">
                  <Image 
                    src="/images/owner-logo.png" 
                    alt="Sanju - Owner & Mountain Guide" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Sanju</h3>
                  <p className="text-[#00D26A] text-sm">Owner & Mountain Guide</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;When you visit the Nilgiris, you aren&apos;t just taking a taxi. You&apos;re letting a local show you their home. We treat every guest like family visiting us in the hills.&rdquo;
              </p>
            </div>
            <a
              href="https://wa.me/919585219509?text=Hi%20Sanju,%20I'd%20like%20to%20plan%20a%20trip%20to%20Ooty"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center py-3 text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Speak Directly with Sanju
            </a>
          </div>
        </motion.div>

        {/* Quick Review Ticker / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-white font-bold text-xl mb-2">What Our Guests Say</h3>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-white/70 text-sm ml-2 font-medium">4.9 / 5.0 (250+ Verified Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className="glass p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-[#00D26A] font-bold text-xs flex items-center justify-center">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-white/40 text-xs">{review.date}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
