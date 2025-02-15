import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

export default async function sitemap(): Promise<SitemapEntry[]> {
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
    'jaipur'
  ];

  // Static pages
  const staticPages: SitemapEntry[] = [
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
    // Fetch all services
    const servicesRef = collection(db, "services");
    const servicesSnapshot = await getDocs(servicesRef);
    
    // Create city pages
    const cityPages: SitemapEntry[] = cities.map(city => ({
      url: `${baseUrl}/agency/${city}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Create service+city combination pages
    const combinationPages: SitemapEntry[] = [];
    servicesSnapshot.docs.forEach((serviceDoc) => {
      const serviceData = serviceDoc.data();

      // Add service+city combinations
      cities.forEach(city => {
        combinationPages.push({
          url: `${baseUrl}/agency/${serviceData.slug}/${city}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    });

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...cityPages,
      ...combinationPages
    ];

    // Remove duplicates based on URL
    const uniquePages = Array.from(
      new Map(allPages.map(page => [page.url, page])).values()
    );

    return uniquePages;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
