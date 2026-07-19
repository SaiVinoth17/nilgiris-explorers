import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Accommodation in Ooty | Cottages, Resorts & Heritage Stays",
  description:
    "Book premium cottages, heritage stays, and luxury resorts in Ooty with Nilgiris Explorers. Private campfire, BBQ, complimentary transfers, and stunning mountain views.",
  keywords: [
    "Ooty accommodation",
    "Ooty cottages",
    "Ooty resorts",
    "heritage stays Ooty",
    "luxury hotels Nilgiris",
    "Ooty homestay",
    "cottage booking Ooty",
  ],
  alternates: {
    canonical: "/accommodation",
  },
  openGraph: {
    title: "Premium Accommodation in Ooty | Nilgiris Explorers",
    description:
      "Discover handpicked cottages, heritage estates, and luxury resorts across the Nilgiris. Complimentary transfers and private campfire included.",
    url: "/accommodation",
    type: "website",
  },
};

export default function AccommodationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
