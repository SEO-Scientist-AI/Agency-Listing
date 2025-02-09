"use client";

import { AgenciesClient } from './_components/agencies-client';
import Navbar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Agency } from '@/types/agency';
import { Skeleton } from "@/components/ui/skeleton"

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
      <Footer />
    </>
  );



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
          <AgenciesClient  />
        </div>
      </div>
      <Footer />
    </>
  );
}