import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Nilgiris Explorers for cab bookings, tour packages, airport transfers and sightseeing in Ooty. WhatsApp, phone, email — we're available 24/7.",
};

export default function ContactPage() {
  return <ContactClient />;
}
