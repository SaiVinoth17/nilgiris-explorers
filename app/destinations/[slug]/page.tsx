import { destinations } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Camera, Users, Sun, ArrowLeft, ArrowRight, MapPin, Compass } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const dest = destinations.find(d => d.slug === resolvedParams.slug);
  if (!dest) return {};
  
  const url = `https://nilgirisexplorers.com/destinations/${dest.slug}`;
  
  return {
    title: `The ${dest.name} Travel Guide | Nilgiris Explorers`,
    description: dest.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `The ${dest.name} Travel Guide`,
      description: dest.description,
      url: url,
      images: [dest.image],
    }
  };
}

export async function generateStaticParams() {
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DestinationPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // Use 'any' type temporarily to allow access to the new fields without full TS interface updates if needed
  const destination: any = destinations.find((d) => d.slug === resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  const url = `https://nilgirisexplorers.com/destinations/${destination.slug}`;

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              name: destination.name,
              description: destination.description,
              url: url,
              image: `https://nilgirisexplorers.com${destination.image}`,
              publicAccess: true,
            }),
          }}
        />
      </head>
      <Navbar />
      <main className="min-h-screen bg-[#0B1D17]">
        {/* Magazine Style Hero */}
        <div className="relative h-[70vh] md:h-[85vh] w-full flex items-end justify-center pb-20">
          <div className="absolute inset-0">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D17] via-[#0B1D17]/40 to-black/20" />
          </div>
          
          <div className="relative z-10 container-default text-center">
            <Link href="/#explore" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors uppercase tracking-widest text-xs font-bold">
              <ArrowLeft className="w-4 h-4" />
              Back to Explorer
            </Link>
            <span className="block text-emerald-400 font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6">
              {destination.tag}
            </span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[140px] font-bold text-white drop-shadow-2xl leading-none tracking-tight mb-8">
              {destination.name}
            </h1>
            <p className="text-white/80 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              {destination.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container-default max-w-5xl py-20">
          
          {/* Story & Experience Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                <Compass className="w-4 h-4" /> The Story
              </h2>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                {destination.story || destination.description}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> The Experience
              </h2>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                {destination.experience || "A breathtaking journey through the Nilgiris."}
              </p>
            </div>
          </div>

          {/* Intelligence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
            <div className="glass-card rounded-3xl p-8 border border-white/10">
              <Camera className="w-8 h-8 text-amber-400 mb-6" />
              <h3 className="text-white font-bold mb-3">Photography Guide</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {destination.photographyGuide || "Capture the scenic views and misty mountains."}
              </p>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-white/10">
              <Users className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-white font-bold mb-3">Ideal Traveler</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {destination.travelerType || "Perfect for all nature lovers."}
              </p>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-white/10">
              <Sun className="w-8 h-8 text-rose-400 mb-6" />
              <h3 className="text-white font-bold mb-3">Best Time to Visit</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {destination.bestTime}
              </p>
            </div>
          </div>

          {/* Minimalist CTA */}
          <div className="border-t border-white/10 pt-20 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to explore {destination.name}?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Speak directly with our local experts on WhatsApp to craft your personalized journey.
            </p>
            <a 
              href={`https://wa.me/919585219509?text=${encodeURIComponent(`Hello, I'm inspired by the ${destination.name} guide on your website. I'd like help planning a trip here.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all gap-3 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
            >
              Plan Trip On WhatsApp <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
