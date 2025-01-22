import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceBubbleProps {
    service: string;
    color: string;
}

export function ServiceBubble({ service, color }: ServiceBubbleProps) {
    return (
        <span
            className={cn(
                "inline-block px-3 py-1 rounded-full text-sm font-medium",
                "border border-dashed",
                color
            )}
        >
            {service}
        </span>
    );
}

interface AgencyCardProps {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    location: string;
    founded_year: number;
    team_size: string;
    starting_price: string;
    min_budget: number;
    max_budget: number;
    services: string[];
    industries: string[];
    client_sizes: string[];
    budget_ranges: string[];
    project_durations: string[];
    locations: string[];
    languages: string[];
    google_rating: number;
    google_review_count: number;
    expertise: {
        seo: string[];
        marketing: string[];
        development: string[];
    };
}

const colorClasses = [
    "border-blue-300 text-blue-700",
    "border-green-300 text-green-700",
    "border-yellow-300 text-yellow-700",
    "border-red-300 text-red-700",
    "border-purple-300 text-purple-700",
];

const GoogleLogo = () => (
    <Image
        src="/images/google-logo.svg"
        alt="Google Logo"
        width={16}
        height={16}
        className="mr-1"
    />
);

export function AgencyCard({
    id,
    name,
    tagline,
    description,
    location,
    founded_year,
    team_size,
    starting_price,
    services,
    industries,
    google_rating,
    google_review_count,
    expertise,
    slug,
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
                            <Link
                                href={`/dashboard/find-agencies/${slug}`}
                                className="hover:underline"
                            >
                                <h2 className="text-xl font-bold">{name}</h2>
                            </Link>
                            <p className="text-sm text-gray-500">{tagline}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                            <GoogleLogo />
                            <div className="flex items-center text-sm">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium ml-1">
                                    {google_rating}
                                </span>
                                <span className="text-gray-500 ml-1">
                                    ({google_review_count})
                                </span>
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
                                <ServiceBubble
                                    key={service}
                                    service={service}
                                    color={
                                        colorClasses[
                                            index % colorClasses.length
                                        ]
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-1">
                            Industries
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {industries.map((industry) => (
                                <Badge
                                    key={industry}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    {industry}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">
                                Starting Price: {starting_price}
                            </span>
                        </div>
                        <Link href={`/dashboard/find-agencies/${slug}`}>
                            <Button size="sm">View Details</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export const agencies = [
    {
        id: "digital-marketing-pro-agency",
        name: "Digital Marketing Pro Agency",
        tagline: "Full-Service Digital Marketing Solutions",
        description:
            "We are a full-service digital marketing agency specializing in SEO, PPC, and content marketing. With over a decade of experience, we've helped businesses across various industries achieve their online marketing goals.\n\nOur data-driven approach and creative strategies ensure maximum ROI for our clients. We stay ahead of the latest digital marketing trends and technologies to deliver exceptional results.",
        location: "New York, USA",
        additionalLocations: ["Los Angeles", "Chicago", "Miami"],
        founded: 2010,
        teamSize: "50-100",
        services: [
            "SEO",
            "Content Marketing",
            "PPC Advertising",
            "Social Media Marketing",
        ],
        industries: ["E-commerce", "SaaS", "Healthcare", "Real Estate"],
        clientSize: ["Small Business", "Mid-Market", "Enterprise"],
        budgetRange: ["$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"],
        projectDuration: ["3-6 months", "6-12 months", "Ongoing"],
        geographicFocus: ["North America", "Europe"],
        languages: ["English", "Spanish"],
        startingPrice: "$5,000",
        googleReview: {
            rating: 4.8,
            count: 156,
        },
        expertise: {
            seo: [
                "Technical SEO",
                "Local SEO",
                "E-commerce SEO",
                "International SEO",
            ],
            marketing: [
                "Content Strategy",
                "Email Marketing",
                "Social Media Management",
            ],
            development: ["WordPress", "Shopify", "Custom CMS"],
        },
    },
    {
        id: "tech-innovators-agency",
        name: "Tech Innovators Agency",
        tagline: "Cutting-Edge Web Development Solutions",
        description:
            "We are a technology-first agency focused on creating innovative web and mobile solutions. Our team of expert developers and designers craft beautiful, scalable applications that drive business growth.\n\nWe specialize in modern frameworks and cloud technologies, ensuring our clients stay ahead in the digital landscape.",
        location: "San Francisco, USA",
        additionalLocations: ["Seattle", "Austin"],
        founded: 2015,
        teamSize: "20-50",
        services: [
            "Web Development",
            "Mobile App Development",
            "Cloud Solutions",
            "UI/UX Design",
        ],
        industries: ["Technology", "Startups", "FinTech", "EdTech"],
        clientSize: ["Startup", "Mid-Market", "Enterprise"],
        budgetRange: ["$25,000 - $50,000", "$50,000 - $100,000", "$100,000+"],
        projectDuration: ["3-6 months", "6-12 months"],
        geographicFocus: ["North America", "Asia Pacific"],
        languages: ["English", "Mandarin"],
        startingPrice: "$25,000",
        googleReview: {
            rating: 4.9,
            count: 89,
        },
        expertise: {
            seo: ["Technical SEO", "App Store Optimization"],
            marketing: ["Product Marketing", "Growth Marketing"],
            development: ["React", "Node.js", "React Native", "AWS", "Azure"],
        },
    },
    {
        id: "creative-minds-agency",
        name: "Creative Minds Agency",
        tagline: "Innovative Design & Branding Solutions",
        description:
            "We transform brands through strategic design thinking and creative excellence. Our passionate team creates memorable brand experiences that resonate with audiences worldwide.\n\nFrom logo design to complete brand identity systems, we help businesses stand out in today's competitive market.",
        location: "London, UK",
        additionalLocations: ["Manchester", "Edinburgh", "Paris"],
        founded: 2012,
        teamSize: "10-20",
        services: [
            "Brand Design",
            "UI/UX Design",
            "Motion Graphics",
            "Print Design",
        ],
        industries: [
            "Fashion",
            "Luxury",
            "Food & Beverage",
            "Arts & Entertainment",
        ],
        clientSize: ["Small Business", "Mid-Market"],
        budgetRange: ["$10,000 - $25,000", "$25,000 - $50,000"],
        projectDuration: ["1-3 months", "3-6 months"],
        geographicFocus: ["Europe", "Middle East"],
        languages: ["English", "French", "Arabic"],
        startingPrice: "$10,000",
        googleReview: {
            rating: 4.7,
            count: 73,
        },
        expertise: {
            seo: ["Local SEO", "Visual SEO"],
            marketing: [
                "Brand Strategy",
                "Social Media Marketing",
                "Influencer Marketing",
            ],
            development: ["WordPress", "Webflow", "Shopify"],
        },
    },
    {
        id: "asia-digital-solutions",
        name: "Asia Digital Solutions",
        tagline: "Complete Digital Marketing for Asian Markets",
        description:
            "Specializing in digital marketing solutions for Asian markets, we help businesses expand their presence across the fastest-growing digital economies.\n\nOur deep understanding of local markets and consumer behavior enables us to create highly effective marketing strategies.",
        location: "Singapore",
        additionalLocations: ["Hong Kong", "Tokyo", "Seoul"],
        founded: 2016,
        teamSize: "50-100",
        services: [
            "Digital Marketing",
            "Market Research",
            "Social Media Marketing",
            "E-commerce Solutions",
        ],
        industries: ["Retail", "E-commerce", "Technology", "Consumer Goods"],
        clientSize: ["Mid-Market", "Enterprise"],
        budgetRange: ["$10,000 - $25,000", "$25,000 - $50,000", "$50,000+"],
        projectDuration: ["3-6 months", "6-12 months", "Ongoing"],
        geographicFocus: ["Asia Pacific"],
        languages: ["English", "Mandarin", "Japanese", "Korean"],
        startingPrice: "$10,000",
        googleReview: {
            rating: 4.6,
            count: 128,
        },
        expertise: {
            seo: ["Technical SEO", "Local SEO", "E-commerce SEO"],
            marketing: [
                "WeChat Marketing",
                "Line Marketing",
                "KakaoTalk Marketing",
            ],
            development: [
                "WeChat Mini Programs",
                "Line Mini Apps",
                "Cross-Border E-commerce",
            ],
        },
    },
    {
        id: "latam-growth-partners",
        name: "LATAM Growth Partners",
        tagline: "Digital Growth Experts for Latin America",
        description:
            "We specialize in helping businesses grow their digital presence across Latin America. Our team combines local market expertise with global best practices.\n\nFrom market entry strategies to ongoing digital marketing campaigns, we help brands succeed in the Latin American digital landscape.",
        location: "São Paulo, Brazil",
        additionalLocations: ["Mexico City", "Buenos Aires", "Bogotá"],
        founded: 2018,
        teamSize: "20-50",
        services: [
            "Market Entry Strategy",
            "Digital Marketing",
            "Social Media Management",
            "Content Marketing",
        ],
        industries: [
            "Retail",
            "Education",
            "Financial Services",
            "Consumer Goods",
        ],
        clientSize: ["Mid-Market", "Enterprise"],
        budgetRange: ["$5,000 - $10,000", "$10,000 - $25,000"],
        projectDuration: ["3-6 months", "6-12 months", "Ongoing"],
        geographicFocus: ["Latin America"],
        languages: ["Spanish", "Portuguese", "English"],
        startingPrice: "$5,000",
        googleReview: {
            rating: 4.7,
            count: 92,
        },
        expertise: {
            seo: ["Local SEO", "International SEO", "E-commerce SEO"],
            marketing: [
                "Social Media Strategy",
                "Influencer Marketing",
                "Content Marketing",
            ],
            development: ["WordPress", "WooCommerce", "Custom Development"],
        },
    },
];
