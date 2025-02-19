import { Metadata } from "next";
import FindAgencies from "@/app/agency/_components/find-agency";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where, getCountFromServer } from "firebase/firestore";

interface PageProps {
  params: Promise<{
    params?: string[];
  }>;
}

// Helper function to get service name from slug
async function getServiceName(slug: string): Promise<string> {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().serviceName || slug;
    }
    return slug;
  } catch (error) {
    return slug;
  }
}

// Add this helper function
function capitalizeWords(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Update the getLocationName function
async function getLocationName(slug: string): Promise<string> {
  try {
    const locationsRef = collection(db, "locations");
    const q = query(locationsRef, where("citySlug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().cityName || capitalizeWords(slug);
    }
    return capitalizeWords(slug);
  } catch (error) {
    return capitalizeWords(slug);
  }
}

// Add this helper function
const getAgencyCount = async (filters: string[] = []): Promise<number> => {
  try {
    let baseQuery = query(collection(db, "agencies"));
    if (filters.length > 0) {
      baseQuery = query(baseQuery, where("combinedSlug", "array-contains-any", filters));
    }
    const snapshot = await getCountFromServer(baseQuery);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting count:', error);
    return 0;
  }
};

// Update generateMetadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParams = resolvedParams.params || [];
  const nextYear = new Date().getFullYear() + 1;

  let service = "";
  let location = "";
  let serviceName = "";
  let locationName = "";
  let filters: string[] = [];

  if (slugParams.length === 1) {
    const slug = slugParams[0];
    const isService = await checkIfService(slug);
    const isLocation = await checkIfLocation(slug);

    if (isService) {
      service = slug;
      serviceName = await getServiceName(slug);
      filters.push(slug.toLowerCase());
    } else if (isLocation) {
      location = slug;
      locationName = await getLocationName(slug);
      filters.push(slug.toLowerCase());
    }
  } else if (slugParams.length === 2) {
    service = slugParams[0];
    location = slugParams[1];
    serviceName = await getServiceName(service);
    locationName = await getLocationName(location);
    filters.push(service.toLowerCase(), location.toLowerCase());
  }

  const count = await getAgencyCount(filters);

  let title, description, ogTitle;

  if (serviceName && locationName) {
    title = `Top ${count}+ ${serviceName} Agencies in ${locationName} (${nextYear} List) | Agency Spot`;
    description = `Compare the Best ${serviceName} Agencies in ${locationName}. ✓ Verified Agencies ✓ Client Reviews ✓ Portfolio. Get Free Quotes Within 48 Hours.`;
    ogTitle = `Best ${serviceName} Agencies in ${locationName} - Top ${count}+ Verified Agencies`;
  } else if (serviceName) {
    title = `Top ${count}+ ${serviceName} Agencies & Companies (${nextYear} List) | Agency Spot`;
    description = `Compare the Best ${serviceName} Agencies Worldwide. ✓ Verified Agencies ✓ Client Reviews ✓ Portfolio. Get Free Quotes Within 48 Hours.`;
    ogTitle = `Best ${serviceName} Agencies - Top ${count}+ Verified Companies`;
  } else if (locationName) {
    title = `Top ${count}+ Digital Marketing Agencies in ${locationName} (${nextYear}) | Agency Spot`;
    description = `Compare the Best Digital Marketing Agencies in ${locationName}. ✓ Verified Agencies ✓ Client Reviews ✓ Portfolio. Get Free Quotes Within 48 Hours.`;
    ogTitle = `Best Digital Agencies in ${locationName} - Top ${count}+ Verified Companies`;
  } else {
    title = `Top ${count}+ Digital Marketing Agencies & Companies (${nextYear}) | Agency Spot`;
    description = `Compare the Best Digital Marketing Agencies Worldwide. ✓ Verified Agencies ✓ Client Reviews ✓ Portfolio. Get Free Quotes Within 48 Hours.`;
    ogTitle = `Best Digital Marketing Agencies - Top ${count}+ Verified Companies`;
  }

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      type: 'website',
      url: 'https://agencyspot.seoscientist.ai/',
      siteName: 'SEO Scientist Agency Spot',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      creator: '@udaydev',
    },
  };
}

async function checkIfService(slug: string): Promise<boolean> {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking service:", error);
    return false;
  }
}

async function checkIfLocation(slug: string): Promise<boolean> {
  try {
    const locationsRef = collection(db, "locations");
    const q = query(locationsRef, where("citySlug", "==", slug));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking location:", error);
    return false;
  }
}

export default async function AgencyListPage({ params }: PageProps) {
  // Await the params promise
  const resolvedParams = await params;
  const slugParams = resolvedParams.params || [];

  let service = "";
  let location = "";

  if (slugParams.length === 1) {
    // Check if the single parameter is a service or location
    const slug = slugParams[0];
    const isService = await checkIfService(slug);
    const isLocation = await checkIfLocation(slug);

    if (isService) {
      service = slug;
    } else if (isLocation) {
      location = slug;
    } else {
      // If neither service nor location is found, redirect to main page
      redirect("/agency");
    }
  } else if (slugParams.length === 2) {
    // Pattern: /agency/list/ppc/delhi
    service = slugParams[0];
    location = slugParams[1];
  } else if (slugParams.length > 2) {
    // Invalid URL pattern
    redirect("/agency");
  }

  return (
    <FindAgencies 
      servicesSlug={service} 
      locationSlug={location}
    />
  );
} 