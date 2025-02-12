"use client";

import { useEffect } from "react";
import { use } from "react";
import { AgenciesClient } from "../../_components/agencies-client";
import Navbar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";
import { useRouter } from "next/navigation";
import useAppStore from "@/lib/store/useAppStore";

interface CityAgencyListPageProps {
  params: Promise<{
    city: string;
  }>;
}

export default function CityAgencyListPage({ params }: CityAgencyListPageProps) {
  const router = useRouter();
  const { cities } = useAppStore();
  const resolvedParams = use(params);
  const citySlug = resolvedParams.city;
  
  useEffect(() => {
    // Validate if the city exists in our database
    const cityExists = cities.some(c => c.citySlug === citySlug);
    if (!cityExists) {
      router.push('/agency'); // Redirect to main agency page if city not found
      return;
    }
  }, [cities, citySlug, router]);

  const cityData = cities.find(c => c.citySlug === citySlug);
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-8 pt-24 grid grid-cols-1 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Top Professional Services in {cityData?.cityName || citySlug}
        </h1>
        <p className="text-base text-muted-foreground">
          Discover the top Companies in {cityData?.cityName || citySlug}. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.
        </p>
      </div>
      <AgenciesClient initialLocation={citySlug} />
      <Footer />
    </>
  );
} 