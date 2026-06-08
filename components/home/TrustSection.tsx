"use client";
import { motion } from "framer-motion";
import { Users, Map, Star, Clock, ShieldCheck, Banknote } from "lucide-react";

const trustMetrics = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Map, value: "5,000+", label: "Tours Completed" },
  { icon: Star, value: "4.9/5", label: "Customer Satisfaction" },
  { icon: Clock, value: "24/7", label: "Customer Support" },
  { icon: ShieldCheck, value: "100%", label: "Local Expert Drivers" },
  { icon: Banknote, value: "Zero", label: "Hidden Charges" },
];

export default function TrustSection() {
  return (
    <section className="section-pad section-forest border-y border-[#00D26A]/10">
      <div className="container-default">
        <div className="text-center mb-12">
          <span className="section-label mb-3">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            The Most Trusted Travel Partner in <span className="gradient-text">The Nilgiris</span>
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto">
            Experience the difference with Ooty's premier cab and tour booking service. We prioritize your comfort, safety, and satisfaction above all else.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {trustMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center card-hover flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(0, 210, 106, 0.15)' }}>
                <metric.icon className="w-6 h-6" style={{ color: '#00D26A' }} />
              </div>
              <div className="font-display text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-white/50">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
