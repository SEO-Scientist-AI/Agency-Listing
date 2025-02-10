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

  // Fetch all agencies
  const agenciesRef = collection(db, "agencies");
  const agenciesSnapshot = await getDocs(agenciesRef);
  
  // Map agencies to sitemap entries using their unique identifiers
  const agencyPages: SitemapEntry[] = agenciesSnapshot.docs.map((doc) => {
    const data = doc.data();
    // Create URL-friendly slug from agency name if not present
    const agencySlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    return {
      url: `${baseUrl}/agency/${agencySlug}`,
      lastModified: data.updatedAt?.toISOString() || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    };
  });

  return [...staticPages, ...agencyPages];
}
