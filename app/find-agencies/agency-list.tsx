'use client';

import { Suspense, useState, useMemo } from 'react';
import { AgencyCard } from "./agency-card";
import SideBarFilters from "./side-bar-filters";

interface FilterState {
    search: string;
    services: string[];
    industries: string[];
    locations: string[];
    budgetRanges: { min: number; max: number }[];
}

interface Agency {
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

interface AgencyListProps {
    initialAgencies: Agency[];
}

export function AgencyList({ initialAgencies }: AgencyListProps) {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        services: [],
        industries: [],
        locations: [],
        budgetRanges: [],
    });

    const filteredAgencies = useMemo(() => {
        return initialAgencies.filter((agency: Agency) => {
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
                const hasService = agency.services.some((service: string) => 
                    filters.services.includes(service)
                );
                if (!hasService) return false;
            }

            // Industries filter
            if (filters.industries.length > 0) {
                const hasIndustry = agency.industries.some((industry: string) =>
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
                const matchesBudget = filters.budgetRanges.some(range => 
                    agency.min_budget >= range.min && agency.max_budget <= range.max
                );
                if (!matchesBudget) return false;
            }

            return true;
        });
    }, [filters, initialAgencies]);

    return (
        <div className="flex gap-6">
            <div className="flex-1 space-y-6">
                <Suspense fallback={<div>Loading...</div>}>
                    {filteredAgencies.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-lg text-muted-foreground">No agencies found matching your filters.</p>
                            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
                        </div>
                    ) : (
                        filteredAgencies.map((agency: Agency) => (
                            <AgencyCard
                                key={agency.slug}
                                {...agency}
                            />
                        ))
                    )}
                </Suspense>
            </div>
            <SideBarFilters onFiltersChange={setFilters} />
        </div>
    );
}
