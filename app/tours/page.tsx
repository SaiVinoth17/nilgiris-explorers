import type { Metadata } from "next";
import ToursClient from "./ToursClient";

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Explore premium Ooty tour packages — one-day tours, Coonoor trips, wildlife safaris, honeymoon packages, and fully customized itineraries by Nilgiris Explorers.",
};

export default function ToursPage() {
  return <ToursClient />;
}
