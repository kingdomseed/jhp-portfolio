import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/theme';

/**
 * Generates a dynamic sitemap for the site
 * The App Router automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jasonholtphotography.com';
  
  // Current date formatted for lastModified
  const currentDate = new Date().toISOString();
  
  // Main site pages
  const mainRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galleries`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  // Photography category routes
  const categoryRoutes = siteConfig.services.map(service => ({
    url: `${baseUrl}${service.href}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Combine all routes
  return [...mainRoutes, ...categoryRoutes];
}
