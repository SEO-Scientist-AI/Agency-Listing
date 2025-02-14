"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AgencyCard } from "./agency-card";
import SideBarFilters from "./side-bar-filters";
import { Agency } from "@/types/agency";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useAppStore from "@/lib/store/useAppStore";
import axiosInstance from "@/lib/axios-instance";

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
  servicesSlug?: string;
  locationSlug?:string;
}

// Modify the cache structure to store data by page
let clientCache = {
  data: {} as Record<string, any>,
  timestamp: {} as Record<string, number>,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

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
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
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

export function AgenciesClient({ servicesSlug, locationSlug }: AgenciesClientProps) {
  const { agencies: filteredAgencies, setAgencies, currentPage, totalPages } = useAppStore();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleAgencies = useCallback(async (page = "1") => {
    try {
      setLoading(true);
      
      // Create a cache key based on current filters and page
      const cacheKey = `${servicesSlug || ''}-${locationSlug || ''}-${page}`;
      const now = Date.now();

      // Check cache for this specific page and filters
      if (
        clientCache.data[cacheKey] && 
        clientCache.timestamp[cacheKey] && 
        (now - clientCache.timestamp[cacheKey]) < clientCache.CACHE_DURATION
      ) {
        setAgencies(clientCache.data[cacheKey]);
        return;
      }

      const params = new URLSearchParams();
      params.set("page", page);

      if (servicesSlug) {
        params.set("services", servicesSlug);
      }

      if (locationSlug) {
        params.set("location", locationSlug);
      }

      const response = await axiosInstance.get(`/agency?${params.toString()}`);
      const data = await response.data;
      
      if (data.success) {
        // Update cache for this specific page and filters
        clientCache.data[cacheKey] = data;
        clientCache.timestamp[cacheKey] = now;
        
        setAgencies(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [servicesSlug, locationSlug, setAgencies]);

  // Clear cache when filters change
  useEffect(() => {
    clientCache.data = {};
    clientCache.timestamp = {};
    handleAgencies("1"); // Reset to first page when filters change
  }, [servicesSlug, locationSlug, handleAgencies]);

  const handlePageChange = useCallback(async (page: number) => {
    if (page === currentPage || loading) return;
    handleAgencies(page.toString());
  }, [currentPage, loading, handleAgencies]);

  const renderPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5; // Number of page buttons to show
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
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
      );

      // Add ellipsis if there's a gap
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Add middle pages
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

    // Always show last page
    if (endPage < totalPages) {
      // Add ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <div className="container flex flex-col lg:flex-row gap-8 mx-auto max-w-6xl px-4">
      <div className="lg:w-1/4">
        <SideBarFilters servicesSlug={servicesSlug} locationSlug={locationSlug} />
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
              <p className="text-lg text-muted-foreground">No agencies found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <>
              {filteredAgencies.map((agency: Agency) => (
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
                          handlePageChange(currentPage - 1);
                        }
                      }}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {renderPageNumbers()}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          handlePageChange(currentPage + 1);
                        }
                      }}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
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
