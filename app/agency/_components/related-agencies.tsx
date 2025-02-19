"use client";

import { Agency } from "@/types/agency";
import { AgencyCard } from "./agency-card";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";

interface RelatedAgenciesProps {
  currentAgency: Agency;
}

export function RelatedAgencies({ currentAgency }: RelatedAgenciesProps) {
  const [relatedAgencies, setRelatedAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate the section title
  const getSectionTitle = () => {
    if (currentAgency.services?.[0] && currentAgency.location) {
      return `More ${currentAgency.services[0]} Agencies in ${currentAgency.location}`;
    } else if (currentAgency.services?.[0]) {
      return `Other ${currentAgency.services[0]} Agencies`;
    } else if (currentAgency.location) {
      return `Other Agencies in ${currentAgency.location}`;
    }
    return "Similar Agencies";
  };

  useEffect(() => {
    const fetchRelatedAgencies = async () => {
      try {
        // Construct query params from either services or location
        const params = new URLSearchParams();
        if (currentAgency.services?.[0]) {
          params.set('services', currentAgency.services[0]);
        }
        if (currentAgency.location) {
          params.set('location', currentAgency.location.toLowerCase());
        }

        const response = await axiosInstance.get(`/agency?${params.toString()}`);
        
        // Filter out current agency and get random 3 agencies
        const filteredAgencies = response.data.agencies
          .filter((agency: Agency) => agency.id !== currentAgency.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        setRelatedAgencies(filteredAgencies);
      } catch (error) {
        console.error('Error fetching related agencies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedAgencies();
  }, [currentAgency]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-[200px]" />
        ))}
      </div>
    );
  }

  if (relatedAgencies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Separator className="my-8" />
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            {getSectionTitle()}
          </h2>
          <p className="text-sm text-muted-foreground">
            {relatedAgencies.length} agencies found
          </p>
        </div>
        <div className="grid gap-8">
          {relatedAgencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      </div>
    </div>
  );
} 