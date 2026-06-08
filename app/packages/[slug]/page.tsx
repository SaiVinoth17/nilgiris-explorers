import { tourPackages } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, CalendarDays, CheckCircle2, ArrowRight, ArrowLeft, Users, Shield, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pkg = tourPackages.find(p => p.slug === resolvedParams.slug);
  if (!pkg) return {};
  
  const url = `https://nilgirisexplorers.com/packages/${pkg.slug}`;
  
  return {
    title: `${pkg.name} | Nilgiris Explorers Tour Packages`,
    description: pkg.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${pkg.name} | Nilgiris Explorers`,
      description: pkg.description,
      url: url,
      images: [pkg.image],
    }
  };
}

export async function generateStaticParams() {
  return tourPackages.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PackageDetailsPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pkg = tourPackages.find((p) => p.slug === resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  const url = `https://nilgirisexplorers.com/packages/${pkg.slug}`;
  const whatsappText = `Hello! I'm interested in booking the "${pkg.name}" package. Please provide more details.`;

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              name: pkg.name,
              description: pkg.description,
              touristType: "Sightseeing",
              offers: {
                "@type": "Offer",
                price: pkg.price,
                priceCurrency: "INR",
              },
              itinerary: {
                "@type": "ItemList",
                itemListElement: pkg.itinerary?.map((day, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "TouristAttraction",
                    name: `${day.day}: ${day.title}`,
                    description: day.description
                  }
                })) || []
              }
            }),
          }}
        />
      </head>
      <Navbar />
      <main className="min-h-screen bg-forest pt-32 pb-16">
        <div className="container-default">
          <Link href="/tours" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Packages
          </Link>
          
          {/* Hero Section */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-md ${
                  pkg.badgeColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                  pkg.badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  pkg.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                  pkg.badgeColor === 'purple' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                  pkg.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                  'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {pkg.badge}
                </span>
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md text-sm font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  4.9 (150+ Reviews)
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg max-w-4xl">
                {pkg.name}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-white/80 leading-relaxed text-xl">
                  {pkg.description}
                </p>
              </div>

              {/* Highlights */}
              {pkg.highlights && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">Key Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.highlights.map((highlight: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-[#00D26A] flex-shrink-0" />
                        <span className="text-white/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary Timeline */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-8">Detailed Itinerary</h2>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#00D26A] before:to-transparent">
                    {pkg.itinerary.map((day, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-forest bg-[#00D26A] text-forest font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                          {idx + 1}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/10 hover:border-[#00D26A]/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-xl text-white">{day.title}</h3>
                            <span className="text-sm font-semibold text-[#00D26A]">{day.day}</span>
                          </div>
                          <p className="text-white/60 text-sm mb-4">{day.description}</p>
                          <ul className="space-y-2">
                            {day.locations.map((loc, lidx) => (
                              <li key={lidx} className="flex items-start gap-2 text-sm text-white/80">
                                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>{loc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included Experiences */}
              {pkg.includes && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">What's Included</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.includes.map((inc: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-white/90 font-medium">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Signals */}
              <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white mb-2">Why Choose Us?</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Safe & Secure</div>
                    <div className="text-sm text-white/50">Verified local drivers</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Local Experts</div>
                    <div className="text-sm text-white/50">Native Nilgiris guides</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Flexible Timing</div>
                    <div className="text-sm text-white/50">Tours tailored to you</div>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="bg-emerald-900/40 p-8 rounded-2xl border border-[#00D26A]/30 text-center shadow-2xl shadow-emerald-900/20 sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-2">Book This Package</h3>
                <div className="mb-6">
                  {pkg.price > 0 ? (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xs text-white/50 tracking-wide uppercase font-medium mb-1">Starting From</span>
                      <span className="text-4xl font-bold text-white">₹{pkg.price.toLocaleString()}</span>
                      <span className="text-xs text-white/40 mt-2 italic text-center">Contact us for custom tour plans and group pricing.</span>
                    </div>
                  ) : (
                    <div className="text-xl font-bold gradient-text">Custom Pricing</div>
                  )}
                </div>
                <p className="text-emerald-100/70 mb-8 text-sm">
                  Click below to chat with our travel experts on WhatsApp and customize this tour.
                </p>
                <a 
                  href={`https://wa.me/919585219509?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center shadow-xl shadow-emerald-500/20 py-4 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> Book via WhatsApp
                </a>
                
                <div className="mt-4 text-xs text-white/40 flex justify-center items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> No advance payment required
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
