import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getAgency(slug: string) {
  const agency = await prisma.Agency.findFirst({
    where: { slug },
    include: {
      services: true,
      industries: true,
      locations: true,
      socialLinks: true,
      impact: true,
    },
  });
  return agency;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const agency = await getAgency(resolvedParams.slug);
  
  if (!agency) {
    return {
      title: 'Agency Not Found',
    };
  }

  return {
    title: agency.name,
    description: agency.description,
  };
}

export default async function AgencyDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const agency = await getAgency(resolvedParams.slug);

  if (!agency) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header with Preview Info */}
        <div className="flex items-start gap-6">
          <Image
            src={agency.logo}
            alt={agency.name}
            width={96}
            height={96}
            className="rounded-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{agency.name}</h1>
            <p className="text-xl text-muted-foreground">{agency.tagline}</p>
            <div className="flex items-center gap-2 mt-2">
              <span>{agency.rating}★</span>
              <span>({agency.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">About {agency.name}</h2>
          <p className="text-muted-foreground">{agency.description}</p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          <div className="flex flex-wrap gap-2">
            {agency.services.map((service, index) => (
              <Badge key={index} variant="secondary">
                {service.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Industries</h2>
          <div className="flex flex-wrap gap-2">
            {agency.industries.map((industry, index) => (
              <Badge key={index} variant="outline">
                {industry.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-medium">Location</div>
              <div className="text-muted-foreground">{agency.location}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-medium">Founded</div>
              <div className="text-muted-foreground">{agency.founded}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-medium">Team Size</div>
              <div className="text-muted-foreground">{agency.employees}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-medium">Budget Range</div>
              <div className="text-muted-foreground">{agency.budgetRange}</div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">{agency.mission}</p>
        </div>

        {/* Track Record */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Track Record</h2>
          <p className="text-muted-foreground">{agency.trackRecord}</p>
        </div>

        {/* Impact */}
        {agency.impact && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium">Projects Completed</div>
                <div className="text-2xl font-bold">{agency.impact.projectsCompleted}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium">Success Rate</div>
                <div className="text-2xl font-bold">{agency.impact.successRate}%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium">Client Satisfaction</div>
                <div className="text-2xl font-bold">{agency.impact.clientSatisfaction}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
