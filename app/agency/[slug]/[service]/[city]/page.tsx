export const revalidate = 86400; // Revalidate every day

import FindAgencies from "@/app/agency/_components/find-agency";
import { notFound,redirect, RedirectType } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from 'next';

// Helper functions
const capitalizeWords = (str: string) => {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

async function getServiceName(slug: string): Promise<string> {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().serviceName || capitalizeWords(slug);
    }
    return capitalizeWords(slug);
  } catch (error) {
    return capitalizeWords(slug);
  }
}

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

export async function generateMetadata(
  { params }: { params: Promise<{ service: string; city: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = await getServiceName(resolvedParams.service);
  const locationName = await getLocationName(resolvedParams.city);
  
  return {
    title: `Top ${serviceName} Agencies in ${locationName} | SEO Scientist Agency Spot`,
    description: `Find the perfect ${serviceName} partner in ${locationName}. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.`,
    openGraph: {
      title: `Top ${serviceName} Agencies in ${locationName}`,
      description: `Discover and connect with the best ${serviceName} agencies in ${locationName}. Compare proposals and find your ideal marketing partner.`,
    }
  }
}

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
