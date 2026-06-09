"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShieldCheck, Map, PhoneCall, Award, ThumbsUp } from "lucide-react";
import Link from "next/link";

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
    text: "Very professional and safe. As a family of four, we felt completely secure during the steep ghat road drives. Highly recommend!",
    avatar: "P"
  },
  {
    name: "Arun & Sneha",
    date: "2 months ago",
    text: "They planned our entire honeymoon itinerary in Ooty & Coonoor. The local expertise really shows. No hidden charges either.",
    avatar: "A"
  }
];

export default function TrustSection() {
  return (
    <section className="section-pad section-forest relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-default relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            Why Book With Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Your Trusted Local <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We are a 100% owner-operated local business. No middlemen, no hidden fees, just authentic Nilgiris hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Guarantees */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">No Hidden Fees</h3>
                <p className="text-white/60 text-sm leading-relaxed">The price we quote is the price you pay. Tolls, parking, and driver bata are clearly communicated upfront.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Map className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Native Drivers</h3>
                <p className="text-white/60 text-sm leading-relaxed">Our drivers are born and raised in the Nilgiris. They navigate ghat roads safely and know the best local spots.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Owner Operated</h3>
                <p className="text-white/60 text-sm leading-relaxed">You deal directly with the business owner via WhatsApp for bookings, support, and customizations.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Top Rated</h3>
                <p className="text-white/60 text-sm leading-relaxed">Consistently rated 5-stars by hundreds of families and honeymoon couples on Google.</p>
              </div>
            </motion.div>
          </div>

          {/* Owner Contact Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#0B1D17] to-emerald-950 p-8 rounded-3xl border border-emerald-500/30 flex flex-col items-center text-center shadow-2xl shadow-emerald-500/10"
          >
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 mb-4 overflow-hidden bg-white relative">
              <Image 
                src="/images/support-agent.png" 
                alt="Business Owner" 
                fill 
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-1">Need Help Planning?</h3>
            <p className="text-white/60 text-sm mb-6">Chat directly with the business owner</p>
            
            <a 
              href="https://wa.me/919585219509?text=Hello,%20I%20need%20help%20planning%20a%20trip%20to%20the%20Nilgiris."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center justify-center gap-2 transition-colors mb-3"
            >
              <PhoneCall className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <p className="text-emerald-400 text-xs font-medium">Instantly replies usually within 5 mins</p>
          </motion.div>
        </div>

        {/* Google Reviews Style Section */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Google Reviews</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold">5.0</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-white/50 text-sm">(120+ Reviews)</span>
                </div>
              </div>
            </div>
            <a href="#" className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
              Write a Review →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{review.name}</div>
                    <div className="text-white/40 text-xs">{review.date}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
