import { destinations } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, CalendarDays, Navigation, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const dest = destinations.find(d => d.slug === resolvedParams.slug);
  if (!dest) return {};
  
  const url = `https://nilgirisexplorers.com/destinations/${dest.slug}`;
  
  return {
    title: `${dest.name} Sightseeing & Tours | Nilgiris Explorers`,
    description: dest.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${dest.name} Sightseeing & Tours`,
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
  const destination = destinations.find((d) => d.slug === resolvedParams.slug);

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
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ooty",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN"
              }
            }),
          }}
        />
      </head>
      <Navbar />
      <main className="min-h-screen bg-forest pt-32 pb-16">
        <div className="container-default">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Sightseeing Destinations
          </Link>
          
          {/* Hero Section */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                  {destination.tag}
                </span>
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm text-sm font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {destination.rating} ({destination.reviews} Reviews)
                </div>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-lg max-w-4xl">
                {destination.name}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-white/80 leading-relaxed text-xl">
                  {destination.description}
                </p>
              </div>

              {/* Highlights */}
              {destination.highlights && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">Key Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-white/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included Experiences */}
              {destination.includedExperiences && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">What's Included in Our Tours</h2>
                  <div className="space-y-4">
                    {destination.includedExperiences.map((exp: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-white/90 font-medium text-lg">{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white mb-2">Trip Information</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Distance from Ooty</div>
                    <div className="font-medium text-white text-lg">{destination.distance}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Ideal Duration</div>
                    <div className="font-medium text-white text-lg">{destination.duration}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Best Time to Visit</div>
                    <div className="font-medium text-white text-lg">{destination.bestTime}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Places Covered En Route</div>
                    <div className="font-medium text-white text-lg">{destination.placesCovered}</div>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="bg-emerald-900/40 p-8 rounded-2xl border border-emerald-500/30 text-center shadow-2xl shadow-emerald-900/20">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Visit?</h3>
                <p className="text-emerald-100/70 mb-8">
                  Let us plan your perfect trip to {destination.name} with our expert guides and premium vehicles.
                </p>
                <a 
                  href={`https://wa.me/917604904217?text=${encodeURIComponent(`Hello! I'm interested in booking a tour to ${destination.name}. Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center shadow-xl shadow-emerald-500/20 py-4 flex items-center gap-2"
                >
                  Book This Tour <ArrowRight className="w-5 h-5" />
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
