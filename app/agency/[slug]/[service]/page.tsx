export const revalidate = 86400; // Revalidate every day

import { notFound, redirect, RedirectType } from "next/navigation";
import FindAgencies from "../../_components/find-agency";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from 'next';

// Helper function to capitalize first letter of each word
const capitalizeWords = (str: string) => {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Helper function to get service name
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

export async function generateMetadata(
  { params }: { params: Promise<{ service: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = await getServiceName(resolvedParams.service);
  
  return {
    title: `Best ${serviceName} Agencies | SEO Scientist Agency Spot`,
    description: `Find the perfect ${serviceName} partner for your project. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.`,
    openGraph: {
      title: `Top ${serviceName} Agencies`,
      description: `Discover and connect with the best ${serviceName} agencies. Compare proposals and find your ideal marketing partner.`,
    }
  }
}

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
