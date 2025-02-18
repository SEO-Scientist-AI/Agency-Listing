import { Metadata } from "next";
import FindAgencies from "@/app/agency/_components/find-agency";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

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

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParams = resolvedParams.params || [];

  let service = "";
  let location = "";
  let serviceName = "";
  let locationName = "";

  if (slugParams.length === 1) {
    const slug = slugParams[0];
    const isService = await checkIfService(slug);
    const isLocation = await checkIfLocation(slug);

    if (isService) {
      service = slug;
      serviceName = await getServiceName(slug);
    } else if (isLocation) {
      location = slug;
      locationName = await getLocationName(slug);
    }
  } else if (slugParams.length === 2) {
    service = slugParams[0];
    location = slugParams[1];
    serviceName = await getServiceName(service);
    locationName = await getLocationName(location);
  }

  // Generate title and description based on parameters
  let title = "Top Professional Agencies | SEO Scientist Agency Spot";
  let description = "Find the perfect digital marketing partner for your next project. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.";

  if (serviceName && locationName) {
    title = `Top ${serviceName} Agencies in ${locationName} | SEO Scientist Agency Spot`;
    description = `Find the perfect ${serviceName} partner in ${locationName}. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.`;
  } else if (serviceName) {
    title = `Best ${serviceName} Agencies | SEO Scientist Agency Spot`;
    description = `Find the perfect ${serviceName} partner for your project. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.`;
  } else if (locationName) {
    title = `Top Agencies in ${locationName} | SEO Scientist Agency Spot`;
    description = `Find the perfect digital marketing partner in ${locationName}. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://agencyspot.seoscientist.ai/',
      siteName: 'SEO Scientist Agency Spot',
    },
    twitter: {
      card: 'summary_large_image',
      title,
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