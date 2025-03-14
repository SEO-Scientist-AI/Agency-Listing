"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ServiceBubble } from "./agency-card";
import {
    Building2,
    MapPin,
    DollarSign,
    Star,
    Calendar,
    Users,
    Globe2,
    Languages,
    Facebook,
    Linkedin,
    Instagram,
    Youtube,
    Clock,
    Search,
    CheckCircle2,
    BarChart3,
    Code2,
} from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import NavBar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";
import { ContactAgency } from "./contact-agency";
import { Agency } from '@/types/agency';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FacebookIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "./social-icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RelatedAgencies } from "./related-agencies";

interface AgencyDetailComponentProps {
    agency: Agency;
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

export function AgencyDetailComponent({ agency }: AgencyDetailComponentProps) {
    if (!agency) {
        return <div>Loading...</div>;
    }
    const {
        name = '',
        description = '',
        services = [],
        industries = [],
        imageUrl = '',
        tagline = '',
        rating = 0,
        reviewCount = 0,
        location = '',
        additionalLocations = [],
        websiteUrl = '',
        budgetRange = '',
        founded = '',
        teamSize = '',
        hourlyRate = '',
        socialLinks,
    } = agency;

    return (
        <>
            <NavBar />
            <div className="pt-24">
                <div className="container mx-auto max-w-6xl px-4 py-2">
                    <nav className="mb-6 py-2" aria-label="breadcrumb">
                        <BreadcrumbList className="text-sm">
                            <BreadcrumbItem>
                                <BreadcrumbLink 
                                    href="/" 
                                    asChild
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                            <BreadcrumbSeparator className="text-muted-foreground/50" />
                            
                            <BreadcrumbItem>
                                <BreadcrumbLink 
                                    href="/agency" 
                                    asChild
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Link href="/agency">Agencies</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator className="text-muted-foreground/50" />

                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-foreground font-medium">
                                    {name}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </nav>

                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <Card className="w-full md:w-2/3 p-6 space-y-6">
                                <Card className="p-6 bg-gradient-to-br from-background to-muted/50">
                                    <div className="flex items-start gap-8">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={imageUrl || '/images/placeholder.svg'}
                                                alt={`${name} logo`}
                                                width={140}
                                                height={140}
                                                className="rounded-xl object-cover border border-border/50 shadow-sm bg-white dark:bg-black"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h1 className="text-3xl font-bold tracking-tight">
                                                        {name}
                                                    </h1>
                                                    <p className="text-xl text-muted-foreground mt-2 font-medium">
                                                        {tagline}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-1 bg-background hover:bg-accent transition-colors rounded-full px-4 py-1.5">
                                                    <GoogleLogo />
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="font-semibold ml-1">
                                                            {rating}
                                                        </span>
                                                        <span className="text-muted-foreground ml-1">
                                                            ({reviewCount} reviews)
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="h-4 w-px bg-border mx-1"></div>

                                                <div className="flex items-center gap-2">
                                                    {socialLinks?.facebook && (
                                                        <Link 
                                                            href={socialLinks.facebook}
                                                            target="_blank"
                                                            rel="noopener noreferrer" 
                                                            className="p-1.5 border border-dashed border-[#1877F2]/20 rounded-lg text-[#1877F2] dark:text-[#1877F2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#1877F2]/5 transition-all bg-background"
                                                        >
                                                            <FacebookIcon />
                                                        </Link>
                                                    )}
                                                    {socialLinks?.linkedin && (
                                                        <Link 
                                                            href={socialLinks.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer" 
                                                            className="p-1.5 border border-dashed border-[#0A66C2]/20 rounded-lg text-[#0A66C2] dark:text-[#0A66C2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#0A66C2]/5 transition-all bg-background"
                                                        >
                                                            <LinkedinIcon />
                                                        </Link>
                                                    )}
                                                    {socialLinks?.instagram && (
                                                        <Link 
                                                            href={socialLinks.instagram}
                                                            target="_blank"
                                                            rel="noopener noreferrer" 
                                                            className="p-1.5 border border-dashed border-[#E4405F]/20 rounded-lg text-[#E4405F] dark:text-[#E4405F]/80 hover:text-primary hover:border-primary/50 hover:bg-[#E4405F]/5 transition-all bg-background"
                                                        >
                                                            <InstagramIcon />
                                                        </Link>
                                                    )}
                                                    {socialLinks?.youtube && (
                                                        <Link 
                                                            href={socialLinks.youtube}
                                                            target="_blank"
                                                            rel="noopener noreferrer" 
                                                            className="p-1.5 border border-dashed border-[#FF0000]/20 rounded-lg text-[#FF0000] dark:text-[#FF0000]/80 hover:text-primary hover:border-primary/50 hover:bg-[#FF0000]/5 transition-all bg-background"
                                                        >
                                                            <YoutubeIcon />
                                                        </Link>
                                                    )}
                                                    {websiteUrl && (
                                                        <Link
                                                            href={websiteUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 border border-dashed border-primary/20 rounded-lg text-primary hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-1 bg-background"
                                                        >
                                                            <Globe2 className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border text-sm">
                                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                                    <span>{location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border text-sm">
                                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                                    <span>Founded {founded}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border text-sm">
                                                    <Users className="w-4 h-4 text-muted-foreground" />
                                                    <span>{teamSize} employees</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold mb-3">
                                        About {name}
                                    </h2>
                                    <div className="prose prose-sm max-w-none text-muted-foreground">
                                        {description
                                            .split("\n\n")
                                            .map(
                                                (
                                                    paragraph: string,
                                                    index: number
                                                ) => (
                                                    <p key={index} className="mb-4">
                                                        {paragraph}
                                                    </p>
                                                )
                                            )}
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-semibold">
                                                Our Services
                                            </h2>
                                            <Badge variant="secondary" className="font-medium">
                                                {services.length} Services
                                            </Badge>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="flex flex-wrap gap-2">
                                                {services.map((service: string, index: number) => (
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
                                    </div>
                                </Card>

                                {additionalLocations.length > 0 && (
                                    <Card className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">
                                                    Office Locations
                                                </h2>
                                                <Badge variant="secondary" className="font-medium">
                                                    {additionalLocations.length + 1} Locations
                                                </Badge>
                                            </div>
                                            
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {/* Headquarters */}
                                                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/40 transition-colors">
                                                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                        <Building2 className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">Headquarters</h3>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {location}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Additional Locations */}
                                                {additionalLocations.map((loc: string, index: number) => (
                                                    <div 
                                                        key={loc}
                                                        className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/40 transition-colors"
                                                    >
                                                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                            <MapPin className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium">Branch Office {index + 1}</h3>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {loc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {industries.length > 0 && (
                                    <Card className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">
                                                    Industries We Serve
                                                </h2>
                                                <Badge variant="secondary" className="font-medium">
                                                    {industries.length} Industries
                                                </Badge>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {industries.map((industry: string) => (
                                                    <div
                                                        key={industry}
                                                        className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/40 transition-colors"
                                                    >
                                                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                            <Building2 className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium">
                                                                {industry}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Our team has extensive experience working across these industries, 
                                                delivering tailored solutions for each sector's unique challenges.
                                            </p>
                                        </div>
                                    </Card>
                                )}

                                <Card className="p-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">
                                            Budget & Pricing
                                        </h3>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {budgetRange && (
                                                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                                                    <div className={cn(
                                                        "p-2 rounded-md",
                                                        budgetRange.includes("Low") && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                                                        budgetRange.includes("Medium") && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                                                        budgetRange.includes("High") && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    )}>
                                                        <DollarSign className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-medium">Project Budget</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {budgetRange}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {hourlyRate && (
                                                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                                                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                        <Clock className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-medium">Hourly Rate</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {hourlyRate}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3 text-xs text-muted-foreground">
                                            * Prices may vary based on project requirements and scope
                                        </div>
                                    </div>
                                </Card>
                            </Card>

                            <Card className="w-full md:w-1/3 p-6 space-y-6 md:sticky md:top-20">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        Contact Agency
                                    </h2>
                                </div>
                                <ContactAgency agency={agency} />
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
                        
                        <div className="mt-16 pb-16">
                            <RelatedAgencies currentAgency={agency} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
