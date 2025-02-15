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

  // Static pages
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
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
    // Fetch all agencies
    const agenciesRef = collection(db, "agencies");
    const agenciesSnapshot = await getDocs(agenciesRef);
    
    // Fetch all services
    const servicesRef = collection(db, "services");
    const servicesSnapshot = await getDocs(servicesRef);
    
    // Fetch all locations
    const locationsRef = collection(db, "locations");
    const locationsSnapshot = await getDocs(locationsRef);
    
    // Map agencies to sitemap entries (each agency gets its own URL)
    const agencyPages: SitemapEntry[] = agenciesSnapshot.docs.map((doc) => {
      const data = doc.data();
      const agencySlug = data.slug || doc.id;
      
      return {
        url: `${baseUrl}/agency/${agencySlug}`,
        lastModified: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

    // Create individual service pages
    const servicePages: SitemapEntry[] = [];
    servicesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      // Add direct service page
      servicePages.push({
        url: `${baseUrl}/agency/${data.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
      // Add service list page
      servicePages.push({
        url: `${baseUrl}/agency/list/${data.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

    // Create individual location pages
    const locationPages: SitemapEntry[] = [];
    locationsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      // Add direct location page
      locationPages.push({
        url: `${baseUrl}/agency/${data.citySlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
      // Add location list page
      locationPages.push({
        url: `${baseUrl}/agency/list/${data.citySlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

    // Create service+location combination pages
    const combinationPages: SitemapEntry[] = [];
    servicesSnapshot.docs.forEach((serviceDoc) => {
      const serviceData = serviceDoc.data();
      locationsSnapshot.docs.forEach((locationDoc) => {
        const locationData = locationDoc.data();
        combinationPages.push({
          url: `${baseUrl}/agency/list/${serviceData.slug}/${locationData.citySlug}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      });
    });

    // Combine all pages and remove duplicates
    const allPages = [
      ...staticPages,
      ...agencyPages,
      ...servicePages,
      ...locationPages,
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
