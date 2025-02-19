"use client";

import * as React from "react";
import { AgenciesClient } from './agencies-client';
import { Skeleton } from "@/components/ui/skeleton"
import useAppStore from "@/lib/store/useAppStore";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface FindAgenciesProps {
    servicesSlug?: string;
    locationSlug?:string;
}

const LoadingSkeleton = () => (
  <>
    
    <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
      <div className="flex gap-8">
        {/* Sidebar Skeleton */}
        <div className="w-72 sticky top-28 self-start">
          <div className="border rounded-lg p-4 space-y-6">
            {/* Services Section */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
            
            {/* Locations Section */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
            
            <Skeleton className="h-9 w-full" /> {/* Apply Filters button */}
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
              <div key={item} className="border rounded-lg p-6">
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
                          <Skeleton key={bubble} className="h-8 w-24 rounded-full" />
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
  </>
);

export default function FindAgencies({servicesSlug,locationSlug}:FindAgenciesProps) {
  
  const { services, cities } = useAppStore();
  const selectedServices = servicesSlug?.split(' ') || [];
  const selectedLocations = locationSlug?.split(' ') || [];
  const [totalAgencies, setTotalAgencies] = useState(0);
  
  const getNextYear = () => {
    return new Date().getFullYear() + 1;
  };

  const getDisplayTitle = () => {
    const serviceNames = selectedServices
      .map(slug => services.find(s => s.slug === slug)?.serviceName)
      .filter(Boolean)
      .join(', ');
      
    const locationNames = selectedLocations
      .map(slug => cities.find(c => c.citySlug === slug)?.cityName)
      .filter(Boolean)
      .join(', ');

    if (serviceNames && locationNames) {
      return `${totalAgencies} Best ${serviceNames} Agency in ${locationNames} in ${getNextYear()} (Updated List)`;
    } else if (serviceNames) {
      return `${totalAgencies} Top ${serviceNames} Agency Worldwide in ${getNextYear()} (Updated List)`;
    } else if (locationNames) {
      return `${totalAgencies} Trusted Agency in ${locationNames} in ${getNextYear()} (Updated List)`;
    }
    
    return `Top Professional Agency Worldwide in ${getNextYear()} (Updated List)`;
  };

  const getDisplayDescription = () => {    
    const serviceNames = selectedServices
      .map(slug => services.find(s => s.slug === slug)?.serviceName)
      .filter(Boolean)
      .join(', ');
      
    const locationNames = selectedLocations
      .map(slug => cities.find(c => c.citySlug === slug)?.cityName)
      .filter(Boolean)
      .join(', ');

    if (serviceNames && locationNames) {
      return `Discover the top ${serviceNames} Companies in ${locationNames}. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.`;
    }
    
    return "Discover the top Companies worldwide. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.";
  };

  useEffect(() => {
    const updateTotalAgencies = async () => {
      try {
        const params = new URLSearchParams();
        if (servicesSlug) params.append('services', servicesSlug);
        if (locationSlug) params.append('location', locationSlug);
        
        const response = await fetch(`/api/agency/count?${params.toString()}`);
        const data = await response.json();
        setTotalAgencies(data.count || 0);
      } catch (error) {
        console.error('Error fetching total agencies:', error);
        setTotalAgencies(0);
      }
    };

    updateTotalAgencies();
  }, [servicesSlug, locationSlug]);

  return (
    <>  
      <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
        <nav className="mb-6" aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li role="presentation" aria-hidden="true" className="[&>svg]:h-3.5 [&>svg]:w-3.5">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Link href="/agency" className="transition-colors hover:text-foreground">
                Agencies
              </Link>
            </li>
            {selectedServices.map((serviceSlug, index) => {
              const service = services.find(s => s.slug === serviceSlug);
              return service ? (
                <React.Fragment key={serviceSlug}>
                  <li role="presentation" aria-hidden="true" className="[&>svg]:h-3.5 [&>svg]:w-3.5">
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    {index === selectedServices.length - 1 && !selectedLocations.length ? (
                      <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground">
                        {service.serviceName}
                      </span>
                    ) : (
                      <Link href={`/agency/list/${serviceSlug}`} className="transition-colors hover:text-foreground">
                        {service.serviceName}
                      </Link>
                    )}
                  </li>
                </React.Fragment>
              ) : null;
            })}
            {selectedLocations.map((locationSlug, index) => {
              const location = cities.find(c => c.citySlug === locationSlug);
              return location ? (
                <React.Fragment key={locationSlug}>
                  <li role="presentation" aria-hidden="true" className="[&>svg]:h-3.5 [&>svg]:w-3.5">
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    {index === selectedLocations.length - 1 ? (
                      <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground">
                        {location.cityName}
                      </span>
                    ) : (
                      <Link href={`/agency/list/${locationSlug}`} className="transition-colors hover:text-foreground">
                        {location.cityName}
                      </Link>
                    )}
                  </li>
                </React.Fragment>
              ) : null;
            })}
          </ol>
        </nav>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {getDisplayTitle()}
          </h1>
          <p className="text-base text-muted-foreground">
            {getDisplayDescription()}
          </p>
        </div>
      </div>
      <AgenciesClient servicesSlug={servicesSlug} locationSlug={locationSlug} />
    </>
  );
}