"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function AppFooter() {
  const pathname = usePathname();

  // The landing page ("/") renders JourneyFooter within its cinematic 3D journey
  if (pathname === "/") {
    return null;
  }

  return <Footer />;
}
