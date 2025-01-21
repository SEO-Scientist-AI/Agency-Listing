'use client';

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import SideBarFilters from "./side-bar-filters";
import { agencies } from "./agency-card-data";
import { AgencyCard } from "./agency-card-data";
import { Suspense, useState, useMemo } from 'react';

interface FilterState {
    search: string;
    services: string[];
    industries: string[];
    locations: string[];
    budgetRanges: { min: number; max: number }[];
}

export default function FindAgencies() {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        services: [],
        industries: [],
        locations: [],
        budgetRanges: [],
    });

    const filteredAgencies = useMemo(() => {
        return agencies.filter(agency => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const searchMatch = 
                    agency.name.toLowerCase().includes(searchLower) ||
                    agency.description.toLowerCase().includes(searchLower) ||
                    agency.tagline.toLowerCase().includes(searchLower);
                if (!searchMatch) return false;
            }

            // Services filter
            if (filters.services.length > 0) {
                const hasService = agency.services.some(service => 
                    filters.services.includes(service)
                );
                if (!hasService) return false;
            }

            // Industries filter
            if (filters.industries.length > 0) {
                const hasIndustry = agency.industries.some(industry =>
                    filters.industries.includes(industry)
                );
                if (!hasIndustry) return false;
            }

            // Location filter
            if (filters.locations.length > 0) {
                if (!filters.locations.includes(agency.location)) return false;
            }

            // Budget filter
            if (filters.budgetRanges.length > 0) {
                const price = parseInt(agency.startingPrice.match(/\$(\d+,)*\d+/)?.[0].replace(/\$|,/g, '') || '0');
                const matchesBudget = filters.budgetRanges.some(range => 
                    price >= range.min && price <= range.max
                );
                if (!matchesBudget) return false;
            }

            return true;
        });
    }, [filters]);

    return (
        <div className="container mx-auto max-w-7xl py-8">
            <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    TOP Professional APP Store Optimization Services
                </h1>
                <p className="text-base text-muted-foreground">
                    Discover the top APP Store Optimization Companies
                    worldwide. Connect with skilled marketing agencies from
                    our curated community to elevate your marketing
                    strategy.
                </p>
            </div>

            <div className="flex gap-6">
                <div className="flex-1 space-y-6">
                    <Suspense fallback={<div>Loading...</div>}>
                        {filteredAgencies.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-lg text-muted-foreground">No agencies found matching your filters.</p>
                                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
                            </div>
                        ) : (
                            filteredAgencies.map((agency) => (
                                <AgencyCard
                                    key={agency.id}
                                    {...agency}
                                />
                            ))
                        )}
                    </Suspense>
                </div>
                <SideBarFilters onFiltersChange={setFilters} />
            </div>
        </div>
    );
}
