"use client"

import { Suspense, useState, useMemo } from "react"
import { AgencyCard } from "./agency-card"
import SideBarFilters from "./side-bar-filters"

interface FilterState {
    search: string
    services: string[]
    industries: string[]
    locations: string[]
    budgetRanges: { min: number; max: number }[]
}

export function AgenciesClient({ initialAgencies }: { initialAgencies: any[] }) {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        services: [],
        industries: [],
        locations: [],
        budgetRanges: [],
    })

    const filteredAgencies = useMemo(() => {
        return initialAgencies.filter((agency) => {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase()
                const searchMatch =
                    agency.name.toLowerCase().includes(searchLower) ||
                    agency.description.toLowerCase().includes(searchLower) ||
                    agency.tagline.toLowerCase().includes(searchLower)
                if (!searchMatch) return false
            }

            if (filters.services.length > 0) {
                const hasService = agency.services.some((service: string) =>
                    filters.services.includes(service)
                )
                if (!hasService) return false
            }

            if (filters.industries.length > 0) {
                const hasIndustry = agency.industries.some((industry: string) =>
                    filters.industries.includes(industry)
                )
                if (!hasIndustry) return false
            }

            if (filters.locations.length > 0) {
                if (!filters.locations.includes(agency.location)) return false
            }

            if (filters.budgetRanges.length > 0) {
                const price = parseInt(
                    agency.startingPrice
                        .match(/\$(\d+,)*\d+/)?.[0]
                        .replace(/\$|,/g, "") || "0"
                )
                const matchesBudget = filters.budgetRanges.some(
                    (range) => price >= range.min && price <= range.max
                )
                if (!matchesBudget) return false
            }

            return true
        })
    }, [filters, initialAgencies])

    return (
        <div className="flex flex-col md:flex-row-reverse gap-6">
            <div className="flex-1 space-y-6">
                <Suspense fallback={<div>Loading...</div>}>
                    {filteredAgencies.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-lg text-muted-foreground">
                                No agencies found matching your filters.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Try adjusting your filters to see more results.
                            </p>
                        </div>
                    ) : (
                        filteredAgencies.map((agency) => (
                            <AgencyCard key={agency.id} {...agency} />
                        ))
                    )}
                </Suspense>
            </div>
            <SideBarFilters onFiltersChange={setFilters} />
        </div>
    )
}
