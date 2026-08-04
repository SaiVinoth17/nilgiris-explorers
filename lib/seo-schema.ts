/**
 * Comprehensive SEO Schema Generator for Nilgiris Explorers
 * Generates Google Rich Results JSON-LD Schemas:
 * - TravelAgency / LocalBusiness
 * - TouristDestination
 * - WebSite & SearchAction
 * - BreadcrumbList
 * - FAQPage
 * - Offer & Service
 */

export const BASE_URL = "https://nilgirisexplorers.com";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${BASE_URL}/#travelagency`,
    name: "Nilgiris Explorers Tours & Travels",
    alternateName: "Nilgiris Explorers",
    description: "Premium Ooty cab booking, sightseeing tours, airport transfers, and customized Nilgiris travel experiences.",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo-dark.png`,
    image: `${BASE_URL}/opengraph-image.png`,
    telephone: "+91-9585219509",
    email: "info@nilgirisexplorers.com",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Commercial Road",
      addressLocality: "Ooty",
      addressRegion: "Tamil Nadu",
      postalCode: "643001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.4102,
      longitude: 76.695,
    },
    areaServed: [
      "Ooty",
      "Coonoor",
      "Kotagiri",
      "Pykara",
      "Mudumalai",
      "Coimbatore Airport",
      "Nilgiris District",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "10000",
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://facebook.com/nilgirisexplorers",
      "https://instagram.com/nilgirisexplorers",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Nilgiris Explorers",
    description: "Official travel portal for Ooty cab bookings and Nilgiris tour packages.",
    publisher: {
      "@id": `${BASE_URL}/#travelagency`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tours?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function generateTouristDestinationSchema(dest: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  locationCategory?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description,
    url: `${BASE_URL}/destinations/${dest.slug}`,
    image: dest.image ? (dest.image.startsWith("http") ? dest.image : `${BASE_URL}${dest.image}`) : undefined,
    touristType: ["Sightseeing", "Nature Enthusiasts", "Couples & Families"],
    includesAttraction: {
      "@type": "TouristAttraction",
      name: dest.name,
      description: dest.description,
    },
    aggregateRating: dest.rating ? {
      "@type": "AggregateRating",
      ratingValue: dest.rating,
      reviewCount: dest.reviewCount || 100,
    } : undefined,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
