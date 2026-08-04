import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import CinematicNav from "@/components/layout/CinematicNav";
import dynamic from "next/dynamic";
import LenisProvider from "@/lib/lenis";
import { generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/seo-schema";

const WhatsAppWidget = dynamic(() => import("@/components/layout/WhatsAppWidget"));
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";

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
    "Ooty Cab Booking",
    "Best Cab in Ooty",
    "Taxi Ooty",
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
  verification: {
    google: "google-site-verification-token",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={cn(poppins.variable, plusJakarta.variable, playfairDisplay.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="font-body antialiased bg-[#050A08] text-white overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessSchema, websiteSchema]),
          }}
        />
        <LenisProvider>
          <CinematicNav />
          <main className="pb-16 md:pb-0">
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </main>
          <WhatsAppWidget />
          <MobileBottomNav />
        </LenisProvider>
      </body>
    </html>
  );
}
