"use client";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// Simple global event tracker for analytics
export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    console.log(`[Analytics Event] ${eventName}`, eventData || {});
    
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventData);
    }
    
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
    }
  }
};

export const trackPageView = (url: string) => {
  trackEvent("page_view", { page_path: url });
};

export const trackDestinationView = (destinationSlug: string, destinationName: string) => {
  trackEvent("destination_view", {
    item_id: destinationSlug,
    item_name: destinationName,
    content_type: "destination"
  });
};

export const trackPackageView = (packageSlug: string, packageName: string) => {
  trackEvent("package_view", {
    item_id: packageSlug,
    item_name: packageName,
    content_type: "package"
  });
};

export const trackWhatsAppClick = (context: string, details?: Record<string, unknown>) => {
  trackEvent("whatsapp_click", {
    context,
    ...details
  });
};

export const trackBookingAttempt = (packageDetails: string, pax: number) => {
  trackEvent("booking_attempt", {
    package: packageDetails,
    passengers: pax
  });
};
