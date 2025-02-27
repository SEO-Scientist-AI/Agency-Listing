"use client";

import Link from "next/link";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Globe2 } from "lucide-react";

// Define city data with regions
const cityData = {
  UAE: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Al Ain",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
    "Khor Fakkan",
    "Dibba Al-Fujairah"
  ],
  USA: [
    "New York City",
    "Los Angeles",
    "Chicago",
    "San Francisco",
    "Boston",
    "Seattle",
    "Austin",
    "Denver",
    "Atlanta",
    "Miami",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose"
  ],
  Europe: [
    "London",
    "Paris",
    "Berlin",
    "Madrid",
    "Amsterdam",
    "Stockholm",
    "Dublin",
    "Milan",
    "Zurich",
    "Barcelona",
    "Munich",
    "Hamburg",
    "Frankfurt",
    "Cologne",
    "Stuttgart",
    "Düsseldorf",
    "Leipzig",
    "Dortmund",
    "Essen"
  ],
  India: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Pune",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Gurugram"
  ],
  Australia: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Gold Coast",
    "Canberra",
    "Newcastle",
    "Hobart",
    "Darwin"
  ],
  Canada: [
    "Toronto",
    "Vancouver",
    "Montreal",
    "Calgary",
    "Ottawa",
    "Edmonton",
    "Quebec City",
    "Winnipeg",
    "Halifax",
    "Victoria"
  ]
};

export function LocationLinks() {
  const createSlug = (city: string) => {
    return city.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col w-full">
        <div className="text-center mb-12">
          <h2 className={`${TITLE_TAILWIND_CLASS} font-semibold tracking-tight`}>
            Find SEO Service Providers Near You
          </h2>
          <p className="text-muted-foreground mt-2">
            Connect with top SEO agencies in your city
          </p>
        </div>
        
        <ScrollArea className="h-[600px] w-full pr-4">
          <div className="grid gap-8">
            {Object.entries(cityData).map(([region, cities]) => (
              <div key={region} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <MapPin className="h-5 w-5 text-signature" />
                  <h3 className="text-lg font-semibold text-foreground">{region}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-6">
                  {cities.map((city) => (
                    <Link
                      key={city}
                      href={`/agency/list/${createSlug(city)}/seo`}
                      className="group flex items-center space-x-2 text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-signature transition-colors" />
                      <span className="text-muted-foreground group-hover:text-signature transition-colors">
                        SEO Service Provider in {city}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Why Choose Local SEO Services?
            </h4>
            <p className="text-sm text-muted-foreground">
              Looking for professional SEO services? Find top-rated SEO service providers across major cities worldwide. 
              Our platform connects you with experienced SEO agencies that can help improve your website's visibility 
              and drive organic traffic. Whether you're in Dubai, New York, London, Mumbai, or any other major city, 
              we've got you covered with the best local SEO expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 