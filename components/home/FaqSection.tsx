"use client";
import { useState } from "react";

import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I book a cab in Ooty?",
    answer: "Booking a cab is simple. You can use our online booking widget on the homepage, call us directly, or send us a WhatsApp message at +91 95852 19509. We recommend booking at least 24 hours in advance during peak seasons.",
  },
  {
    question: "What are the charges for Ooty sightseeing?",
    answer: "Our local sightseeing packages start from ₹1,800 per day for a standard sedan (like Dzire/Etios), covering up to 100 km and 10 hours. SUV options like Innova start from ₹2,500. Fuel and driver charges are included.",
  },
  {
    question: "Do you provide airport transfers?",
    answer: "Yes, we provide reliable airport pickup and drop services from Coimbatore International Airport (CJB), Bangalore Airport (BLR), and Mysore Airport. We monitor flight timings to ensure our drivers are always on time.",
  },
  {
    question: "Do you offer customized packages?",
    answer: "Absolutely! We specialize in tailored itineraries. Whether it's a honeymoon trip, a family vacation, or a corporate retreat, our local experts will help you design the perfect Nilgiris experience.",
  },
  {
    question: "Which destinations are included?",
    answer: "Our packages cover all major Nilgiris attractions including Ooty (Botanical Garden, Boat House, Rose Garden, Doddabetta), Coonoor (Sim's Park, Dolphin's Nose), Pykara, Avalanche, and Mudumalai Wildlife Sanctuary.",
  },
  {
    question: "Are drivers local experts?",
    answer: "Yes, all our drivers are verified locals with years of experience navigating the hilly terrain of the Nilgiris. They double as informal guides, taking you to hidden gems and recommending the best local dining spots.",
  },
  {
    question: "Do you provide outstation taxi services?",
    answer: "Yes, we offer outstation taxi services from Ooty to destinations like Mysore, Bangalore, Coimbatore, Wayanad, and Kodaikanal. We provide both one-way drops and round-trip bookings.",
  },
  {
    question: "Is advance booking required?",
    answer: "While we do accept last-minute bookings subject to availability, we strongly recommend booking in advance, especially during weekends, public holidays, and the summer peak season (April-June) to secure your preferred vehicle.",
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://nilgirisexplorers.com/#faq",
    "name": "Frequently Asked Questions",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="section-pad section-forest relative">
      {/* Inject SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container-default max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <MessageCircleQuestion className="w-4 h-4" style={{ color: '#00D26A' }} />
            <span className="text-sm font-semibold tracking-wide text-white/80">Help & Support</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-white/60 text-lg">
            Find answers to common questions about booking cabs, tour packages, and sightseeing in Ooty.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-[#00D26A]/30 bg-[#16332a]' : 'border-white/5 hover:border-[#00D26A]/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display font-semibold text-white text-lg md:text-xl pr-8">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'bg-[#00D26A] text-white rotate-180' : 'bg-white/10 text-white/50'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              <>
                {openIndex === index && (
                  <div
                    /* removed initial */
                  >
                    <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 mb-4">Still have questions?</p>
          <Link href="/contact" className="btn-secondary">
            Contact Us Directly
          </Link>
        </div>
      </div>
    </section>
  );
}
