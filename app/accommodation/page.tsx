"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Home, Star, Users, CheckCircle2, ArrowRight, Shield, Coffee, Flame, Car, HelpCircle, Calendar, MessageSquare, Sparkles
} from "lucide-react";
import { accommodationPackages } from "@/lib/data";

const faqs = [
  {
    q: "Is campfire and BBQ available at all cottages?",
    a: "Yes! Private campfires and BBQ setups can be arranged at all our Premium Wooden Cottages and Heritage Colonial Estates. It is perfect for Ooty's chilly evenings."
  },
  {
    q: "Are the starting prices all-inclusive?",
    a: "The listed rates are the starting standard direct-to-owner prices per night. Extra taxes, room decor, and dinner packages can be customized upon request."
  },
  {
    q: "Do you offer free pickup from Ooty Bus Stand / Railway Station?",
    a: "Absolutely! For all guests booking their stays through Nilgiris Explorers, we provide complimentary transfers from Ooty central bus stand or railway station directly to the property."
  },
  {
    q: "What is your cancellation and rescheduling policy?",
    a: "We offer maximum flexibility. You can reschedule your stay free of charge up to 72 hours before check-in, subject to seasonal room availability."
  }
];

export default function AccommodationPage() {
  const [form, setForm] = useState({
    stayType: "Premium Tea Valley Cottage",
    checkin: "",
    checkout: "",
    rooms: "1",
    guests: "2",
    name: "",
    email: "",
    mobile: "",
    special: ""
  });

  const today = new Date().toISOString().split("T")[0];

  const handleWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Nilgiris Explorers! 🏔️\n\nI'd like to book Ooty Stay & Accommodations:\n👤 Name: ${form.name || "Guest"}\n📞 Contact: ${form.mobile || "TBD"}\n🏡 Stay Type: ${form.stayType}\n📅 Check-In: ${form.checkin || "TBD"}\n📅 Check-Out: ${form.checkout || "TBD"}\n🔑 Rooms Required: ${form.rooms}\n👥 Number of Guests: ${form.guests}\n💬 Special Requests: ${form.special || "None"}\n\nPlease share availability and complete quotes. Thank you!`;
    window.open(`https://wa.me/917604904217?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#00D26A]/5 to-[#0B9FD4]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-default relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="section-label">Premium Accommodations</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Misty Mountain <span className="gradient-text">Stays &amp; Cottages</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From secluded wooden tea plantation cottages to heritage British-era colonial bungalows — choose a stay crafted for luxury and comfort.
          </p>
        </motion.div>

        {/* 2-Column Showcase and Enquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Accommodations List */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00D26A]" /> Handpicked Stays
            </h2>
            {accommodationPackages.map((stay, index) => (
              <motion.div
                key={stay.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card rounded-2xl overflow-hidden card-hover grid grid-cols-1 md:grid-cols-12 gap-0"
              >
                {/* Image panel */}
                <div className="relative h-56 md:h-full md:min-h-[260px] md:col-span-5 overflow-hidden">
                  <Image
                    src={stay.image}
                    alt={stay.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#16332a] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-indigo-600 shadow-lg">
                    {stay.badge}
                  </span>
                </div>

                {/* Content Panel */}
                <div className="p-6 md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-[#00D26A] font-semibold uppercase tracking-wider">{stay.type}</span>
                      <span className="flex items-center gap-0.5 glass px-2 py-0.5 rounded-lg text-xs font-bold text-white">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {stay.rating} ({stay.reviews} reviews)
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00D26A] transition-colors mb-3">
                      {stay.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {stay.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00D26A] flex-shrink-0" />
                          <span className="text-xs text-white/60 truncate min-w-0 flex-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white/40 block">Starting direct rate</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-white">₹{stay.price.toLocaleString()}</span>
                        <span className="text-sm text-white/30 line-through">₹{stay.originalPrice.toLocaleString()}</span>
                        <span className="text-xs text-white/40 font-normal">/ night</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setForm({ ...form, stayType: stay.name })}
                      className="btn-primary text-xs py-2.5 px-5"
                    >
                      Configure Stay <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Custom Booking Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0B9FD4]" /> Stay Inquiry Form
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
              >
                <form onSubmit={handleWhatsAppEnquiry} className="space-y-4">
                  {/* Select Stay */}
                  <div>
                    <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                      Selected Accommodation
                    </label>
                    <select
                      value={form.stayType}
                      onChange={(e) => setForm({ ...form, stayType: e.target.value })}
                      className="input-field cursor-pointer"
                    >
                      {accommodationPackages.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#16332a]">{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                        Check-In
                      </label>
                      <input
                        type="date"
                        required
                        value={form.checkin}
                        min={today}
                        onChange={(e) => setForm({ ...form, checkin: e.target.value })}
                        className="input-field [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                        Check-Out
                      </label>
                      <input
                        type="date"
                        required
                        value={form.checkout}
                        min={form.checkin || today}
                        onChange={(e) => setForm({ ...form, checkout: e.target.value })}
                        className="input-field [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Guests & Rooms */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                        Rooms
                      </label>
                      <select
                        value={form.rooms}
                        onChange={(e) => setForm({ ...form, rooms: e.target.value })}
                        className="input-field cursor-pointer"
                      >
                        {["1", "2", "3", "4", "5+"].map((r) => (
                          <option key={r} value={r} className="bg-[#16332a]">{r} Room{r !== "1" && "s"}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                        Guests
                      </label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="input-field cursor-pointer"
                      >
                        {["1", "2", "3", "4", "5–6", "7–10", "10+"].map((g) => (
                          <option key={g} value={g} className="bg-[#16332a]">{g} Guests</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Personal details */}
                  <div>
                    <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter name..."
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91..."
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1.5 block">
                      Special Requirements
                    </label>
                    <textarea
                      placeholder="Extra bed, honeymoon welcome setup, vegetarian food details..."
                      rows={3}
                      value={form.special}
                      onChange={(e) => setForm({ ...form, special: e.target.value })}
                      className="input-field resize-none py-3"
                    />
                  </div>

                  {/* Action */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm font-semibold text-[#0a0e1a] bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] flex items-center justify-center gap-1.5 shadow-lg shadow-[#00D26A]/10"
                  >
                    Check Stay Availability <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Accommodation USP / Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass border border-white/5 p-6 rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] flex-shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Campfire &amp; Music</h4>
              <p className="text-xs text-white/40 leading-relaxed">Relax by custom campfire pits with music under stars. Standard at select premium cottages.</p>
            </div>
          </div>
          <div className="glass border border-white/5 p-6 rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] flex-shrink-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Organic Catering</h4>
              <p className="text-xs text-white/40 leading-relaxed">Fresh, organic tea gardens-sourced ingredients cooked in traditional Nilgiris style.</p>
            </div>
          </div>
          <div className="glass border border-white/5 p-6 rounded-2xl flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00D26A]/10 flex items-center justify-center text-[#00D26A] flex-shrink-0">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Station Transfers</h4>
              <p className="text-xs text-white/40 leading-relaxed">Enjoy smooth complimentary transfers from Ooty Railway Station or bus stands straight to properties.</p>
            </div>
          </div>
        </div>

        {/* Accommodation FAQs */}
        <div className="glass-card rounded-3xl p-8 sm:p-10">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-[#00D26A]" /> Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-white font-semibold text-base flex items-start gap-2">
                  <span className="text-[#00D26A] font-bold">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
