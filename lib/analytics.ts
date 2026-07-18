"use client";

// Simple global event tracker for analytics
// Replace with Google Analytics (gtag), Mixpanel, or PostHog in production.
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    // Console log for development verification
    console.log(`[Analytics Event] ${eventName}`, eventData || {});
    
    // Example gtag implementation
    if (typeof (window as any).gtag !== "undefined") {
      (window as any).gtag("event", eventName, eventData);
    }
    
    // Example dataLayer implementation (GTM)
    if (typeof (window as any).dataLayer !== "undefined") {
      (window as any).dataLayer.push({
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

export const trackWhatsAppClick = (context: string, details?: Record<string, any>) => {
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
