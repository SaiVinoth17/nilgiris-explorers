import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Manage your Nilgiris Explorers bookings, view trip history, and manage your profile.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
