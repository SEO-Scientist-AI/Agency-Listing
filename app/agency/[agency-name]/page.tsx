// import { getAgencyById } from "@/lib/firebase/agencies";
import { AgencyDetailComponent } from "../_components/agency-detail";
import { notFound } from "next/navigation";
import { Metadata } from 'next'
import axiosInstance from "@/lib/axios-instance";
import { Agency } from "@/lib/model/Agency";
import { getAllAgencySlugServer, getAgencyBySlugServer } from "@/lib/data/fetch-server-data";

export const revalidate = 3600;

const metaTemplates = [
  {
    title: "{AgencyName} - Expert Marketing Services for Your Business | Agencyspot",
    description: "Looking for top-notch marketing services? {AgencyName} offers expert SEO, PPC, branding & more to grow your business. Enquire now for a free consultation!"
  },
  {
    title: "Discover {AgencyName} - Top Digital Marketing Agency | Agencyspot",
    description: "Discover {AgencyName}, a leading digital marketing agency offering SEO, social media, and paid ads to boost your brand. Enquire now to scale your business!"
  },
  {
    title: "{AgencyName} - Leading Advertising & Branding Agency | Reviews & Services",
    description: "{AgencyName} specializes in advertising, branding, and performance marketing. Get expert strategies to grow your brand. Enquire now for custom solutions!"
  },
  {
    title: "Hire {AgencyName} - Best Marketing Solutions for Your Business",
    description: "Need expert marketing services? {AgencyName} delivers data-driven strategies for SEO, PPC & social media. Enquire now for tailored marketing solutions!"
  },
  {
    title: "{AgencyName} - Trusted Marketing Agency for Growth | Agencyspot",
    description: "Grow your brand with {AgencyName}, a trusted marketing agency for SEO, lead generation, and digital growth. Enquire now and take your business to the next level!"
  },
  {
    title: "{AgencyName} - SEO, PPC & Social Media Experts | Agencyspot",
    description: "Boost traffic & conversions with {AgencyName}'s expert SEO, PPC & social media marketing services. Enquire now for a customized strategy!"
  },
  {
    title: "{AgencyName} - Award-Winning Marketing Strategies & Services",
    description: "Work with {AgencyName}, an award-winning agency for SEO, branding, and paid ads. Drive real results for your business. Enquire now for expert guidance!"
  },
  {
    title: "{AgencyName} - Full-Service Digital Marketing & Branding Experts",
    description: "{AgencyName} offers full-service digital marketing, including SEO, social media, & branding. Enquire now for customized marketing solutions!"
  },
  {
    title: "{AgencyName} - Best-Rated Marketing Agency | Services & Reviews",
    description: "Join thousands of happy clients who trust {AgencyName} for marketing success. See reviews & services. Enquire now to grow your business today!"
  },
  {
    title: "{AgencyName} - Grow Your Brand with Top Marketing Strategies",
    description: "Take your brand to the next level with {AgencyName}'s top-tier marketing strategies. SEO, ads & more! Enquire now for a personalized growth plan!"
  }
];

// Update type for params
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ 'agency-name': string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const agency = await getAgencyBySlugServer(resolvedParams['agency-name']);

  if (!agency) {
    return {
      title: 'Agency Not Found | Agency Spot',
      description: 'The requested agency could not be found.',
    };
  }

  // Randomly select a template
  const template = metaTemplates[Math.floor(Math.random() * metaTemplates.length)];

  // Replace placeholders with actual agency name
  const title = template.title.replace(/{AgencyName}/g, agency.name);
  const description = template.description.replace(/{AgencyName}/g, agency.name);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: agency.imageUrl || '/default-agency-logo.png',
          width: 1200,
          height: 630,
          alt: agency.name
        }
      ],
      type: 'website',
    }
  };
}

// Update the page component to handle Promise params
export default async function AgencyDetailPage({ 
  params 
}: { 
  params: Promise<{ 'agency-name': string }> 
}) {
  const resolvedParams = await params;
  const agency = await getAgencyBySlugServer(resolvedParams['agency-name']);

  if (!agency) {
    notFound();
  }
  
  return <AgencyDetailComponent agency={agency} />;
} 