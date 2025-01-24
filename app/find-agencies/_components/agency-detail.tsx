"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
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
import NavBar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";

const GoogleLogo = () => (
    <Image
        src="/images/google-logo.svg"
        alt="Google Logo"
        width={16}
        height={16}
        className="mr-1"
    />
);

interface AgencyDetailComponentProps {
    agency: any; // You can replace 'any' with your Agency type from Prisma
}

export function AgencyDetailComponent({ agency }: AgencyDetailComponentProps) {
    return (
        <>
            <NavBar />
            <div className="container mx-auto max-w-7xl px-4 py-8 ">
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start mt-[8vh]">
                        <Card className="w-full md:w-2/3 p-6 space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                                    <Building2 className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold">
                                        {agency.name}
                                    </h1>
                                    <p className="text-xl text-muted-foreground mt-2">
                                        {agency.tagline}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 mt-4">
                                        <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                                            <GoogleLogo />
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                <span className="font-medium ml-1">
                                                    {agency.googleReview.rating}
                                                </span>
                                                <span className="text-muted-foreground ml-1">
                                                    ({agency.googleReview.count} reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            {agency.location}
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            Founded {agency.founded}
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Users className="w-4 h-4" />
                                            {agency.teamSize} employees
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">
                                    About {agency.name}
                                </h2>
                                <div className="prose prose-sm max-w-none text-muted-foreground">

                                    {agency.description.split("\n\n").map((paragraph: string, index: number) => (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {agency.additionalLocations.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">
                                        Additional Locations
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {agency.additionalLocations.map((location: string) => (
                                            <Badge key={location} variant="secondary">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {location}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h2 className="text-xl font-semibold mb-3">Services</h2>
                                <div className="flex flex-wrap gap-2">
                                    {agency.services.map((service: string) => (
                                        <Badge key={service} variant="secondary">
                                            {service}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">Industries</h2>
                                <div className="flex flex-wrap gap-2">
                                    {agency.industries.map((industry: string) => (
                                        <Badge key={industry} variant="outline">
                                            {industry}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">SEO Expertise</h3>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        {agency.expertise.seo.map((item: string) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Marketing Expertise</h3>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        {agency.expertise.marketing.map((item: string) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Development Expertise</h3>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        {agency.expertise.development.map((item: string) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        <Card className="w-full md:w-1/3 p-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Get in Touch</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                                        <span>Starting from {agency.startingPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe2 className="w-5 h-5 text-muted-foreground" />
                                        <span>{agency.geographicFocus.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Languages className="w-5 h-5 text-muted-foreground" />
                                        <span>{agency.languages.join(", ")}</span>
                                    </div>
                                </div>
                                <ContactModal
                                    agency={agency}
                                    trigger={
                                        <Button className="w-full">Contact Agency</Button>
                                    }
                                />
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-medium mb-3">Client Business Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agency.clientSize.map((size: string) => (
                                        <Badge key={size} variant="outline">
                                            {size}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Budget Ranges</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agency.budgetRange.map((range: string) => (
                                        <Badge key={range} variant="outline">
                                            {range}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Project Duration</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agency.projectDuration.map((duration: string) => (
                                        <Badge key={duration} variant="outline">
                                            {duration}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-medium mb-2">Why work with us?</h3>
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
            <Footer />
        </>
    );
}
