export const revalidate = 86400; // Revalidate every day

import { notFound, redirect, RedirectType } from "next/navigation";
import FindAgencies from "../../_components/find-agency";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where, getCountFromServer } from "firebase/firestore";
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

// Add helper function
const getAgencyCount = async (service: string): Promise<number> => {
  try {
    const baseQuery = query(
      collection(db, "agencies"), 
      where("combinedSlug", "array-contains", service.toLowerCase())
    );
    const snapshot = await getCountFromServer(baseQuery);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting count:', error);
    return 0;
  }
};

export async function generateMetadata(
  { params }: { params: Promise<{ service: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = await getServiceName(resolvedParams.service);
  const count = await getAgencyCount(resolvedParams.service);
  const nextYear = new Date().getFullYear() + 1;
  
  const title = `Top ${count}+ ${serviceName} Agencies & Companies (${nextYear} List) | Agency Spot`;
  const description = `Compare the Best ${serviceName} Agencies Worldwide. ✓ Verified Agencies ✓ Client Reviews ✓ Portfolio. Get Free Quotes Within 48 Hours.`;
  const ogTitle = `Best ${serviceName} Agencies - Top ${count}+ Verified Companies`;
  
  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      type: 'website',
      url: `https://agencyspot.seoscientist.ai/agency/list/${resolvedParams.service}`,
      siteName: 'SEO Scientist Agency Spot',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      creator: '@udaydev',
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
