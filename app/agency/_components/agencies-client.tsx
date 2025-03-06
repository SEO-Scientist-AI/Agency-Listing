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
import { useAgencies } from "@/lib/hooks/use-agencies";
import { AgencyCardSkeleton } from "./agency-card-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isScrolling, setIsScrolling] = useState(false);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDocId, setLastDocId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Memoize the params construction
  const params = useMemo(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (servicesSlug || searchParams.get("services")) {
      newParams.set("services", servicesSlug || searchParams.get("services") || "");
    }
    if (locationSlug || searchParams.get("location")) {
      newParams.set("location", locationSlug || searchParams.get("location") || "");
    }
    
    return newParams;
  }, [searchParams, servicesSlug, locationSlug]);
  
  const { totalPages, currentPage, isLoading: apiLoading, mutate } = useAgencies(params);

  const scrollToTop = useCallback(() => {
    setIsScrolling(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), 1000);
  }, []);

  const handlePageChange = useCallback(async (page: number) => {
    if (page === currentPage || isLoading || isScrolling) return;
    
    // Update URL with new page number
    const newParams = new URLSearchParams(params);
    newParams.set("page", page.toString());
    
    // Update URL without refresh
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    
    // Start scroll before loading
    scrollToTop();
    
    // Trigger refetch with new params
    await mutate();
  }, [currentPage, isLoading, isScrolling, params, pathname, router, mutate, scrollToTop]);

  const renderPageNumbers = useCallback(() => {
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
  }, [currentPage, totalPages, handlePageChange]);

  const fetchMoreAgencies = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', (page + 1).toString());
      if (lastDocId) {
        params.set('lastDocId', lastDocId);
      }

      const response = await axiosInstance.get(`/agency?${params.toString()}`);
      const data = response.data;

      setAgencies(prev => [...prev, ...data.agencies]);
      setLastDocId(data.lastDocId);
      setHasMore(data.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching more agencies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col lg:flex-row gap-8 mx-auto max-w-6xl px-4">
      <div className="lg:w-1/4">
        <SideBarFilters servicesSlug={servicesSlug} locationSlug={locationSlug} />
      </div>
      <div className="lg:w-3/4">
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <AgencyCardSkeleton key={i} />
              ))}
            </div>
          ) : agencies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">No agencies found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div>
              <InfiniteScroll
                dataLength={agencies.length}
                next={fetchMoreAgencies}
                hasMore={hasMore}
                loader={
                  <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                      <AgencyCardSkeleton key={i} />
                    ))}
                  </div>
                }
                endMessage={
                  <p className="text-center text-muted-foreground py-8">
                    No more agencies to load
                  </p>
                }
              >
                <div className="grid gap-4">
                  {agencies.map((agency: Agency) => (
                    <AgencyCard
                      key={agency.id}
                      agency={agency}
                      className="w-full mb-6"
                    />
                  ))}
                </div>
              </InfiniteScroll>
              {agencies.length > 0 && totalPages > 1 && (
                <Pagination className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
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
                        {currentPage > 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {renderPageNumbers()}

                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
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
                      </>
                    )}

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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
