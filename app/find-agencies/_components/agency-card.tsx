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
    id: string;
    name: string;
    tagline: string;
    description: string;
    location: string;
    additionalLocations: string[];
    founded: number;
    teamSize: string;
    services: string[];
    industries: string[];
    clientSize: string[];
    budgetRange: string[];
    projectDuration: string[];
    geographicFocus: string[];
    languages: string[];
    startingPrice: string;
    googleReview: {
        rating: number;
        count: number;
    };
    expertise: {
        seo: string[];
        marketing: string[];
        development: string[];
    };
}

const colorClasses = [
    "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300",
    "border-green-300 dark:border-green-700 text-green-700 dark:text-green-300",
    "border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300",
    "border-red-300 dark:border-red-700 text-red-700 dark:text-red-300",
    "border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300",
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
    additionalLocations,
    founded,
    teamSize,
    services,
    industries,
    clientSize,
    budgetRange,
    projectDuration,
    geographicFocus,
    languages,
    startingPrice,
    googleReview,
    expertise,
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
                                href={`/find-agencies/${id}`}
                                className="hover:underline"
                            >
                                <h2 className="text-xl font-bold">{name}</h2>
                            </Link>
                            <p className="text-sm text-muted-foreground">{tagline}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-muted rounded-full px-2 py-1">
                            <GoogleLogo />
                            <div className="flex items-center text-sm">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium ml-1">
                                    {googleReview.rating}
                                </span>
                                <span className="text-muted-foreground ml-1">
                                    ({googleReview.count})
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm line-clamp-2">{description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
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
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Starting Price: {startingPrice}
                            </span>
                        </div>
                        <Link href={`/find-agencies/${id}`}>
                            <Button size="sm">View Details</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
