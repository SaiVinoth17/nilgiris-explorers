"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Mountain } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Call / WhatsApp",
    value: "+91 95852 19509",
    description: "Available 24/7 for bookings",
    href: "tel:+919585219509",
    color: "from-[#00D26A] to-[#00A855]",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "nilgiriexplorersootytourstrave@gmail.com",
    description: "Reply within 2 hours",
    href: "mailto:nilgiriexplorersootytourstrave@gmail.com",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Commercial Road, Ooty - 643001",
    description: "Nilgiris, Tamil Nadu, India",
    href: "https://maps.google.com/?q=Ooty,Tamil+Nadu",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "24/7 Available",
    description: "Including holidays",
    href: null,
    color: "from-amber-500 to-orange-600",
  },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    const msg = `Hello Nilgiris Explorers!\n\nName: ${data.name}\nEmail: ${data.email || "N/A"}\nPhone: ${data.phone}\nService: ${data.service || "N/A"}\n\nMessage: ${data.message || "N/A"}`;
    window.open(`https://wa.me/919585219509?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-default">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <span className="section-label">Get In Touch</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Let's Plan Your <span className="gradient-text">Perfect Trip</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Have questions? Want to customize a tour? We're just a message away. We respond directly within minutes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — Contact Methods + Map */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              const content = (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 flex items-start gap-4 group card-hover"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-1">{method.title}</div>
                    <div className="text-white font-semibold text-sm mb-0.5">{method.value}</div>
                    <div className="text-white/40 text-xs">{method.description}</div>
                  </div>
                </motion.div>
              );
              return method.href ? (
                <a key={method.title} href={method.href} target={method.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={method.title}>{content}</div>
              );
            })}

            {/* WhatsApp CTA */}
            <motion.a
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              href="https://wa.me/919585219509?text=Hello%20Nilgiris%20Explorers%2C%20I%20would%20like%20to%20know%20more%20about%20your%20cab%20and%20tour%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 rounded-xl p-5 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#25d366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-[0_4px_16px_rgba(37,211,102,0.4)]">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.532 5.858L.057 23.57a.5.5 0 0 0 .612.612l5.712-1.475A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.687-.516-5.222-1.414l-.374-.217-3.892 1.005 1.005-3.892-.217-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div>
                <div className="text-[#25d366] font-bold text-sm">Chat on WhatsApp</div>
                <div className="text-white/40 text-xs">Instant reply · Fastest way to book</div>
              </div>
            </motion.a>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-xl overflow-hidden h-40 relative"
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.6700%2C11.3900%2C76.7300%2C11.4400&layer=mapnik&marker=11.4102%2C76.6950"
                className="w-full h-full border-0 opacity-70"
                title="Nilgiris Explorers Location"
              />
              <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl" />
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass-card rounded-2xl p-8"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-2">Send Us a Message</h2>
            <p className="text-white/40 text-sm mb-6">We'll respond within 2 hours during business hours.</p>

            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <CheckCircle className="w-16 h-16 text-[#00D26A] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50">We've received your inquiry and will respond shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 text-white/50 font-medium uppercase tracking-wider mb-1.5 block">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className={`input-field bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 text-white/50 font-medium uppercase tracking-wider mb-1.5 block">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className={`input-field bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 text-white/50 font-medium uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      {...register("phone")}
                      className={`input-field bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 text-white/50 font-medium uppercase tracking-wider mb-1.5 block">Service Needed</label>
                    <select
                      id="contact-service"
                      {...register("service")}
                      className="input-field cursor-pointer bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white"
                    >
                      <option value="">Select a service...</option>
                      <option value="Local Sightseeing">Local Sightseeing</option>
                      <option value="Tour Package">Tour Package</option>
                      <option value="Airport Transfer">Airport Transfer</option>
                      <option value="Outstation Taxi">Outstation Taxi</option>
                      <option value="Corporate Travel">Corporate Travel</option>
                      <option value="Group Tour">Group Tour</option>
                      <option value="Honeymoon Package">Honeymoon Package</option>
                      <option value="Custom Tour">Custom Tour</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 text-white/50 font-medium uppercase tracking-wider mb-1.5 block">Your Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us about your travel plans, preferred dates, number of passengers, and any special requirements..."
                    {...register("message")}
                    className="input-field resize-none bg-white bg-white/5 border-gray-200 border-white/10 text-gray-900 text-white"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50">
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                </button>

                <p className="text-center text-white/40 text-white/30 text-xs">
                  Your message will open in WhatsApp for instant delivery
                </p>
              </form>
            )}
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  );
}
