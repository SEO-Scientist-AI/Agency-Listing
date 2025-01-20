import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

async function getAgency(id: number) {
  const agency = await prisma.agency.findUnique({
    where: { id },
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

export default async function AgencyDetailPage({ params }: PageProps) {
  const agency = await getAgency(parseInt(params.id));

  if (!agency) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header with Preview Info */}
        <div className="flex items-start gap-6">
          <img
            src={agency.logo}
            alt={agency.name}
            className="w-24 h-24 rounded-lg"
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

        {/* Social Links */}
        <div className="flex gap-4">
          {agency.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.platform}
            </a>
          ))}
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold">Founded</h3>
            <p>{agency.founded}</p>
          </div>
          <div>
            <h3 className="font-semibold">Team Size</h3>
            <p>{agency.employees}</p>
          </div>
          <div>
            <h3 className="font-semibold">Locations</h3>
            <ul>
              {agency.locations.map((location) => (
                <li key={location.id}>{location.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description and Impact */}
        <div className="prose max-w-none">
          <p>{agency.description}</p>
          
          {agency.impact && (
            <>
              <h2>Our Impact</h2>
              <ul>
                <li>{agency.impact.experience}</li>
                <li>{agency.impact.revenue}</li>
                <li>{agency.impact.businesses}</li>
              </ul>
            </>
          )}
        </div>

        {/* Services and Industries */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <div className="flex flex-wrap gap-2">
              {agency.services.map((service) => (
                <Badge key={service.id} variant="secondary">
                  {service.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Industries</h2>
            <div className="flex flex-wrap gap-2">
              {agency.industries.map((industry) => (
                <Badge key={industry.id} variant="secondary">
                  {industry.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}