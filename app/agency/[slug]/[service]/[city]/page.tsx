export const revalidate = 86400; // Revalidate every day

import FindAgencies from "@/app/agency/_components/find-agency";
import { notFound,redirect, RedirectType } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default async function AgencyServiceArchive({ params }: { params: Promise<{
  slug:string;
  service: string 
  city: string }> }) {
  const resolvedParams = await params;

   if(resolvedParams.slug.toLowerCase() !== 'list' && resolvedParams.service !== "" ){
      redirect("/agency",RedirectType.push)
    }
  const services = resolvedParams.service;
  const location = resolvedParams.city

  if (!resolvedParams) {
    notFound();
  }
  return (<>
    <FindAgencies servicesSlug={services} locationSlug={location}  />
    </>)
  
}

export async function generateStaticParams() {
  try {
    // Fetch all services
    const servicesRef = collection(db, "services");
    const servicesSnapshot = await getDocs(servicesRef);
    const services = servicesSnapshot.docs.map(doc => ({
      slug: doc.data().slug
    })).filter(service => service.slug); // Filter out empty slugs

    // Fetch all locations
    const locationsRef = collection(db, "locations");
    const locationsSnapshot = await getDocs(locationsRef);
    const locations = locationsSnapshot.docs.map(doc => ({
      citySlug: doc.data().citySlug
    })).filter(location => location.citySlug); // Filter out empty slugs

    // Only generate service+location combination paths
    const paths = services.flatMap(service => 
      locations.map(location => ({
        slug: 'list',
        service: service.slug,
        city: location.citySlug
      }))
    );

    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
