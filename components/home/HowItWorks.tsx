"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Smartphone, UserCheck, Car, Map, Home } from "lucide-react";
import { steps } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { Smartphone, UserCheck, Car, Map, Home };

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-[#0B1D17]">
      <div className="container-default">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block section-label-text mb-3">
            How It Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Plan Your Trip <span className="gradient-text">In 5 Simple Steps</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            From your first message to your last memory — our travel experts handle every detail so you can simply enjoy the Nilgiris.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-[#00D26A]/60 via-[#0B9FD4]/60 to-[#00A855]/60 -translate-x-1/2" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Smartphone;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}
                >
                  {/* Content Card */}
                  <div className="flex-1 glass-card rounded-2xl p-6 relative group card-hover">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D26A]/20 to-[#0B9FD4]/20 border border-[#00D26A]/20 flex items-center justify-center flex-shrink-0 group-hover:from-[#00D26A]/30 group-hover:to-[#0B9FD4]/30 transition-all">
                        <Icon className="w-6 h-6 text-[#00D26A]" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00D26A] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Step Number Circle (center) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center font-display text-xl font-bold text-white flex-shrink-0 z-10 shadow-[0_0_20px_rgba(0,210,106,0.4)]"
                  >
                    {step.step}
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <Link href="/tours" className="btn-primary text-base px-10 py-4 text-lg">
            Browse Tour Packages
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
