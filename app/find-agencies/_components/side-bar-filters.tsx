"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Agency } from '@/types/agency';
import { Button } from "@/components/ui/button";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

interface SideBarFiltersProps {
    onFiltersChange: (filters: any) => void;
}

const SideBarFilters = ({ onFiltersChange }: SideBarFiltersProps) => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const [servicesRes, locationsRes] = await Promise.all([
                    fetch('/api/services'),
                    fetch('/api/locations')
                ]);

                const [servicesData, locationsData] = await Promise.all([
                    servicesRes.json(),
                    locationsRes.json()
                ]);

                if (Array.isArray(servicesData)) {
                    // Extract service names from the response
                    const serviceNames = servicesData.map((service: any) => service.serviceName)
                        .filter(Boolean)
                        .sort();
                    setServices(serviceNames);
                }

                if (Array.isArray(locationsData)) {
                    // Extract unique country names from the response
                    const uniqueCountries = Array.from(new Set(
                        locationsData.map((location: any) => location.countryName)
                    )).filter(Boolean).sort();
                    setLocations(uniqueCountries);
                }
            } catch (error) {
                console.error('Error fetching filters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    // Initialize filters from URL params
    useEffect(() => {
        const servicesParam = searchParams.get('services')?.split(' ').filter(Boolean) || [];
        const locationsParam = searchParams.get('location')?.split(' ').filter(Boolean) || [];
        
        // Find matching services and locations from the available options
        const matchedServices = services.filter(service => 
            servicesParam.some(param => 
                formatUrlParam(service) === param
            )
        );
        
        const matchedLocations = locations.filter(location => 
            locationsParam.some(param => 
                formatUrlParam(location) === param
            )
        );
        
        setSelectedServices(matchedServices);
        setSelectedLocations(matchedLocations);
    }, [searchParams, services, locations]);

    const formatUrlParam = (param: string) => {
        return param.toLowerCase().replace(/\s+/g, '-');
    };

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        
        if (selectedServices.length > 0) {
            const formattedServices = selectedServices.map(formatUrlParam);
            params.set('services', formattedServices.join(' '));
        }
        
        if (selectedLocations.length > 0) {
            const formattedLocations = selectedLocations.map(formatUrlParam);
            params.set('location', formattedLocations.join(' '));
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-72 sticky top-28 self-start">
            <Card className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <CardContent className="p-4 space-y-6">
                    {/* Services Filter Section */}
                    <Collapsible defaultOpen={true}>
                        <CollapsibleTrigger className="w-full flex justify-between items-center">
                            <span className="font-medium">Services</span>
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2">
                            {loading ? (
                                <div>Loading services...</div>
                            ) : services.map((service) => (
                                <label key={service} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedServices([...selectedServices, service]);
                                            } else {
                                                setSelectedServices(selectedServices.filter(s => s !== service));
                                            }
                                        }}
                                    />
                                    <span>{service}</span>
                                </label>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>

                    {/* Locations Filter Section */}
                    <Collapsible defaultOpen={true}>
                        <CollapsibleTrigger className="w-full flex justify-between items-center">
                            <span className="font-medium">Locations</span>
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2">
                            {loading ? (
                                <div>Loading locations...</div>
                            ) : locations.map((location) => (
                                <label key={location} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedLocations.includes(location)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedLocations([...selectedLocations, location]);
                                            } else {
                                                setSelectedLocations(selectedLocations.filter(l => l !== location));
                                            }
                                        }}
                                    />
                                    <span>{location}</span>
                                </label>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>

                    <Button
                        onClick={handleApplyFilters} 
                        className="w-full"
                    >
                        Apply Filters
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SideBarFilters;
