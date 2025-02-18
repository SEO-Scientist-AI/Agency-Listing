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

// Helper function to get location name from slug
async function getLocationName(slug: string): Promise<string> {
  try {
    const locationsRef = collection(db, "locations");
    const q = query(locationsRef, where("citySlug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().cityName || slug;
    }
    return slug;
  } catch (error) {
    return slug;
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
  let title = "Top Professional Agency Worldwide";
  let description = "Discover the top Companies worldwide. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.";

  if (serviceName && locationName) {
    title = `Trusted ${serviceName} Agency in ${locationName}`;
    description = `Discover the top ${serviceName} Companies in ${locationName}. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.`;
  } else if (serviceName) {
    title = `Top Professional ${serviceName} Agency Worldwide`;
    description = `Discover the top ${serviceName} Companies worldwide. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.`;
  } else if (locationName) {
    title = `Trusted Agency in ${locationName}`;
    description = `Discover the top Companies in ${locationName}. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.`;
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