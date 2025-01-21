import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ServiceBubbleProps {
  service: string
  color: string
}

export function ServiceBubble({ service, color }: ServiceBubbleProps) {
  return (
    <span className={cn("inline-block px-3 py-1 rounded-full text-sm font-medium", "border border-dashed", color)}>
      {service}
    </span>
  )
}

interface AgencyCardProps {
  id: string
  name: string
  tagline: string
  description: string
  location: string
  services: string[]
  industries: string[]
  startingPrice: string
  googleReview: {
    rating: number
    count: number
  }
}

const colorClasses = [
  "border-blue-300 text-blue-700",
  "border-green-300 text-green-700",
  "border-yellow-300 text-yellow-700",
  "border-red-300 text-red-700",
  "border-purple-300 text-purple-700",
]

const GoogleLogo = () => (
  <Image
    src="/images/google-logo.svg"
    alt="Google Logo"
    width={16}
    height={16}
    className="mr-1"
  />
)

export function AgencyCard({
  id,
  name,
  tagline,
  description,
  location,
  services,
  industries,
  startingPrice,
  googleReview,
}: AgencyCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 flex gap-6">
        <div className="flex-shrink-0">
          <Image
            src="/images/placeholder.svg"
            alt={`${name} logo`}
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-grow space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/agency/${id}`} className="hover:underline">
                <h2 className="text-xl font-bold">{name}</h2>
              </Link>
              <p className="text-sm text-gray-500">{tagline}</p>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
              <GoogleLogo />
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium ml-1">{googleReview.rating}</span>
                <span className="text-gray-500 ml-1">({googleReview.count})</span>
              </div>
            </div>
          </div>
          <p className="text-sm line-clamp-2">{description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{location}</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Services</h4>
            <div className="flex flex-wrap gap-1">
              {services.map((service, index) => (
                <ServiceBubble key={service} service={service} color={colorClasses[index % colorClasses.length]} />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Industries</h4>
            <div className="flex flex-wrap gap-1">
              {industries.map((industry) => (
                <Badge key={industry} variant="secondary" className="text-xs">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Starting Price: {startingPrice}</span>
            </div>
            <Link href={`/agency/${id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const agencies = [
  {
    id: "digital-marketing-pro-agency",
    name: "Digital Marketing Pro Agency",
    tagline: "We help businesses grow their online presence",
    description: "We help businesses grow their online presence through data-driven SEO strategies and comprehensive digital marketing solutions.",
    location: "New York City, NY",
    services: ["SEO", "Backlink Management", "Content Marketing"],
    industries: ["E-commerce", "Healthcare", "Finance"],
    startingPrice: "$1,000 - $5,000 /month",
    googleReview: {
      rating: 4.8,
      count: 128,
    },
  },
  {
    id: "creative-design-solutions",
    name: "Creative Design Solutions",
    tagline: "Award-winning design agency",
    description: "Award-winning design agency specializing in brand identity, UI/UX design, and creative solutions for modern businesses.",
    location: "San Francisco, CA",
    services: ["UI/UX Design", "Brand Identity", "Web Design"],
    industries: ["Technology", "Education", "Non-profit"],
    startingPrice: "$2,000 - $7,500 /month",
    googleReview: {
      rating: 4.9,
      count: 156,
    },
  },
  {
    id: "app-growth-masters",
    name: "App Growth Masters",
    tagline: "Your ASO & Mobile Growth Partner",
    description: "Specialized in App Store Optimization and mobile app marketing strategies that drive downloads and user engagement.",
    location: "London, UK",
    services: ["App Store Optimization", "Mobile App Marketing", "User Acquisition"],
    industries: ["Mobile Games", "Productivity Apps", "Health & Fitness"],
    startingPrice: "$3,000 - $10,000 /month",
    googleReview: {
      rating: 4.7,
      count: 93,
    },
  },
  {
    id: "global-seo-experts",
    name: "Global SEO Experts",
    tagline: "Multilingual SEO Solutions",
    description: "International SEO agency specializing in multilingual optimization and global market expansion strategies.",
    location: "Singapore",
    services: ["International SEO", "Local SEO", "Content Localization"],
    industries: ["Travel", "Retail", "B2B Services"],
    startingPrice: "$2,500 - $8,000 /month",
    googleReview: {
      rating: 4.8,
      count: 142,
    },
  },
  {
    id: "mobile-app-innovators",
    name: "Mobile App Innovators",
    tagline: "Innovative Mobile Solutions",
    description: "Full-service mobile app development and marketing agency focused on creating exceptional user experiences and driving app success.",
    location: "Berlin, Germany",
    services: ["App Development", "ASO", "App Analytics"],
    industries: ["Startups", "Enterprise", "Social Media"],
    startingPrice: "$5,000 - $15,000 /month",
    googleReview: {
      rating: 4.9,
      count: 87,
    },
  },
  {
    id: "tech-growth-partners",
    name: "Tech Growth Partners",
    tagline: "Data-Driven App Marketing",
    description: "Technology-focused marketing agency specializing in app growth, user acquisition, and retention strategies.",
    location: "Toronto, Canada",
    services: ["User Acquisition", "App Marketing", "Growth Strategy"],
    industries: ["SaaS", "FinTech", "EdTech"],
    startingPrice: "$4,000 - $12,000 /month",
    googleReview: {
      rating: 4.6,
      count: 115,
    },
  },
  {
    id: "app-store-wizards",
    name: "App Store Wizards",
    tagline: "ASO & App Marketing Excellence",
    description: "Boutique agency focused exclusively on App Store Optimization and app marketing, with a proven track record of increasing app visibility and downloads.",
    location: "Sydney, Australia",
    services: ["ASO", "App Store Marketing", "Keyword Optimization"],
    industries: ["Mobile Apps", "Gaming", "Lifestyle"],
    startingPrice: "$2,000 - $6,000 /month",
    googleReview: {
      rating: 4.8,
      count: 98,
    },
  },
  {
    id: "digital-growth-hub",
    name: "Digital Growth Hub",
    tagline: "Full-Stack Digital Marketing",
    description: "Comprehensive digital marketing agency offering end-to-end solutions for web and mobile app promotion.",
    location: "Dubai, UAE",
    services: ["Digital Marketing", "ASO", "Social Media Marketing"],
    industries: ["Luxury Brands", "Real Estate", "Hospitality"],
    startingPrice: "$3,500 - $10,000 /month",
    googleReview: {
      rating: 4.7,
      count: 134,
    },
  }
];