import { tourPackages } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Clock, CalendarDays, CheckCircle2, ArrowRight, ArrowLeft, 
  Users, Shield, MessageCircle, Utensils, Info, AlertCircle, Mountain
} from "lucide-react";
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
    },
    twitter: {
      card: "summary_large_image",
      title: `${pkg.name} | Nilgiris Explorers`,
      description: pkg.description,
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
  const pkg: any = tourPackages.find((p) => p.slug === resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  const url = `https://nilgirisexplorers.com/packages/${pkg.slug}`;
  const whatsappText = `Hello! I'm interested in booking the "${pkg.name}" package. Please provide more details.`;

  return (
    <>
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
              availability: "https://schema.org/InStock"
            },
            itinerary: {
              "@type": "ItemList",
              itemListElement: pkg.itinerary?.map((day: any, index: number) => ({
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
      {pkg.faqs && pkg.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: pkg.faqs.map((faq: any) => ({
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
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm ${
                  pkg.badgeColor === 'emerald' ? 'bg-[var(--color-brand-emerald)]/20 text-[var(--color-brand-emerald)] border-[var(--color-brand-emerald)]/30' :
                  pkg.badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  pkg.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                  pkg.badgeColor === 'purple' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                  pkg.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                  'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {pkg.badge}
                </span>
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm text-sm font-semibold">
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

              {/* Advanced Package Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.vehicleDetails && (
                  <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Shield className="w-3 h-3 text-blue-400"/> Vehicle</span>
                    <span className="text-white text-sm">{pkg.vehicleDetails}</span>
                  </div>
                )}
                {pkg.meals && (
                  <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Utensils className="w-3 h-3 text-amber-400"/> Meals</span>
                    <span className="text-white text-sm">{pkg.meals}</span>
                  </div>
                )}
                {pkg.bestSeason && (
                  <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><CalendarDays className="w-3 h-3 text-[var(--color-brand-emerald)]"/> Best Season</span>
                    <span className="text-white text-sm">{pkg.bestSeason}</span>
                  </div>
                )}
                {pkg.difficultyLevel && (
                  <div className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Mountain className="w-3 h-3 text-purple-400"/> Difficulty</span>
                    <span className="text-white text-sm">{pkg.difficultyLevel}</span>
                  </div>
                )}
              </div>

              {/* Trip Logistics */}
              <div className="glass p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[var(--color-brand-emerald)]"/> Logistics</h3>
                <div className="space-y-4">
                  {pkg.pickupInfo && (
                    <div>
                      <span className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-1">Pickup Information</span>
                      <p className="text-white/80 text-sm">{pkg.pickupInfo}</p>
                    </div>
                  )}
                  {pkg.dropInfo && (
                    <div>
                      <span className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-1">Drop Information</span>
                      <p className="text-white/80 text-sm">{pkg.dropInfo}</p>
                    </div>
                  )}
                  {pkg.thingsToCarry && (
                    <div>
                      <span className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-2">Things To Carry</span>
                      <div className="flex flex-wrap gap-2">
                        {pkg.thingsToCarry.map((item: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">{item}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
                    {pkg.itinerary.map((day: any, idx: number) => (
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
                            {day.locations.map((loc: string, lidx: number) => (
                              <li key={lidx} className="flex items-start gap-2 text-sm text-white/80">
                                <MapPin className="w-4 h-4 text-[var(--color-brand-emerald)] mt-0.5 shrink-0" />
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
                        <div className="w-10 h-10 rounded-full bg-[var(--color-brand-emerald)]/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-emerald)]" />
                        </div>
                        <span className="text-white/90 font-medium">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exclusions */}
              {pkg.exclusions && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">Exclusions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.exclusions.map((exc: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-rose-400" />
                        </div>
                        <span className="text-white/70">{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {pkg.faqs && pkg.faqs.length > 0 && (
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {pkg.faqs.map((faq: {question: string, answer: string}, i: number) => (
                      <div key={i} className="glass p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-start gap-3">
                          <span className="text-[#00D26A] font-display">Q.</span>
                          {faq.question}
                        </h3>
                        <p className="text-white/60 pl-7 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Suitability */}
              <div className="glass p-8 rounded-2xl border border-white/10 space-y-5">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Info className="w-5 h-5 text-[var(--color-brand-emerald)]"/> Suitability</h3>
                {pkg.familySuitability && (
                  <div>
                    <div className="font-medium text-white text-sm">Family & Kids</div>
                    <div className="text-sm text-white/60">{pkg.familySuitability}</div>
                    {pkg.childFriendlyNotes && <div className="text-xs text-[var(--color-brand-emerald)] mt-1 italic">{pkg.childFriendlyNotes}</div>}
                  </div>
                )}
                {pkg.coupleSuitability && (
                  <div>
                    <div className="font-medium text-white text-sm mt-2">Couples</div>
                    <div className="text-sm text-white/60">{pkg.coupleSuitability}</div>
                  </div>
                )}
              </div>

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
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-emerald)]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-brand-emerald)]" />
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
              <div className="bg-forest-light p-8 rounded-2xl border border-[var(--color-brand-emerald)]/30 text-center shadow-2xl shadow-[var(--color-brand-emerald)]/10 sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-2">Book This Package</h3>
                <div className="mb-6">
                  {pkg.price > 0 ? (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xs text-white/50 tracking-wide uppercase font-medium mb-1">Starting From</span>
                      <span className="text-4xl font-bold text-white">₹{pkg.price.toLocaleString()}</span>
                      
                      {pkg.pricingTiers && (
                        <div className="w-full mt-4 flex flex-col gap-2 text-left">
                          <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Package Tiers</div>
                          {Object.entries(pkg.pricingTiers).map(([tier, tierPrice]) => (
                            <div key={tier} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                              <span className="text-sm font-medium capitalize text-white/80">{tier}</span>
                              <span className="text-sm font-bold text-white">₹{(tierPrice as number).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {pkg.advancedPricing && (
                        <div className="w-full mt-3 flex flex-col gap-2 text-left">
                          <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1 mt-2 border-t border-white/10 pt-3">Pricing Conditions</div>
                          {pkg.advancedPricing.weekendSurge && (
                            <div className="flex justify-between text-xs items-center px-2 py-1">
                              <span className="text-white/60">Weekend Surge (Fri-Sun)</span>
                              <span className="text-[var(--color-brand-emerald)] font-medium">+₹{pkg.advancedPricing.weekendSurge}</span>
                            </div>
                          )}
                          {pkg.advancedPricing.holidaySurge && (
                            <div className="flex justify-between text-xs items-center px-2 py-1">
                              <span className="text-white/60">Holiday Surge</span>
                              <span className="text-[var(--color-brand-emerald)] font-medium">+₹{pkg.advancedPricing.holidaySurge}</span>
                            </div>
                          )}
                          {pkg.advancedPricing.groupDiscountPercent && (
                            <div className="flex justify-between text-xs items-center px-2 py-1">
                              <span className="text-white/60">Group Discount (6+ Pax)</span>
                              <span className="text-[var(--color-brand-emerald)] font-medium">-{pkg.advancedPricing.groupDiscountPercent}%</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <span className="text-xs text-white/40 mt-4 italic text-center">Contact us for custom tour plans and group pricing.</span>
                    </div>
                  ) : (
                    <div className="text-xl font-bold gradient-text">Custom Pricing</div>
                  )}
                </div>
                <p className="text-white/80/70 mb-8 text-sm">
                  Click below to chat with our local experts directly on WhatsApp and customize this tour.
                </p>
                <a 
                  href={`https://wa.me/919585219509?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center py-4 flex items-center gap-2"
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

