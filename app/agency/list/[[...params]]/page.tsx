import FindAgencies from "@/app/agency/_components/find-agency";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

interface PageProps {
  params: Promise<{
    params?: string[];
  }>;
}

async function checkIfService(slug: string): Promise<boolean> {
  const servicesRef = collection(db, "services");
  const q = query(servicesRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function checkIfLocation(slug: string): Promise<boolean> {
  const locationsRef = collection(db, "locations");
  const q = query(locationsRef, where("citySlug", "==", slug));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
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