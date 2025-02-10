import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatSlug } from "@/lib/firebase/agencies";
import { Agency } from "@/types/agency";

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

export interface AgencyCardProps {
    agency: Agency;
    className?: string;
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

export function AgencyCard({ agency, className }: AgencyCardProps) {
    if (!agency) {
        return null;
    }

    return (
        <Card className={cn("hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative", className)}>
            <CardContent className="p-6 flex gap-6">
                <div className="flex-shrink-0">
                    <Image
                        src={agency.imageUrl || "/images/placeholder.jpg"}
                        alt={`${agency.name || "Agency"} logo`}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link
                                href={`/agency/${formatSlug(
                                    agency.name || ""
                                )}`}
                                className="hover:underline"
                            >
                                <h2 className="text-xl font-bold">
                                    {agency.name || "Unnamed Agency"}
                                </h2>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                {agency.tagline || "No tagline available"}
                            </p>
                        </div>
                        <div className="flex items-center space-x-1 bg-muted rounded-full px-2 py-1">
                            <GoogleLogo />
                            <div className="flex items-center text-sm">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium ml-1">
                                    {agency.rating || "0.0"}
                                </span>
                                <span className="text-muted-foreground ml-1">
                                    ({agency.reviewCount || "0"})
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm line-clamp-2">
                        {agency.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {agency.location || "Location not specified"}
                            </span>
                        </div>
                        {agency.budgetRange && (
                            <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Price: {agency.budgetRange}
                                </span>
                            </div>
                        )}
                    </div>
                    {agency.services?.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold mb-2">
                                Services
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {agency.services
                                    .slice(0, 3)
                                    .map((service, index) => (
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
                                {agency.services.length > 3 && (
                                    <ServiceBubble
                                        key="more-services"
                                        service={`+${
                                            agency.services.length - 3
                                        }`}
                                        color={
                                            colorClasses[
                                                3 % colorClasses.length
                                            ]
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end mt-4 gap-4">
                        {agency.websiteUrl && (
                            <Link
                                href={agency.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="sm">
                                    Visit Site
                                </Button>
                            </Link>
                        )}
                        <Link href={`/agency/${formatSlug(agency.name || "")}`}>
                            <Button size="sm">View Details</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}