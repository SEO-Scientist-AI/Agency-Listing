import { agencyMainData } from '../agency-main-data'
import { agencies } from '../agency-card-data'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: {
    id: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function AgencyDetailPage({ params }: PageProps) {
  const id = params.id
  const agency = agencyMainData.find(a => a.id === parseInt(id))
  const agencyPreview = agencies.find(a => a.id === parseInt(id))

  if (!agency || !agencyPreview) return <div>Agency not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header with Preview Info */}
        <div className="flex items-start gap-6">
          <img
            src={agencyPreview.logo}
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
          {Object.entries(agency.socialLinks).map(([platform, link]) => (
            <a
              key={platform}
              href={link}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform}
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
              {agency.locations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description and Impact */}
        <div className="prose max-w-none">
          <p>{agency.description}</p>
          
          <h2>Our Impact</h2>
          <ul>
            <li>{agency.impact.experience}</li>
            <li>{agency.impact.revenue}</li>
            <li>{agency.impact.businesses}</li>
          </ul>
        </div>

        {/* Services and Industries */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <div className="flex flex-wrap gap-2">
              {agency.services.map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Industries</h2>
            <div className="flex flex-wrap gap-2">
              {agency.industries.map((industry, index) => (
                <Badge key={index} variant="secondary">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}