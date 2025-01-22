import { getAgencyBySlug } from "@/utils/queries/agencies/getAgencyBySlug";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from 'next';

import {
    Building2,
    MapPin,
    DollarSign,
    Star,
    Calendar,
    Users,
    Globe2,
    Languages,
} from "lucide-react";
import { ContactModal } from "@/components/ContactModal";

const GoogleLogo = () => (
    <Image
        src="/images/google-logo.svg"
        alt="Google Logo"
        width={16}
        height={16}
        className="mr-1"
    />
);

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const agency = await getAgencyBySlug(params.slug);
        
        if (!agency) {
            return {
                title: 'Agency Not Found - SEO Scientist',
                description: 'The requested agency could not be found.'
            };
        }
        
        return {
            title: `${agency.name} - SEO Scientist`,
            description: agency.description || `Learn more about ${agency.name} and their services.`,
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Error - SEO Scientist',
            description: 'There was an error loading the agency details.'
        };
    }
}

export default async function AgencyDetailPage({ params }: Props) {
    try {
        const agency = await getAgencyBySlug(params.slug);
        if (!agency) return notFound();

        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <Card className="w-full md:w-2/3 p-6 space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                                    {agency.logo_url ? (
                                        <Image
                                            src={agency.logo_url}
                                            alt={`${agency.name} logo`}
                                            width={96}
                                            height={96}
                                            className="rounded-lg"
                                        />
                                    ) : (
                                        <Building2 className="w-12 h-12 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold">
                                        {agency.name}
                                    </h1>
                                    <p className="text-xl text-muted-foreground mt-2">
                                        {agency.tagline}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 mt-4">
                                        {agency.google_rating && (
                                            <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                                                <GoogleLogo />
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                    <span className="font-medium ml-1">
                                                        {agency.google_rating}
                                                    </span>
                                                    <span className="text-muted-foreground ml-1">
                                                        ({agency.google_review_count || 0}{" "}
                                                        reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {agency.locations?.[0] && (
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                {agency.locations[0]}
                                            </div>
                                        )}
                                        {agency.founded_year && (
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                Founded {agency.founded_year}
                                            </div>
                                        )}
                                        {agency.team_size && (
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                {agency.team_size} employees
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div>
                                <h2 className="text-xl font-semibold mb-3">
                                    About {agency.name}
                                </h2>
                                <div className="prose prose-sm max-w-none text-muted-foreground">
                                    {(agency.description || '').split("\n\n").map((paragraph, index) => (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Services */}
                            {agency.services?.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">
                                        Services
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {agency.services.map((service: string) => (
                                            <Badge key={service} variant="secondary">
                                                {service}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Industries */}
                            {agency.industries?.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">
                                        Industries
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {agency.industries.map((industry: string) => (
                                            <Badge key={industry} variant="outline">
                                                {industry}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Expertise Areas */}
                            {agency.expertise && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {agency.expertise.seo?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                SEO Expertise
                                            </h3>
                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                {agency.expertise.seo.map((item: string) => (
                                                    <li key={item}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {agency.expertise.marketing?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Marketing Expertise
                                            </h3>
                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                {agency.expertise.marketing.map((item: string) => (
                                                    <li key={item}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {agency.expertise.development?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                Development Expertise
                                            </h3>
                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                {agency.expertise.development.map((item: string) => (
                                                    <li key={item}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>

                        {/* Contact Card */}
                        <Card className="w-full md:w-1/3 p-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">
                                    Get in Touch
                                </h2>
                                <div className="space-y-3">
                                    {agency.starting_price && (
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                                            <span>
                                                Starting from {agency.starting_price}
                                            </span>
                                        </div>
                                    )}
                                    {agency.locations?.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Globe2 className="w-5 h-5 text-muted-foreground" />
                                            <span>{agency.locations.join(", ")}</span>
                                        </div>
                                    )}
                                    {agency.languages?.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Languages className="w-5 h-5 text-muted-foreground" />
                                            <span>{agency.languages.join(", ")}</span>
                                        </div>
                                    )}
                                </div>
                                <ContactModal
                                    agency={{
                                        name: agency.name || '',
                                        services: Array.isArray(agency.services) ? agency.services : [],
                                    }}
                                    trigger={
                                        <Button className="w-full">
                                            Contact Agency
                                        </Button>
                                    }
                                />
                            </div>

                            <Separator />

                            {agency.client_sizes?.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-3">
                                        Client Business Size
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {agency.client_sizes.map((size: string) => (
                                            <Badge key={size} variant="outline">
                                                {size}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {agency.budget_ranges?.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-3">Budget Ranges</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {agency.budget_ranges.map((range: string) => (
                                            <Badge key={range} variant="outline">
                                                {range}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {agency.project_durations?.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-3">
                                        Project Duration
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {agency.project_durations.map((duration: string) => (
                                            <Badge key={duration} variant="outline">
                                                {duration}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Separator />

                            <div>
                                <h3 className="font-medium mb-2">
                                    Why work with us?
                                </h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Proven track record of success</li>
                                    <li>• Dedicated project manager</li>
                                    <li>• Transparent pricing</li>
                                    <li>• Regular progress updates</li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading agency details:', error);
        throw error; // Let Next.js error boundary handle it
    }
}
