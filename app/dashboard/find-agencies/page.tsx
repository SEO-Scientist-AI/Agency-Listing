import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SideBarFilters from "./side-bar-filters";
import prisma from "@/lib/prisma";
import { Suspense } from 'react';

interface PageProps {
    params: Promise<{}>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getAgencies() {
    try {
        const agencies = await prisma.agency.findMany({
            include: {
                services: true,
            },
        });
        return agencies;
    } catch (error) {
        console.error('Error fetching agencies:', error);
        return [];
    }
}

export default async function FindAgencies({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const agencies = await getAgencies();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container mx-auto max-w-7xl py-8">
                <div className="space-y-4 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        TOP Professional APP Store Optimization Services
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Discover the top 234 APP Store Optimization Companies
                        worldwide. Connect with skilled marketing agencies from
                        our curated community to elevate your marketing
                        strategy.
                    </p>
                </div>

                <div className="flex gap-6">
                    <div className="flex-1 grid gap-6">
                        {agencies.map((agency) => (
                            <Link href={`/dashboard/find-agencies/${agency.slug}`} key={agency.id}>
                                <Card className="transition-all hover:shadow-lg cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={agency.logo}
                                                alt={`${agency.name} Logo`}
                                                width={40}
                                                height={40}
                                                className="rounded-lg"
                                            />
                                            <div>
                                                <CardTitle className="text-lg font-semibold">
                                                    {agency.name}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span>{agency.rating}★</span>
                                                    <span>({agency.reviews})</span>
                                                    <span>•</span>
                                                    <span>{agency.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </CardHeader>

                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                            {agency.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {agency.services.map((service) => (
                                                <span
                                                    key={service.id}
                                                    className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center pt-2 border-t">
                                            <span className="text-sm font-medium">
                                                {agency.budgetRange}
                                            </span>
                                            <Button size="sm">Contact</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    <SideBarFilters />
                </div>
            </div>
        </Suspense>
    );
}
