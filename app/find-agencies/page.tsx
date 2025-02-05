"use client";

import { AgenciesClient } from './_components/agencies-client';
import Navbar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Agency } from '@/types/agency';

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
  const serviceFilter = searchParams.get('service')?.split(',') || [];
  const locationFilter = searchParams.get('location')?.split(',') || [];

  const filteredAgencies = useMemo(() => {
    if (!agencies) return [];
    
    return agencies.filter(agency => {
      // Service filtering
      const matchesService = serviceFilter.length === 0 || 
        serviceFilter.some(s => 
          agency.services?.some((agencyService: string) => 
            agencyService.toLowerCase() === s.toLowerCase()
          )
        );
      
      // Location filtering
      const matchesLocation = locationFilter.length === 0 ||
        locationFilter.some(l => {
          const locationMatches = agency.location?.toLowerCase() === l.toLowerCase();
          const additionalLocationMatches = agency.additionalLocations?.some(
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
        const response = await fetch('/api/find-agencies');
        const data = await response.json();
        // Ensure we always set an array, even if empty
        setAgencies(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching agencies:', error);
        setAgencies([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>  
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            TOP Professional APP Store Optimization Services
          </h1>
          <p className="text-base text-muted-foreground">
            Discover the top APP Store Optimization Companies
            worldwide. Connect with skilled marketing agencies from
            our curated community to elevate your marketing
            strategy.
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