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
    }
  ];

  try {
    // Fetch all agencies
    const agenciesRef = collection(db, "agencies");
    const agenciesSnapshot = await getDocs(agenciesRef);
    
    // Map agencies to sitemap entries using their unique identifiers
    const agencyPages: SitemapEntry[] = agenciesSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Create URL-friendly slug from agency name if not present
      const agencySlug = data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || doc.id;
      
      // Handle the timestamp safely
      let lastModified: string;
      try {
        // Check if updatedAt exists and is a Firestore timestamp
        if (data.updatedAt && typeof data.updatedAt.toDate === 'function') {
          lastModified = data.updatedAt.toDate().toISOString();
        } else {
          lastModified = new Date().toISOString();
        }
      } catch (error) {
        lastModified = new Date().toISOString();
      }

      return {
        url: `${baseUrl}/agency/${agencySlug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

    return [...staticPages, ...agencyPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if there's an error fetching agencies
    return staticPages;
  }
}
