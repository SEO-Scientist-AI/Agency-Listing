import FindAgencies from "../../_components/find-agency";
import { redirect } from "next/navigation";
import { Metadata } from 'next';
import { ArchiveRelatedAgencies } from "@/app/agency/_components/archive-related-agencies";
import { DynamicFAQ } from "@/app/agency/_components/dynamic-faq";
import { getServices } from "@/lib/services";
import { getLocations } from "@/lib/locations";
import axiosInstance from "@/lib/axios-instance";
import { getServicesServer, getLocationsServer } from "@/lib/data/fetch-server-data";
// Add at the top after imports
const metaTemplates = [
  {
    title: "{Number} Best {Service} Agencies in {Location} (2025 Updated List) | Agencyspot",
    description: "Find the top {Number} {Service} agencies in {Location} for 2025. Compare services, pricing & reviews to hire the best {Service} company. Enquire now for free quotes!"
  },
  {
    title: "Top {Number} {Service} Companies in {Location} - 2025 Expert Picks",
    description: "Looking for the best {Service} agency in {Location}? Here's the top {Number} companies offering {Service}, link building & local {Service} services. Enquire now to get started!"
  },
  {
    title: "Best {Number} {Service} Firms in {Location} | Compare & Hire (2025)",
    description: "Explore the best {Number} {Service} firms in {Location} with verified reviews. Find expert {Service} services for your business. Enquire now & get customized strategies!"
  },
  {
    title: "{Number} Best {Service} Companies in {Location} (Ranked & Reviewed 2025)",
    description: "Hire from the {Number} best {Service} agencies in {Location}. Compare rankings, client reviews & case studies to choose the right agency. Enquire now for quotes!"
  },
  {
    title: "Top-Rated {Number} {Service} Agencies in {Location} - 2025 Edition",
    description: "Discover the top {Number} {Service} agencies in {Location} for 2025. Get expert {Service} solutions for your business growth. Enquire now to find the best fit!"
  },
  {
    title: "Best {Number} {Service} Agencies in {Location} | 2025's Most Trusted Experts",
    description: "Find the most trusted {Number} {Service} agencies in {Location} offering {Service}, content marketing & link building. Enquire now for a free consultation!"
  },
  {
    title: "{Number} Leading {Service} Agencies in {Location} (2025 Rankings & Reviews)",
    description: "Compare {Number} leading {Service} agencies in {Location} with reviews, pricing & expertise. Find the best {Service} services. Enquire now for customized solutions!"
  },
  {
    title: "Best {Number} {Service} Experts & Agencies in {Location} | 2025 Update",
    description: "Looking for top {Service} experts in {Location}? Check out our list of {Number} best agencies offering {Service}, PPC & local services. Enquire now for a free consultation!"
  },
  {
    title: "Hire the Best {Number} {Service} Agencies in {Location} | 2025 Rankings",
    description: "Find the best {Number} {Service} agencies in {Location} ranked for 2025. Get expert {Service} strategies & boost your rankings. Enquire now to connect with top agencies!"
  },
  {
    title: "{Number} Top-Rated {Service} Companies in {Location} - Compare & Hire (2025)",
    description: "Discover the top {Number} {Service} companies in {Location} to improve your search rankings. Read reviews, compare pricing & enquire now for the best {Service} services!"
  }
];

interface Service {
  slug: string;
  serviceName: string;
}

interface Location {
  citySlug: string;
  cityName: string;
}

// Replace the generateStaticParams function with this static version
export async function generateStaticParams() {
  // Define static services and locations for build time
  const staticServices = [
    { slug: 'seo' },
    { slug: 'web-design' },
    { slug: 'web-development' },
    { slug: 'digital-marketing' },
    { slug: 'social-media-marketing' },
    { slug: 'content-marketing' },
    { slug: 'ppc' },
    { slug: 'ecommerce' },
    { slug: 'branding' },
    { slug: 'mobile-app-development' }
  ];
  
  const staticLocations = [
    { citySlug: 'delhi' },
    { citySlug: 'mumbai' },
    { citySlug: 'bangalore' },
    { citySlug: 'hyderabad' },
    { citySlug: 'chennai' },
    { citySlug: 'kolkata' },
    { citySlug: 'pune' },
    { citySlug: 'ahmedabad' },
    { citySlug: 'jaipur' },
    { citySlug: 'gurugram' }
  ];
  
  // Generate paths for all services and locations
  const paths = [
    ...staticServices.map((service) => ({ slug: service.slug })),
    ...staticLocations.map((location) => ({ slug: location.citySlug }))
  ];
  
  return paths;
}

// Update the generateMetadata function
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const services = await getServices();
  const locations = await getLocations();
  
  const isService = services.some((s: Service) => s.slug === resolvedParams.slug);
  const isLocation = locations.some((l: Location) => l.citySlug === resolvedParams.slug);
  
  const readableName = resolvedParams.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const countData = await axiosInstance.get<number>('agency/count', {
    params: {
      services: isService ? resolvedParams.slug : undefined,
      locations: isLocation ? resolvedParams.slug : undefined,
    },
  });
  const count = countData.data;
  // Use a deterministic way to select template based on slug
  const templateIndex = readableName.length % metaTemplates.length;
  const template = metaTemplates[templateIndex];

  if (isService) {
    const title = template.title
      .replace(/{Service}/g, readableName)
      .replace(/{Location}/g, 'Worldwide')
      .replace(/{Number}/g, count.toString());
      
    const description = template.description
      .replace(/{Service}/g, readableName)
      .replace(/{Location}/g, 'Worldwide')
      .replace(/{Number}/g, count.toString());

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      }
    };
  }

  if (isLocation) {
    const title = template.title
      .replace(/{Service}/g, 'Marketing')
      .replace(/{Location}/g, readableName)
      .replace(/{Number}/g, count.toString());
      
    const description = template.description
      .replace(/{Service}/g, 'Marketing')
      .replace(/{Location}/g, readableName)
      .replace(/{Number}/g, count.toString());

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      }
    };
  }

  return {
    title: 'Marketing Agencies Directory | Agency Spot',
    description: 'Find top marketing agencies worldwide',
  };
}

export default async function AgencyFilterPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const services = await getServices();
  const locations = await getLocations();
  
  const isService = services.some((s: Service) => s.slug === resolvedParams.slug);
  const isLocation = locations.some((l: Location) => l.citySlug === resolvedParams.slug);

  if (!isService && !isLocation) {
    redirect("/agency/list");
  }

  if (isService) {
    return (
      <>
        <FindAgencies servicesSlug={resolvedParams.slug} />
        <DynamicFAQ service={resolvedParams.slug} />
      </>
    );
  }

  return (
    <>
      <FindAgencies locationSlug={resolvedParams.slug} />
      <DynamicFAQ location={resolvedParams.slug} />
    </>
  );
} 