import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Calendar, Globe, Clock, Building } from "lucide-react"
import { ContactModal } from "@/components/ContactModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { agencyMainData } from "./agency-main-data"

export default function AgencyPage({ params }: { params: { id: string } }) {
  const agency = agencyMainData.find((a) => a.id === parseInt(params.id))

  if (!agency) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <Image src="/placeholder.svg" alt={`${agency.name} logo`} width={100} height={100} className="rounded-full" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{agency.name}</h1>
            <p className="text-xl text-gray-600">{agency.tagline}</p>
          </div>
        </div>
        <ContactModal agency={agency} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About {agency.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{agency.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agency.industries.map((industry) => (
                  <Badge key={industry} variant="outline">
                    {industry}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agency.services.map((service) => (
                  <div key={service} className="space-y-2">
                    <h3 className="font-semibold text-lg">{service}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <Star className="text-yellow-400 w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">{agency.rating}</span>
                <span className="text-gray-600 ml-2">({agency.reviews} reviews)</span>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{agency.locations.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{agency.employees}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Founded in {agency.founded}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Client Size</h3>
                <p className="text-gray-700">{agency.employees}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Awards</h3>
                <ul className="space-y-2">
                  {agency.awards.map((award) => (
                    <li key={award} className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-500" />
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Impact</h3>
                <ul className="list-disc pl-5">
                  <li key={agency.impact.experience}>{agency.impact.experience}</li>
                  <li key={agency.impact.revenue}>{agency.impact.revenue}</li>
                  <li key={agency.impact.businesses}>{agency.impact.businesses}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
