import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Star, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SideBarFilters from "./side-bar-filters";
import { agencies } from "./agencyData";

export default async function findAgencies() {
    return (
        <>
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
                            <Card
                                key={agency.id}
                                className="transition-all hover:shadow-lg"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="flex items-center gap-4 ">
                                        <div className="border-r p-4 ">
                                            <Image
                                                src={agency.logo}
                                                alt={`${agency.name} Logo`}
                                                width={48}
                                                height={48}
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <CardTitle className="text-xl font-semibold">
                                            {agency.name}
                                        </CardTitle>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <p className="text-muted-foreground">
                                            {agency.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-muted-foreground">
                                                    Category
                                                </p>
                                                <p className="text-base">
                                                    {agency.category}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-muted-foreground">
                                                    Google Rating
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="w-4 h-4 text-yellow-400"
                                                                    fill="currentColor"
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                    <span className="text-base font-medium">
                                                        {agency.rating}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        ({agency.reviews})
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-muted-foreground">
                                                    Location
                                                </p>
                                                <p className="text-base">
                                                    {agency.location}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-muted-foreground">
                                                    Services
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {agency.services.map(
                                                        (service, index) => (
                                                            <span
                                                                key={index}
                                                                className={`px-2.5 py-0.5 rounded-full text-sm bg-${service.color}-100 text-${service.color}-700 border border-${service.color}-200 dark:bg-${service.color}-900/30 dark:text-${service.color}-300 dark:border-${service.color}-700/30`}
                                                            >
                                                                {service.name}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-semibold text-muted-foreground">
                                                        Budget Range
                                                    </p>
                                                    <p className="text-base">
                                                        {agency.budgetRange}
                                                    </p>
                                                </div>
                                                <Button>Contact Agency</Button>
                                                {/* <ContactAgencyModal /> */}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <SideBarFilters />
                </div>
            </div>
        </>
    );
}
