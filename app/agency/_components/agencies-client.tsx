"use client";

import { useState, useEffect, useMemo } from "react";
import { AgencyCard } from "./agency-card";
import SideBarFilters from "./side-bar-filters";
import { Agency } from "@/types/agency";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface FilterState {
    search: string;
    services: string[];
    industries: string[];
    locations: string[];
    budgetRanges: { min: number; max: number }[];
    min: number;
    max: number;
}

interface AgenciesClientProps {
    initialAgencies: Agency[];
}

export function LoadingAgencyCard() {
    return (
        <Card>
            <CardContent className="p-6 flex gap-6">
                <div className="flex-shrink-0">
                    <Skeleton className="w-[120px] h-[120px] rounded-lg" />
                </div>
                <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                    <div className="flex justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton
                                    key={i}
                                    className="h-8 w-24 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function AgenciesClient({ initialAgencies }: AgenciesClientProps) {
    const searchParams = useSearchParams();
    const [agencies, setAgencies] = useState<Agency[]>(initialAgencies || []);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        services: [],
        industries: [],
        locations: [],
        budgetRanges: [],
        min: 0,
        max: 0,
    });
    
    useEffect(() => {
        async function fetchAgencies() {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(window.location.search);
                const services = searchParams.get("services")?.split(" ") || [];
                const location = searchParams.get("location")?.split(" ") || [];
        
                const response = await fetch(
                    `/api/agency?${new URLSearchParams({
                        page: "1",
                        ...(services.length > 0 && {
                            services: services.join(" "),
                        }),
                        ...(location.length > 0 && {
                            location: location.join(" "),
                        }),
                    })}`
                );
        
                const data = await response.json();
                if (data.success) {
                    setAgencies(data.data.agencies || []);
                    setTotalPages(data.data.totalPages);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setAgencies([]);
            } finally {
                setLoading(false);
            }
        }
        fetchAgencies();
    }, [searchParams]);

    const handlePageChange = async (page: number) => {
        if (page === currentPage || loading) return;

        try {
            setLoading(true);
            const searchParams = new URLSearchParams(window.location.search);
            const services = searchParams.get("services")?.split(" ") || [];
            const locations = searchParams.get("location")?.split(" ") || [];

            const response = await fetch(
                `/api/agency?${new URLSearchParams({
                    page: page.toString(),
                    ...(services.length > 0 && {
                        services: services.join(","),
                    }),
                    ...(locations.length > 0 && {
                        locations: locations.join(","),
                    }),
                })}`
            );

            const data = await response.json();

            if (data.success) {
                setAgencies(data.data.agencies || []);
                setCurrentPage(page);
            }
        } catch (error) {
            console.error("Error changing page:", error);
            setAgencies([]);
        } finally {
            setLoading(false);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    const filteredAgencies = useMemo(() => {
        const agencyArray = Array.isArray(agencies) ? agencies : [];
        return agencyArray.filter((agency) => {
            if (!agency) return false;

            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const nameMatch = agency.name
                    ?.toLowerCase()
                    .includes(searchLower);
                const descriptionMatch = agency.description
                    ?.toLowerCase()
                    .includes(searchLower);
                if (!nameMatch && !descriptionMatch) return false;
            }

            if (filters.services.length > 0) {
                const hasService = filters.services.some((service) =>
                    agency.services?.includes(service)
                );
                if (!hasService) return false;
            }

            if (filters.locations.length > 0) {
                const hasLocation = filters.locations.some(
                    (location) =>
                        agency.location
                            ?.toLowerCase()
                            .includes(location.toLowerCase()) ||
                        agency.additionalLocations?.some((al) =>
                            al.toLowerCase().includes(location.toLowerCase())
                        )
                );
                if (!hasLocation) return false;
            }

            return true;
        });
    }, [agencies, filters]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 container mx-auto max-w-7xl px-4">
            <div className="lg:w-1/4">
                <SideBarFilters onFiltersChange={setFilters} />
            </div>
            <div className="lg:w-3/4">
                <div className="space-y-6">
                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <LoadingAgencyCard key={i} />
                            ))}
                        </div>
                    ) : filteredAgencies.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-lg text-muted-foreground">
                                No agencies found
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Try adjusting your filters
                            </p>
                        </div>
                    ) : (
                        <>
                            {filteredAgencies.map((agency) => (
                                <AgencyCard
                                    key={agency.id}
                                    agency={agency}
                                    className="w-full"
                                />
                            ))}
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1) {
                                                    handlePageChange(
                                                        currentPage - 1
                                                    );
                                                }
                                            }}
                                        />
                                    </PaginationItem>

                                    {currentPage > 3 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(1);
                                                    }}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        </>
                                    )}

                                    {renderPageNumbers()}

                                    {currentPage < totalPages - 2 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(
                                                            totalPages
                                                        );
                                                    }}
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages) {
                                                    handlePageChange(
                                                        currentPage + 1
                                                    );
                                                }
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
