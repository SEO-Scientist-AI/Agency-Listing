export const revalidate = 86400; // Revalidate every day

import { notFound, redirect, RedirectType } from "next/navigation";
import FindAgencies from "../../_components/find-agency";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default async function AgencyCityArchive({ params }: { params: Promise<{ 
  slug: string;
  service: string }> }) {
  const resolvedParams = await params;
  if(resolvedParams.slug.toLowerCase() !== 'list'){
    redirect("/agency",RedirectType.push)
  }
  const services = resolvedParams.service;
  

  if (!resolvedParams) {
    notFound();
  }
  return (
    <>
    <FindAgencies servicesSlug={services}  />
    </>
  )
  
}

export async function generateStaticParams() {
  try {
    // Fetch all services
    const servicesRef = collection(db, "services");
    const servicesSnapshot = await getDocs(servicesRef);
    const services = servicesSnapshot.docs.map(doc => ({
      slug: doc.data().slug
    })).filter(service => service.slug);

    // Fetch all locations
    const locationsRef = collection(db, "locations");
    const locationsSnapshot = await getDocs(locationsRef);
    const locations = locationsSnapshot.docs.map(doc => ({
      citySlug: doc.data().citySlug
    })).filter(location => location.citySlug);

    // Generate paths for both services and cities
    const servicePaths = services.map(service => ({
      slug: 'list',
      service: service.slug
    }));

    const cityPaths = locations.map(location => ({
      slug: 'list',
      service: location.citySlug // Using service parameter for city URLs
    }));

    // Combine both path types
    return [...servicePaths, ...cityPaths];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
