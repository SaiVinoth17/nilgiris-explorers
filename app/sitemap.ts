import { MetadataRoute } from 'next';
import { tourPackages } from '@/lib/data/packages';
import { destinations } from '@/lib/data/destinations';
import { blogPosts } from '@/lib/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nilgirisexplorers.com';
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/destinations',
    '/tours',
    '/accommodation',
    '/contact',
    '/blog',
    '/trip-planner',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Destinations
  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  
  const locationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/locations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Packages
  const packageRoutes = tourPackages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Blogs
  const postRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes, ...locationRoutes, ...packageRoutes, ...postRoutes];
}
