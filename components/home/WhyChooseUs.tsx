"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation, Eye, BadgeCheck, Calendar, PhoneCall, Shield, Headphones, Sparkles, Users } from "lucide-react";
import { features } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  MapPin, Navigation, Eye, BadgeCheck, Calendar, PhoneCall, Shield, HeadphonesIcon: Headphones, Sparkles, Users,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad section-forest">
      <div className="container-default">
        {/* Header */}
        <motion.div
          /* removed initial */
          /* removed whileInView */
          /* removed viewport */
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block section-label-text mb-3">
            Why Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            The Nilgiris Explorers{" "}
            <span className="gradient-text">Difference</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            We've earned the trust of 10,000+ travelers by delivering expertly curated journeys, world-class hospitality, and memories that last a lifetime.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || MapPin;
            return (
              <motion.div
                key={feature.title}
                /* removed initial */
                /* removed whileInView */
                /* removed viewport */
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group glass-card rounded-2xl p-6 cursor-default"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-semibold text-white text-base mb-2 group-hover:text-[#00D26A] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className={`mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 rounded-full`} />
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          /* removed initial */
          /* removed whileInView */
          /* removed viewport */
          transition={{ delay: 0.4 }}
          className="mt-12 glass-card rounded-2xl px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-white/6"
        >
          {[
            { val: "2,500+", label: "Tours Completed" },
            { val: "Free", label: "Itinerary Planning" },
            { val: "< 2hrs", label: "Response Time" },
            { val: "24/7", label: "Travel Support" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-2xl font-bold gradient-text mb-1">{stat.val}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
