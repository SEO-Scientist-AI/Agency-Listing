import { getAgencyById } from "@/lib/firebase/agencies";
import { AgencyDetailComponent } from "../_components/agency-detail";
import { notFound,redirect, RedirectType } from "next/navigation";
import { Metadata } from 'next'

export const revalidate = 3600; // Revalidate every hour

// Helper function to capitalize first letter of each word
const capitalizeWords = (str: string) => {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Generate dynamic metadata
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const location = capitalizeWords(resolvedParams.slug)
  
  return {
    title: `Top Agencies in ${location} | SEO Scientist Agency Spot`,
    description: `Find the perfect digital marketing partner in ${location}. Browse top-rated agencies, freelancers, and marketing professionals. Get multiple proposals in your inbox within 48 hours.`,
    openGraph: {
      title: `Top Agencies in ${location}`,
      description: `Discover and connect with the best digital marketing agencies in ${location}. Compare proposals and find your ideal marketing partner.`,
    }
  }
}

export default async function AgencyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if(resolvedParams.slug.toLowerCase() === 'list'){
    redirect("/agency",RedirectType.push)
  }
  const agency = await getAgencyById(resolvedParams.slug);
  

  if (!agency) {
    notFound();
  }

  return <AgencyDetailComponent  agency={agency} />;
}
