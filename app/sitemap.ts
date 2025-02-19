import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { cache } from 'react';

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

// Cache the sitemap generation for 1 hour
const getSitemapEntries = cache(async (): Promise<SitemapEntry[]> => {
  const baseUrl = "https://agencyspot.seoscientist.ai";

  // Define the cities we want to index
  const cities = [
    'delhi',
    'pune',
    'mumbai',
    'gurugram',
    'bangalore',
    'hyderabad',
    'chennai',
    'kolkata',
    'jaipur',
    'ahmedabad'
  ];

  // Define the specific services we want to include
  const services = [
    'branding',
    'logo-design',
    'ui-ux-design',
    'seo',
    'ppc',
    'social-media-marketing',
    'content-marketing',
    'mobile-app-development',
    'web-design',
    'software-development',
    'web-development',
    'ecommerce',
    'ecommerce-development',
    'public-relations',
    'media-buying',
    'copywriting',
    'digital-strategy',
    'advertising',
    'video-production',
    'video-marketing'
  ];

  // Static pages
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/agency`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agency/list`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    }
  ];

  try {
    // Create service pages (without city)
    const servicePages: SitemapEntry[] = services.map(service => ({
      url: `${baseUrl}/agency/list/${service}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Create city pages
    const cityPages: SitemapEntry[] = cities.map(city => ({
      url: `${baseUrl}/agency/list/${encodeURIComponent(city)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Create service+city combination pages
    const combinationPages: SitemapEntry[] = [];
    services.forEach(service => {
      cities.forEach(city => {
        combinationPages.push({
          url: `${baseUrl}/agency/list/${encodeURIComponent(service)}/${encodeURIComponent(city)}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    });

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...servicePages,
      ...cityPages,
      ...combinationPages
    ];

    // Remove duplicates and invalid URLs
    const uniquePages = Array.from(
      new Map(
        allPages
          .filter(page => {
            try {
              // Validate URL
              new URL(page.url);
              return true;
            } catch {
              console.warn(`Invalid URL found in sitemap: ${page.url}`);
              return false;
            }
          })
          .map(page => [page.url, page])
      ).values()
    );

    return uniquePages;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages as fallback
    return staticPages;
  }
});

export default async function sitemap(): Promise<SitemapEntry[]> {
  try {
    const entries = await getSitemapEntries();
    
    // Validate all URLs before returning
    return entries.filter(entry => {
      try {
        new URL(entry.url);
        return true;
      } catch {
        console.error(`Invalid URL in sitemap: ${entry.url}`);
        return false;
      }
    });
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    // Return minimal sitemap in case of errors
    return [
      {
        url: "https://agencyspot.seoscientist.ai",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 1.0,
      }
    ];
  }
}
