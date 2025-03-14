"use client";

import { Agency } from "@/types/agency";
import { AgencyCard } from "./agency-card";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";

interface ArchiveRelatedAgenciesProps {
  service?: string;
  location?: string;
  excludeIds?: string[]; // IDs of agencies already shown in the pagination
}

export function ArchiveRelatedAgencies({ 
  service, 
  location, 
  excludeIds = [] 
}: ArchiveRelatedAgenciesProps) {
  const [relatedAgencies, setRelatedAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Updated function to generate better section titles
  const getSectionTitle = () => {
    const serviceName = service
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const locationName = location
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (service && location) {
      return `Other ${serviceName} Agencies You May Like`;
    } else if (service) {
      return `Featured ${serviceName} Agencies`;
    } else if (location) {
      return `Top Agencies in ${locationName}`;
    }
    return "Recommended Agencies";
  };

  useEffect(() => {
    const fetchRelatedAgencies = async () => {
      try {
        const params = new URLSearchParams();
        
        if (service && location) {
          params.set('services', service);
        }
        else if (service) {
          params.set('services', service);
        }
        else if (location) {
          // Intentionally not setting location to get agencies from other areas
        }

        // Add a limit parameter to get only 3 agencies from the server
        params.set('limit', '3');
        
        const response = await axiosInstance.get(`/agency?${params.toString()}`);
        
        // Simply filter out excluded agencies without random sorting
        const filteredAgencies = response.data.agencies
          .filter((agency: Agency) => !excludeIds.includes(agency._id))
          .slice(0, 3);

        setRelatedAgencies(filteredAgencies);
      } catch (error) {
        console.error('Error fetching related agencies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedAgencies();
  }, [service, location, excludeIds]);

  if (isLoading) {
    return (
      <section className="w-full border-t bg-background">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-8 w-64 bg-muted rounded animate-pulse" />
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[200px] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (relatedAgencies.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              {getSectionTitle()}
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing {relatedAgencies.length} agencies
            </p>
          </div>
          <div className="grid gap-6">
            {relatedAgencies.map((agency) => (
              <AgencyCard key={agency._id} agency={agency} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 