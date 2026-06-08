import { guides } from "@/lib/seo-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = guides.find(g => g.slug === resolvedParams.slug);
  if (!guide) return {};
  
  const url = `https://nilgirisexplorers.com/guides/${guide.slug}`;
  
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: url,
      images: [guide.image],
      type: "article",
    }
  };
}

export async function generateStaticParams() {
  return guides.map((g) => ({
    slug: g.slug,
  }));
}

export default async function GuidePage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = guides.find((g) => g.slug === resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const whatsappText = `Hello! I just read your guide "${guide.title}" and would like to plan a trip.`;

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: guide.title,
              description: guide.description,
              image: `https://nilgirisexplorers.com${guide.image}`,
              author: {
                "@type": "Organization",
                name: "Nilgiris Explorers"
              },
              publisher: {
                "@type": "Organization",
                name: "Nilgiris Explorers",
                logo: {
                  "@type": "ImageObject",
                  url: "https://nilgirisexplorers.com/images/logo-dark.png"
                }
              },
              datePublished: "2026-01-15T08:00:00+08:00",
              dateModified: "2026-01-15T08:00:00+08:00"
            }),
          }}
        />
      </head>
      <Navbar />
      <main className="min-h-screen bg-[#0B1D17] pt-32 pb-16">
        <div className="container-default max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <article>
            <div className="mb-10 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {guide.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{guide.readTime}</span>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none mb-16">
              <p className="text-white/80 leading-relaxed text-xl mb-8">
                {guide.description}
              </p>
              <p className="text-white/70 leading-relaxed">
                {guide.content}
              </p>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-emerald-900/40 to-[#0B9FD4]/10 p-8 md:p-12 rounded-3xl border border-[#00D26A]/30 text-center shadow-2xl shadow-[#00D26A]/5">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Ready to Explore the Nilgiris?</h3>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Stop planning and start experiencing. Book a custom tour package or a reliable local cab with our expert native drivers today.
              </p>
              <a 
                href={`https://wa.me/919585219509?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-sm font-bold text-[#0a0e1a] bg-gradient-to-r from-[#00D26A] to-[#0B9FD4] shadow-xl hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-5 h-5" /> Plan Your Trip on WhatsApp
              </a>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
