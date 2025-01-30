"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, ChevronDown } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAllAgencies } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterState {
    search: string;
    services: string[];
    industries: string[];
    locations: string[];
    budgetRanges: { min: number; max: number }[];
}

interface SideBarFiltersProps {
    onFiltersChange: (filters: FilterState) => void;
}

interface Agency {
    services: string[];
    industries: string[];
    location: string;
}

const budgetRanges = [
    { label: "$1,000 - $5,000", min: 1000, max: 5000 },
    { label: "$5,000 - $10,000", min: 5000, max: 10000 },
    { label: "$10,000+", min: 10000, max: Infinity },
];

export default function SideBarFilters({
    onFiltersChange,
}: SideBarFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FilterState>({
        search: searchParams.get("search") || "",
        services: searchParams.getAll("service") || [],
        industries: searchParams.getAll("industry") || [],
        locations: searchParams.getAll("location") || [],
        budgetRanges: [],
    });

    const [metadata, setMetadata] = useState({
        allServices: [] as string[],
        allIndustries: [] as string[],
        allLocations: [] as string[],
    });

    // Fetch initial metadata
    useEffect(() => {
        async function fetchMetadata() {
            try {
                const agencies = await fetchAllAgencies();
                const getUniqueValues = <T,>(array: T[]): T[] => Array.from(new Set(array));
                
                setMetadata({
                    allServices: getUniqueValues(agencies.flatMap((agency: Agency) => agency.services)),
                    allIndustries: getUniqueValues(agencies.flatMap((agency: Agency) => agency.industries)),
                    allLocations: getUniqueValues(agencies.map((agency: Agency) => agency.location)),
                });
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        }
        fetchMetadata();
    }, []);

    // Update URL when filters change
    const updateURL = useCallback((newFilters: FilterState) => {
        const params = new URLSearchParams(window.location.search);
        
        // Update search parameter
        if (newFilters.search) {
            params.set("search", newFilters.search);
        } else {
            params.delete("search");
        }
        
        // Update services
        params.delete("service");
        newFilters.services.forEach(service => {
            params.append("service", service);
        });
        
        // Update industries
        params.delete("industry");
        newFilters.industries.forEach(industry => {
            params.append("industry", industry);
        });
        
        // Update locations
        params.delete("location");
        newFilters.locations.forEach(location => {
            params.append("location", location);
        });
        
        // Update budget ranges
        if (newFilters.budgetRanges.length > 0) {
            const minBudget = Math.min(...newFilters.budgetRanges.map(r => r.min));
            const maxBudget = Math.max(...newFilters.budgetRanges.map(r => r.max));
            params.set("minBudget", minBudget.toString());
            params.set("maxBudget", maxBudget.toString());
        } else {
            params.delete("minBudget");
            params.delete("maxBudget");
        }

        const queryString = params.toString();
        const currentPath = window.location.pathname;
        router.push(`${currentPath}${queryString ? `?${queryString}` : ""}`);
    }, [router]);

    // Update filters and URL when filter state changes
    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
        onFiltersChange(newFilters);
        updateURL(newFilters);
    }, [onFiltersChange, updateURL]);

    // Clear all filters
    const clearFilters = useCallback(() => {
        const emptyFilters = {
            search: "",
            services: [],
            industries: [],
            locations: [],
            budgetRanges: [],
        };
        setFilters(emptyFilters);
        onFiltersChange(emptyFilters);
        updateURL(emptyFilters);
    }, [onFiltersChange, updateURL]);

    const [openSections, setOpenSections] = useState({
        services: true,
        industries: true,
        location: true,
        budget: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFilterChange({ ...filters, search: e.target.value });
    };

    const toggleFilter = (type: keyof FilterState, value: any) => {
        const currentValues = filters[type] as any[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
        handleFilterChange({ ...filters, [type]: newValues });
    };

    const removeFilter = (type: keyof FilterState, value: any) => {
        handleFilterChange({ ...filters, [type]: (filters[type] as any[]).filter((v) => v !== value) });
    };

    // Notify parent component when filters change
    useEffect(() => {
        onFiltersChange(filters);
    }, [filters, onFiltersChange]);

    const appliedFiltersCount = useMemo(() => {
        return (
            (filters.search ? 1 : 0) +
            filters.services.length +
            filters.industries.length +
            filters.locations.length +
            filters.budgetRanges.length
        );
    }, [filters]);

    return (
        <div className="w-72 sticky top-28 self-start">
            <Card className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="">Filters</CardTitle>
                    {appliedFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            Clear all
                        </button>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                    className="w-full pl-7 px-2 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {appliedFiltersCount > 0 && (
                            <div>
                                <p className="font-semibold mb-2 text-muted-foreground">
                                    Applied Filters
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {filters.search && (
                                        <span className="px-2.5 py-0.5 rounded-full text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30 flex items-center gap-1">
                                            Search: {filters.search}
                                            <button
                                                onClick={() =>
                                                    handleFilterChange({ ...filters, search: "" })
                                                }
                                                className="hover:text-indigo-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                    {filters.services.map((service) => (
                                        <span
                                            key={service}
                                            className="px-2.5 py-0.5 rounded-full text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30 flex items-center gap-1"
                                        >
                                            {service}
                                            <button
                                                onClick={() =>
                                                    removeFilter("services", service)
                                                }
                                                className="hover:text-indigo-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                    {filters.industries.map((industry) => (
                                        <span
                                            key={industry}
                                            className="px-2.5 py-0.5 rounded-full text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30 flex items-center gap-1"
                                        >
                                            {industry}
                                            <button
                                                onClick={() =>
                                                    removeFilter("industries", industry)
                                                }
                                                className="hover:text-indigo-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Collapsible
                            open={openSections.services}
                            onOpenChange={() => toggleSection("services")}
                        >
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Services
                                </p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2 max-h-[200px] overflow-y-auto">
                                {metadata.allServices.map((service) => (
                                    <label
                                        key={service}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.services.includes(
                                                service
                                            )}
                                            onChange={() =>
                                                toggleFilter("services", service)
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">
                                            {service}
                                        </span>
                                    </label>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible
                            open={openSections.industries}
                            onOpenChange={() => toggleSection("industries")}
                        >
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Industries
                                </p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2 max-h-[200px] overflow-y-auto">
                                {metadata.allIndustries.map((industry) => (
                                    <label
                                        key={industry}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.industries.includes(
                                                industry
                                            )}
                                            onChange={() =>
                                                toggleFilter("industries", industry)
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">
                                            {industry}
                                        </span>
                                    </label>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible
                            open={openSections.location}
                            onOpenChange={() => toggleSection("location")}
                        >
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Location
                                </p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2 max-h-[200px] overflow-y-auto">
                                {metadata.allLocations.map((location) => (
                                    <label
                                        key={location}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.locations.includes(
                                                location
                                            )}
                                            onChange={() =>
                                                toggleFilter("locations", location)
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">
                                            {location}
                                        </span>
                                    </label>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible
                            open={openSections.budget}
                            onOpenChange={() => toggleSection("budget")}
                        >
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <p className="font-semibold text-muted-foreground">
                                    Budget Range
                                </p>
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 pt-2 max-h-[200px] overflow-y-auto">
                                {budgetRanges.map((range) => (
                                    <label
                                        key={range.label}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.budgetRanges.some(
                                                (r) =>
                                                    r.min === range.min &&
                                                    r.max === range.max
                                            )}
                                            onChange={() =>
                                                toggleFilter(
                                                    "budgetRanges",
                                                    range
                                                )
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">
                                            {range.label}
                                        </span>
                                    </label>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
