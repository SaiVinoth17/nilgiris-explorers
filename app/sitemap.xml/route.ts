import { NextResponse } from 'next/server';
import { destinations, tourPackages } from "@/lib/data";
import { guides } from "@/lib/seo-data";

export async function GET() {
  const baseUrl = "https://nilgirisexplorers.com";
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, priority: "1.0", freq: "weekly" },
    { url: `${baseUrl}/tours`, priority: "0.9", freq: "weekly" },
    { url: `${baseUrl}/destinations`, priority: "0.9", freq: "weekly" },
    { url: `${baseUrl}/about`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/contact`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/faq`, priority: "0.7", freq: "monthly" },
    { url: `${baseUrl}/trip-planner`, priority: "0.9", freq: "weekly" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static Pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Destinations
  destinations.forEach(dest => {
    xml += `
  <url>
    <loc>${baseUrl}/destinations/${dest.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Packages
  tourPackages.forEach(pkg => {
    xml += `
  <url>
    <loc>${baseUrl}/packages/${pkg.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Guides
  guides.forEach(guide => {
    xml += `
  <url>
    <loc>${baseUrl}/guides/${guide.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
