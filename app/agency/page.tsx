"use client";

import { AgenciesClient } from "./_components/agencies-client";
import Navbar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Agency } from "@/types/agency";
import { Skeleton } from "@/components/ui/skeleton";


interface FindAgenciesProps {
    searchParams: {
        search?: string;
        services?: string;
        industries?: string;
        locations?: string;
        budgetRange?: string;
    };
}

export default function FindAgencies() {
  const [agencies, setAgencies] = useState<Agency[] | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const serviceFilter = searchParams.get('services')?.split(',') || [];
  const locationFilter = searchParams.get('location')?.split(',') || [];
  
  const service = searchParams.get('services')?.split('-').join(' ');
  const location = searchParams.get('location')?.split('-').join(' ');

  const filteredAgencies = useMemo(() => {
    if (!agencies) return [];

    return agencies.filter(agency => {
      const matchesService = serviceFilter.length === 0 || 
        serviceFilter.some(s => 
          agency.services?.some((agencyService: string) => 
            agencyService.toLowerCase() === s.toLowerCase()
          )
        );

            // Location filtering
            const matchesLocation =
                locationFilter.length === 0 ||
                locationFilter.some((l) => {
                    const locationMatches =
                        agency.location?.toLowerCase() === l.toLowerCase();
                    const additionalLocationMatches =
                        agency.additionalLocations?.some(
                            (al: string) => al.toLowerCase() === l.toLowerCase()
                        );
                    return locationMatches || additionalLocationMatches;
                });

            return matchesService && matchesLocation;
        });
    }, [agencies, serviceFilter, locationFilter]);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await fetch("/api/agency");
                const data = await response.json();
                // Ensure we always set an array, even if empty
                setAgencies(Array.isArray(data.data) ? data.data : []);
            } catch (error) {
                console.error("Error fetching agencies:", error);
                setAgencies([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchAgencies();
    }, []);

    const LoadingSkeleton = () => (
        <>
        
            <Navbar />
            <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
                <div className="flex gap-8">
                    {/* Sidebar Skeleton */}
                    <div className="w-72 sticky top-28 self-start">
                        <div className="border rounded-lg p-4 space-y-6">
                            {/* Services Section */}
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-24" />
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>
                            {/* Locations Section */}
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-24" />
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-9 w-full" />{" "}
                            {/* Apply Filters button */}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Header */}
                        <div className="space-y-4 mb-8">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-20 w-full" />
                        </div>

                        {/* Agency Cards */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="border rounded-lg p-6"
                                >
                                    <div className="flex gap-6">
                                        <Skeleton className="h-[120px] w-[120px] rounded-lg" />
                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between">
                                                <div className="space-y-2">
                                                    <Skeleton className="h-6 w-48" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                                <Skeleton className="h-8 w-24 rounded-full" />
                                            </div>
                                            <Skeleton className="h-16 w-full" />
                                            <div className="flex justify-between">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-20" />
                                                <div className="flex gap-2">
                                                    {[1, 2, 3].map((bubble) => (
                                                        <Skeleton
                                                            key={bubble}
                                                            className="h-8 w-24 rounded-full"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                <Skeleton className="h-9 w-24" />
                                                <Skeleton className="h-9 w-24" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
                <div className="space-y-4 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        TOP Professional{" "}
                        {service
                            ? service.charAt(0).toUpperCase() + service.slice(1)
                            : "Digital"}{" "}
                        Services
                        {location && (
                            <span>
                                {" "}
                                in{" "}
                                {location.charAt(0).toUpperCase() +
                                    location.slice(1)}
                            </span>
                        )}
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Discover the top {service || "Digital Service"}{" "}
                        Companies
                        {location && ` in ${location}`}. Connect with
                        skilled marketing agencies from our curated community to
                        elevate your marketing strategy.
                    </p>
                </div>
                <div className="container mx-auto max-w-6xl px-4 py-8">
                    <AgenciesClient initialAgencies={filteredAgencies} />
                </div>
            </div>
            <Footer />
        </>
    );
}