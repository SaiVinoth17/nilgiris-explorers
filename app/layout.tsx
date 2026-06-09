import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const WhatsAppWidget = dynamic(() => import("@/components/layout/WhatsAppWidget"));
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import PageTransition from "@/components/layout/PageTransition";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// Brand Guide: Poppins SemiBold — Headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Brand Guide: Plus Jakarta Sans — Sub-headings & Body
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
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
    "Nilgiris Travel Agency",
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
    images: [{ url: "/images/real_hero.jpg", width: 1200, height: 630, alt: "Nilgiris Explorers Open Graph" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilgiris Explorers Tours & Travels | Ooty Taxi Service & Tour Packages",
    description: "Book trusted Ooty taxi services, sightseeing tours, airport transfers, honeymoon packages, and customized travel experiences with Nilgiris Explorers Tours & Travels.",
    images: ["/images/real_hero.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/circle-icon.png",
    apple: "/images/app-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
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
      <body className="font-body antialiased bg-[#0B1D17] text-white overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Navbar />
          <main className="pb-16 md:pb-0"> {/* Padding bottom to prevent content hiding behind mobile nav */}
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppWidget />
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
