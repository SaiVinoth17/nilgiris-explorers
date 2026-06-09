import { locations } from "@/lib/seo-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const loc = locations.find(l => l.slug === resolvedParams.slug);
  if (!loc) return {};
  
  const url = `https://nilgirisexplorers.com/locations/${loc.slug}`;
  
  return {
    title: loc.title,
    description: loc.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: loc.title,
      description: loc.description,
      url: url,
      images: [loc.heroImage],
    }
  };
}

export async function generateStaticParams() {
  return locations.map((l) => ({
    slug: l.slug,
  }));
}

export default async function LocationPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const loc = locations.find((l) => l.slug === resolvedParams.slug);

  if (!loc) {
    notFound();
  }

  const whatsappText = `Hello! I'm planning to visit ${loc.name} and need cab/tour details.`;

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: loc.name,
              description: loc.description,
              image: `https://nilgirisexplorers.com${loc.heroImage}`,
            }),
          }}
        />
        {loc.faqs && loc.faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: loc.faqs.map(faq => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                  }
                }))
              })
            }}
          />
        )}
      </head>
      <Navbar />
      <main className="min-h-screen bg-[#0B1D17] pt-32 pb-16">
        <div className="container-default">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Hero Section */}
          <div className="relative h-[350px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={loc.heroImage}
              alt={loc.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D17] via-[#0B1D17]/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                {loc.name} Travel Guide
              </h1>
              <div className="flex items-center gap-2 text-[#00D26A] font-medium">
                <MapPin className="w-5 h-5" />
                <span>Nilgiris District, Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">About {loc.name}</h2>
                <p className="text-white/80 leading-relaxed">
                  {loc.content}
                </p>
                <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <p className="text-emerald-100/80 m-0">
                    <strong className="text-emerald-400">Best time to visit:</strong> {loc.bestTime}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-6">Top Attractions in {loc.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {loc.highlights.map((highlight: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#00D26A]/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#00D26A] flex-shrink-0" />
                      <span className="text-white/80">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {loc.faqs && loc.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {loc.faqs.map((faq: {question: string, answer: string}, i: number) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                        <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-6">
              <div className="bg-emerald-900/40 p-8 rounded-2xl border border-[#00D26A]/30 text-center sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-4">Explore {loc.name} With Us</h3>
                <p className="text-emerald-100/70 mb-8 text-sm">
                  Looking for a reliable taxi or a customized tour package covering {loc.name}? Get a free quote instantly.
                </p>
                <a 
                  href={`https://wa.me/919585219509?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0a0e1a] bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
