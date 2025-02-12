"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { AgenciesClient } from "../../_components/agencies-client";
import Navbar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";
import { useRouter } from "next/navigation";
import useAppStore from "@/lib/store/useAppStore";
import { LoadingAgencyCard } from "@/app/agency/_components/agencies-client";
import { formatSlug } from "@/lib/firebase/agencies";

interface CityAgencyListPageProps {
  params: Promise<{
    city: string;
  }>;
}

export default function CityAgencyListPage({ params }: CityAgencyListPageProps) {
  const router = useRouter();
  const { cities, fetchCities } = useAppStore();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const resolvedParams = use(params);
  const citySlug = resolvedParams.city;
  
  useEffect(() => {
    const validateCity = async () => {
      try {
        setIsValidating(true);
        console.log('Validating city:', citySlug);
        console.log('Current cities:', cities);
        
        // First ensure cities are loaded
        if (cities.length === 0) {
          console.log('Fetching cities...');
          await fetchCities();
          console.log('Cities after fetch:', cities);
        }
        
        // Check if city exists in our cities data
        const cityExists = cities.some(c => {
          const cityNameSlug = formatSlug(c.cityName);
          console.log('Comparing:', cityNameSlug, 'with:', citySlug);
          return cityNameSlug === citySlug || c.citySlug === citySlug;
        });
        
        console.log('City exists:', cityExists);
        
        if (cityExists) {
          setIsValid(true);
        } else {
          // Check if it's a valid location format before redirecting
          const isValidFormat = /^[a-z0-9-]+$/.test(citySlug);
          if (!isValidFormat) {
            console.log('Invalid city slug format');
            router.push('/agency');
          } else {
            console.log('Setting as valid despite not found in cities');
            setIsValid(true);
          }
        }
      } catch (error) {
        console.error('Error validating city:', error);
        router.push('/agency');
      } finally {
        setIsValidating(false);
      }
    };

    validateCity();
  }, [citySlug, router, cities, fetchCities]);

  const cityData = cities.find(c => formatSlug(c.cityName) === citySlug || c.citySlug === citySlug);
  
  if (isValidating) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
          <LoadingAgencyCard />
        </div>
        <Footer />
      </>
    );
  }

  if (!isValid) {
    return null; // Let the router handle the redirect
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-8 pt-24 grid grid-cols-1 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Top Professional Services in {cityData?.cityName || citySlug.replace(/-/g, ' ')}
        </h1>
        <p className="text-base text-muted-foreground">
          Discover the top Companies in {cityData?.cityName || citySlug.replace(/-/g, ' ')}. Connect with skilled marketing agencies from our curated community to elevate your marketing strategy.
        </p>
      </div>
      <AgenciesClient initialLocation={citySlug} />
      <Footer />
    </>
  );
} 