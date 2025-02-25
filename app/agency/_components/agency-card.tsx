import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, DollarSign, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatSlug } from "@/lib/firebase/agencies";
import { Agency } from "@/types/agency";
import { FacebookIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "./social-icons";

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
                        <div className="space-y-2">
                            <a 
                                href={agency.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group inline-flex items-center gap-1 hover:text-primary transition-colors"
                            >
                                <h3 className="text-xl font-semibold">
                                    {agency.name}
                                </h3>
                                <ArrowUpRight className="w-5 h-5 transition-all transform group-active:translate-x-3 group-active:-translate-y-3 group-active:opacity-0 duration-300" />
                            </a>
                            <p className="text-sm text-muted-foreground">
                                {agency.tagline || ""}
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
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                            {agency.socialLinks?.facebook && (
                                <Link 
                                    href={agency.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="p-1.5 border border-dashed border-[#1877F2]/20 rounded-lg text-[#1877F2] dark:text-[#1877F2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#1877F2]/5 transition-all"
                                >
                                    <FacebookIcon />
                                </Link>
                            )}
                            {agency.socialLinks?.linkedin && (
                                <Link 
                                    href={agency.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="p-1.5 border border-dashed border-[#0A66C2]/20 rounded-lg text-[#0A66C2] dark:text-[#0A66C2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#0A66C2]/5 transition-all"
                                >
                                    <LinkedinIcon />
                                </Link>
                            )}
                            {agency.socialLinks?.instagram && (
                                <Link 
                                    href={agency.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="p-1.5 border border-dashed border-[#E4405F]/20 rounded-lg text-[#E4405F] dark:text-[#E4405F]/80 hover:text-primary hover:border-primary/50 hover:bg-[#E4405F]/5 transition-all"
                                >
                                    <InstagramIcon />
                                </Link>
                            )}
                            {agency.socialLinks?.youtube && (
                                <Link 
                                    href={agency.socialLinks.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="p-1.5 border border-dashed border-[#FF0000]/20 rounded-lg text-[#FF0000] dark:text-[#FF0000]/80 hover:text-primary hover:border-primary/50 hover:bg-[#FF0000]/5 transition-all"
                                >
                                    <YoutubeIcon />
                                </Link>
                            )}
                        </div>
                        <div className="flex gap-4">
                            {agency.websiteUrl && (
                                <Link
                                    href={agency.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group cursor-pointer rounded-xl bg-transparent p-1 transition-all duration-500"
                                >
                                    <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
                                        Visit Site
                                        <div
                                            className="absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
                                        />
                                    </div>
                                </Link>
                            )}
                            <Link 
                                href={`/agency/${formatSlug(agency.name)}`}
                                className="group cursor-pointer rounded-xl bg-transparent p-1 transition-all duration-500"
                            >
                                <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#ff642d] px-4 py-2 text-sm font-medium text-white">
                                    View Portfolio
                                    <div
                                        className="absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}