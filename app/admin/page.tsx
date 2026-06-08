import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Nilgiris Explorers admin panel for managing bookings, drivers, vehicles, and analytics.",
};

export default function AdminPage() {
  return <AdminClient />;
}
