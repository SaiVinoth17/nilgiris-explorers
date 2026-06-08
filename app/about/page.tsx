import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Users, MapPin } from "lucide-react";
import AboutSection from "@/components/home/AboutSection";

export const metadata: Metadata = {
  title: "About Us | Nilgiris Explorers",
  description: "Learn about Nilgiris Explorers, Ooty's most trusted travel agency. We offer premium taxi services, custom tour packages, and expert local guides.",
};

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "10k+", label: "Happy Customers" },
  { value: "50+", label: "Premium Vehicles" },
  { value: "24/7", label: "Customer Support" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/dest_tea_estate.jpg"
            alt="Nilgiris Explorers About"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1D17]/85 backdrop-blur-sm" />
        </div>
        
        <div className="container-default relative z-10 text-center">
          <span className="section-label mb-4">Our Story</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="gradient-text">Nilgiris Explorers</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
            Redefining premium travel experiences in Ooty and the Nilgiris since 2018.
          </p>
        </div>
      </section>

      {/* Core Mission */}
      <section className="section-pad section-forest">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Your Gateway to the <span className="gradient-text">Blue Mountains</span>
              </h2>
              <div className="space-y-6 text-white/65 text-lg leading-relaxed">
                <p>
                  Founded in the heart of Ooty, Nilgiris Explorers Tours & Travels is an independently owned local tourism and travel service. We are focused on providing personalized travel experiences across the entire Nilgiris region, catering to those who seek authentic, premium journeys.
                </p>
                <p>
                  Today, we are proud to be recognized as Ooty's leading travel agency and cab service provider. We don't just offer rides; we craft unforgettable journeys. Our fleet of meticulously maintained vehicles and our team of verified local expert drivers ensure that your safety and comfort are never compromised.
                </p>
                <p>
                  Whether you're looking for a romantic honeymoon package, a thrilling wildlife safari in Mudumalai, or a simple airport transfer from Coimbatore, we bring a touch of luxury and deep local knowledge to every trip.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-card p-6 rounded-2xl border-l-2 border-[#00D26A]">
                    <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-semibold text-[#00D26A] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden glass-card p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/about_team.jpg"
                  alt="Our Fleet and Team in Ooty"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D17] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are Different */}
      <section className="section-pad section-deep border-y border-white/5">
        <div className="container-default">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              The Nilgiris Explorers <span className="gradient-text">Difference</span>
            </h2>
            <p className="text-white/60 text-lg">
              We stand out by prioritizing quality, transparency, and authentic local experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Safety & Reliability",
                desc: "Every vehicle undergoes rigorous maintenance checks, and every driver is background-verified. Your safety on the mountain roads is our absolute priority."
              },
              {
                icon: Users,
                title: "Local Experts",
                desc: "Our drivers are born and raised in the Nilgiris. They know the hidden viewpoints, the best time to visit crowded spots, and the authentic local eateries."
              },
              {
                icon: Clock,
                title: "Punctuality",
                desc: "We value your time. Whether it's a 3 AM airport pickup or a sunset tour, our cabs arrive on schedule, every single time."
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl card-hover relative overflow-hidden">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(0, 210, 106, 0.15)' }}>
                  <item.icon className="w-7 h-7 text-[#00D26A]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reused About Section (for visual continuity) */}
      <AboutSection />

      {/* CTA */}
      <section className="section-pad section-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,106,0.1)_0%,transparent_70%)]" />
        <div className="container-default relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Ready To Explore The <span className="gradient-text">Nilgiris?</span>
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Join thousands of happy travelers who have discovered the magic of Ooty with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tours" className="btn-primary px-8 py-4">
              Book Your Ride Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary px-8 py-4">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
