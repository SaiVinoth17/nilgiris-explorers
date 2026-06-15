import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import CinematicNav from "@/components/layout/CinematicNav";
import dynamic from "next/dynamic";
import LenisProvider from "@/lib/lenis";

const WhatsAppWidget = dynamic(() => import("@/components/layout/WhatsAppWidget"));
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nilgirisexplorers.com"),
  title: {
    default: "Nilgiris Explorers Tours & Travels | Ooty Taxi Service & Tour Packages",
    template: "%s | Nilgiris Explorers",
  },
  description:
    "Book trusted Ooty taxi services, sightseeing tours, airport transfers, honeymoon packages, and customized travel experiences with Nilgiris Explorers Tours & Travels.",
  keywords: [
    "Ooty Tour Packages",
    "Nilgiris Local Experts",
    "Ooty Sightseeing Tour",
    "Ooty Tourism",
    "Coonoor Tour Packages",
    "Nilgiris Explorers",
    "Ooty Honeymoon Package",
    "Mudumalai Wildlife Safari",
    "Avalanche Lake Tour",
    "Ooty Group Tour",
  ],
  authors: [{ name: "Nilgiris Explorers" }],
  creator: "Nilgiris Explorers",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nilgirisexplorers.com",
    siteName: "Nilgiris Explorers Tours & Travels",
    title: "Nilgiris Explorers Tours & Travels | Ooty Taxi Service & Tour Packages",
    description:
      "Book trusted Ooty taxi services, sightseeing tours, airport transfers, honeymoon packages, and customized travel experiences with Nilgiris Explorers Tours & Travels.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilgiris Explorers Tours & Travels | Ooty Taxi Service & Tour Packages",
    description: "Book trusted Ooty taxi services, sightseeing tours, airport transfers, honeymoon packages, and customized travel experiences with Nilgiris Explorers Tours & Travels.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(poppins.variable, plusJakarta.variable, playfairDisplay.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://nilgirisexplorers.com/#localbusiness",
                  name: "Nilgiris Explorers Tours & Travels",
                  description: "Premium taxi and tour booking service in Ooty and the Nilgiris",
                  url: "https://nilgirisexplorers.com",
                  logo: "https://nilgirisexplorers.com/images/logo-dark.png",
                  telephone: "+91-9585219509",
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
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "10000",
                  },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    opens: "00:00",
                    closes: "23:59",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://nilgirisexplorers.com/#organization",
                  name: "Nilgiris Explorers",
                  url: "https://nilgirisexplorers.com",
                  logo: "https://nilgirisexplorers.com/images/logo-dark.png",
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-9585219509",
                    contactType: "customer service",
                    areaServed: "IN",
                    availableLanguage: ["en", "ta", "hi"],
                  }
                },

                {
                  "@type": "BreadcrumbList",
                  "@id": "https://nilgirisexplorers.com/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://nilgirisexplorers.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Destinations",
                      "item": "https://nilgirisexplorers.com/destinations"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Tours",
                      "item": "https://nilgirisexplorers.com/tours"
                    }
                  ]
                }
              ]
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-[#050A08] text-white overflow-x-clip">
        <LenisProvider>
          <CinematicNav />
          <main className="pb-16 md:pb-0">
            {children}
          </main>
          <WhatsAppWidget />
          <MobileBottomNav />
        </LenisProvider>
      </body>
    </html>
  );
}
