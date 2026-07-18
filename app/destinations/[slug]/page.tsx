import { destinations } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Camera, Users, Sun, ArrowLeft, ArrowRight, MapPin, Compass, 
  BookOpen, Thermometer, Map as MapIcon, Clock, AlertTriangle, 
  Utensils, ShoppingBag, Info, HelpCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmartTripPlanner from "@/components/destinations/SmartTripPlanner";

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
    },
    twitter: {
      card: "summary_large_image",
      title: `The ${dest.name} Travel Guide`,
      description: dest.description,
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
  const destination: any = destinations.find((d) => d.slug === resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  const url = `https://nilgirisexplorers.com/destinations/${destination.slug}`;

  // Structured Data schemas
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: destination.name,
      description: destination.description,
      url: url,
      image: `https://nilgirisexplorers.com${destination.image}`,
      publicAccess: true,
    }
  ];

  if (destination.faqs && destination.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: destination.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    } as any);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
              <p className="text-white/70 text-lg leading-relaxed font-light mb-6">
                {destination.story || destination.description}
              </p>
              {destination.history && (
                <>
                  <h3 className="text-white font-bold mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400"/> History</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{destination.history}</p>
                </>
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> The Experience
              </h2>
              <p className="text-white/70 text-lg leading-relaxed font-light mb-6">
                {destination.experience || "A breathtaking journey through the Nilgiris."}
              </p>
              {destination.whyVisit && (
                <>
                  <h3 className="text-white font-bold mb-2">Why Visit?</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{destination.whyVisit}</p>
                </>
              )}
            </div>
          </div>

          {/* Intelligence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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

          {/* Expanded Travel Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            
            {/* Climate & Terrain */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <Thermometer className="w-5 h-5 text-emerald-400" /> Climate & Terrain
              </h3>
              <div className="space-y-3">
                {destination.climate && <div className="flex justify-between"><span className="text-white/50">Climate</span><span className="text-white/90 text-right">{destination.climate}</span></div>}
                {destination.temperature && <div className="flex justify-between"><span className="text-white/50">Temp</span><span className="text-white/90 text-right">{destination.temperature}</span></div>}
                {destination.elevation && <div className="flex justify-between"><span className="text-white/50">Elevation</span><span className="text-white/90 text-right">{destination.elevation}</span></div>}
              </div>
            </div>

            {/* Visit Info */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <Clock className="w-5 h-5 text-emerald-400" /> Visit Information
              </h3>
              <div className="space-y-3">
                {destination.timings && <div className="flex justify-between"><span className="text-white/50">Timings</span><span className="text-white/90 text-right">{destination.timings}</span></div>}
                {destination.entryFee && <div className="flex justify-between"><span className="text-white/50">Entry Fee</span><span className="text-white/90 text-right">{destination.entryFee}</span></div>}
                {destination.duration && <div className="flex justify-between"><span className="text-white/50">Duration</span><span className="text-white/90 text-right">{destination.duration}</span></div>}
                {destination.parkingInfo && <div className="flex justify-between"><span className="text-white/50">Parking</span><span className="text-white/90 text-right text-xs max-w-[200px]">{destination.parkingInfo}</span></div>}
              </div>
            </div>

            {/* Smart Trip Planner */}
            <SmartTripPlanner destination={destination} />

            {/* Things To Do */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <Compass className="w-5 h-5 text-emerald-400" /> Things To Do
              </h3>
              <ul className="space-y-2">
                {destination.thingsToDo?.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-emerald-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Things To Avoid */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" /> Things To Avoid
              </h3>
              <ul className="space-y-2">
                {destination.thingsToAvoid?.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-rose-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Interactive Map & Nearby */}
          {destination.mapEmbedUrl && (
            <div className="mb-24">
              <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <MapIcon className="w-6 h-6 text-emerald-400" /> Location & Nearby
              </h2>
              <div className="glass-card p-2 rounded-3xl border border-white/10 overflow-hidden mb-8">
                <iframe 
                  src={destination.mapEmbedUrl} 
                  width="100%" 
                  height="400" 
                  style={{ border: 0, borderRadius: '1.5rem' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {destination.nearbyAttractions && (
                  <div className="glass-card p-6 rounded-2xl border border-white/10">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400"/> Attractions</h4>
                    <ul className="text-sm text-white/60 space-y-1">
                      {destination.nearbyAttractions.map((a: string) => <li key={a}>{a}</li>)}
                    </ul>
                  </div>
                )}
                {destination.nearbyRestaurants && (
                  <div className="glass-card p-6 rounded-2xl border border-white/10">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Utensils className="w-4 h-4 text-amber-400"/> Dining</h4>
                    <ul className="text-sm text-white/60 space-y-1">
                      {destination.nearbyRestaurants.map((a: string) => <li key={a}>{a}</li>)}
                    </ul>
                  </div>
                )}
                {destination.nearbyHotels && (
                  <div className="glass-card p-6 rounded-2xl border border-white/10">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-blue-400"/> Stays</h4>
                    <ul className="text-sm text-white/60 space-y-1">
                      {destination.nearbyHotels.map((a: string) => <li key={a}>{a}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {destination.images && destination.images.length > 1 && (
            <div className="mb-24">
               <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <Camera className="w-6 h-6 text-emerald-400" /> Destination Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {destination.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative h-64 rounded-2xl overflow-hidden group">
                    <Image 
                      src={img} 
                      alt={`${destination.name} Gallery Image ${idx + 1}`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 mb-24 bg-white/5">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Good to Know</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-emerald-400 font-bold mb-2">Local Tips</h4>
                <p className="text-white/70 text-sm leading-relaxed">{destination.localTips}</p>
              </div>
              <div>
                <h4 className="text-emerald-400 font-bold mb-2">Travel & Safety</h4>
                <p className="text-white/70 text-sm leading-relaxed">{destination.travelTips} {destination.safetyTips}</p>
              </div>
              <div>
                <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShoppingBag className="w-4 h-4"/> Shopping</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  {destination.shoppingSuggestions?.map((s: string) => <li key={s}>- {s}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {destination.faqs && (
            <div className="mb-24 max-w-3xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                <HelpCircle className="w-6 h-6 text-emerald-400" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {destination.faqs.map((faq: any, i: number) => (
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
