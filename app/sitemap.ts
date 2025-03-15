import { cache } from 'react';
import dbConnect from "@/lib/dbConnect";
import { getServicesServer, getLocationsServer, getAllAgencySlugServer } from "@/lib/data/fetch-server-data";
import { STATIC_LOCATIONS, STATIC_SERVICES, PRIORITY_LOCATIONS, SECONDARY_LOCATIONS, BASIC_LOCATIONS, PRIORITY_SERVICES, SECONDARY_SERVICES, BASIC_SERVICES, COMBINATION_LIMITS } from "@/lib/data/static-routes";

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

// Add this helper function near the top of the file, before getSitemapEntries
function getServiceTier(service: string): keyof typeof COMBINATION_LIMITS {
  if (PRIORITY_SERVICES.includes(service)) return 'PRIORITY';
  if (SECONDARY_SERVICES.includes(service)) return 'SECONDARY';
  return 'BASIC';
}

// Cache the sitemap generation for 1 hour
const getSitemapEntries = cache(async (): Promise<SitemapEntry[]> => {
  const baseUrl = "https://agencyspot.seoscientist.ai";

  // Static pages
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/agency/list`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    }
  ];

  try {
    // Create service pages
    const servicePages: SitemapEntry[] = STATIC_SERVICES.map(service => ({
      url: `${baseUrl}/agency/list/${service}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Create location pages
    const locationPages: SitemapEntry[] = STATIC_LOCATIONS.map(location => ({
      url: `${baseUrl}/agency/list/${location}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Create service+location combination pages
    const combinationPages: SitemapEntry[] = [];

    for (const service of [...PRIORITY_SERVICES, ...SECONDARY_SERVICES, ...BASIC_SERVICES]) {
      const serviceTier = getServiceTier(service);
      let locationCount = 0;
      const limit = COMBINATION_LIMITS[serviceTier];
      
      // Add priority locations first
      for (const location of PRIORITY_LOCATIONS) {
        if (locationCount >= limit) break;
        combinationPages.push({
          url: `${baseUrl}/agency/list/${service}/${location}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
        locationCount++;
      }
      
      // Add secondary locations if not at limit
      if (locationCount < limit) {
        for (const location of SECONDARY_LOCATIONS) {
          if (locationCount >= limit) break;
          combinationPages.push({
            url: `${baseUrl}/agency/list/${service}/${location}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
          locationCount++;
        }
      }
      
      // Add basic locations for priority services if still not at limit
      if (locationCount < limit && serviceTier === 'PRIORITY') {
        for (const location of BASIC_LOCATIONS) {
          if (locationCount >= limit) break;
          combinationPages.push({
            url: `${baseUrl}/agency/list/${service}/${location}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
          locationCount++;
        }
      }
    }

    return [
      ...staticPages,
      ...servicePages,
      ...locationPages,
      ...combinationPages
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
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
