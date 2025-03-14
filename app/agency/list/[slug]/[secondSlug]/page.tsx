import FindAgencies from "../../../_components/find-agency";
import { redirect } from "next/navigation";
import { Metadata } from 'next';
import { ArchiveRelatedAgencies } from "@/app/agency/_components/archive-related-agencies";
import { DynamicFAQ } from "@/app/agency/_components/dynamic-faq";
import { getServices } from "@/lib/services";
import { getLocations } from "@/lib/locations";
import axiosInstance from "@/lib/axios-instance";
import { getServicesServer, getLocationsServer } from "@/lib/data/fetch-server-data";

// Add these interfaces at the top of the file
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
    { slug: 'social-media-marketing' }
  ];
  
  const staticLocations = [
    { citySlug: 'delhi' },
    { citySlug: 'mumbai' },
    { citySlug: 'bangalore' },
    { citySlug: 'hyderabad' },
    { citySlug: 'chennai' }
  ];
  
  // Generate all possible service+location combinations (limited set for build time)
  const paths = [];
  
  for (const service of staticServices) {
    for (const location of staticLocations) {
      paths.push({
        slug: service.slug,
        secondSlug: location.citySlug
      });
    }
  }
  
  return paths;
}

const metaTemplates = [
  {
    title: "{Number} Best {Service} Agencies in {Location} (2025 Updated List) | Agencyspot",
    description: "Find the top {Number} {Service} agencies in {Location} for 2025. Compare services, pricing & reviews to hire the best {Service} company. Enquire now for free quotes!"
  },
  {
    title: "Top {Number} {Service} Companies in {Location} - 2025 Expert Picks",
    description: "Looking for the best {Service} agency in {Location}? Here's the top {Number} companies offering {Service}, link building & local services. Enquire now to get started!"
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
    description: "Find the most trusted {Number} {Service} agencies in {Location} offering comprehensive digital marketing solutions. Enquire now for a free consultation!"
  },
  {
    title: "{Number} Leading {Service} Agencies in {Location} (2025 Rankings & Reviews)",
    description: "Compare {Number} leading {Service} agencies in {Location} with reviews, pricing & expertise. Find the best services. Enquire now for customized solutions!"
  },
  {
    title: "Best {Number} {Service} Experts & Agencies in {Location} | 2025 Update",
    description: "Looking for top {Service} experts in {Location}? Check out our list of {Number} best agencies offering complete digital solutions. Enquire now for a free consultation!"
  },
  {
    title: "Hire the Best {Number} {Service} Agencies in {Location} | 2025 Rankings",
    description: "Find the best {Number} {Service} agencies in {Location} ranked for 2025. Get expert strategies & boost your business. Enquire now to connect with top agencies!"
  },
  {
    title: "{Number} Top-Rated {Service} Companies in {Location} - Compare & Hire (2025)",
    description: "Discover the top {Number} {Service} companies in {Location} to improve your business performance. Read reviews, compare pricing & enquire now for the best services!"
  }
];

// Update the generateMetadata function
export async function generateMetadata({ params }: { params: Promise<{ slug: string; secondSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const services = await getServices();
  const locations = await getLocations();
  
  const isFirstService = services.some((s: Service) => s.slug === resolvedParams.slug);
  const isSecondLocation = locations.some((l: Location) => l.citySlug === resolvedParams.secondSlug);

  if (isFirstService && isSecondLocation) {
    const serviceName = resolvedParams.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const locationName = resolvedParams.secondSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');


    const countData = await axiosInstance.get<{count: number}>('agency/count', {
      params: {
        services: resolvedParams.slug,
        locations: resolvedParams.secondSlug,
      },
    });
    const count = countData.data.count || 10;

    // Use a deterministic way to select template based on service and location
    const templateIndex = (serviceName.length + locationName.length) % metaTemplates.length;
    const template = metaTemplates[templateIndex];
    
    // Replace placeholders
    const title = template.title
      .replace(/{Service}/g, serviceName)
      .replace(/{Location}/g, locationName)
      .replace(/{Number}/g, count.toString());
      
    const description = template.description
      .replace(/{Service}/g, serviceName)
      .replace(/{Location}/g, locationName)
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

export default async function AgencyDoubleFilterPage({ 
  params 
}: { 
  params: Promise<{ slug: string; secondSlug: string }> 
}) {
  const resolvedParams = await params;
  const services = await getServices();
  const locations = await getLocations();
  
  const isFirstService = services.some((s: Service) => s.slug === resolvedParams.slug);
  const isSecondLocation = locations.some((l: Location) => l.citySlug === resolvedParams.secondSlug);

  if (!isFirstService || !isSecondLocation) {
    const isFirstLocation = locations.some((l: Location) => l.citySlug === resolvedParams.slug);
    const isSecondService = services.some((s: Service) => s.slug === resolvedParams.secondSlug);
    
    if (isFirstLocation && isSecondService) {
      redirect(`/agency/list/${resolvedParams.secondSlug}/${resolvedParams.slug}`);
    }
    
    redirect("/agency/list");
  }

  return (
    <div>
      <FindAgencies 
        servicesSlug={resolvedParams.slug} 
        locationSlug={resolvedParams.secondSlug} 
      />
      
      <ArchiveRelatedAgencies 
        service={resolvedParams.slug}
        location={resolvedParams.secondSlug}
        excludeIds={[]}
      />
      
      <DynamicFAQ 
        service={resolvedParams.slug}
        location={resolvedParams.secondSlug}
      />
    </div>
  );
} 