import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nilgiris Explorers Tours & Travels',
    short_name: 'Nilgiris Explorers',
    description: "Ooty's most trusted local tour experts. Book cab services, tour packages, and premium accommodations across the Nilgiris mountains.",
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#050A08',
    theme_color: '#00D26A',
    categories: ['travel', 'tourism', 'navigation'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
