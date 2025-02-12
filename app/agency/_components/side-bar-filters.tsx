"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useAppStore from "@/lib/store/useAppStore";
import axiosInstance from "@/lib/axios-instance";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
    return (
        <Card className="col-span-1 h-fit animate-pulse">
            <CardHeader className="space-y-4">
                <Skeleton className="h-8"></Skeleton>
                <Separator />
            </CardHeader>
            <CardContent className="space-y-6">
                {[1, 2].map((section) => (
                    <div key={section} className="space-y-4">
                        <Skeleton className="h-6 w-24"></Skeleton>
                        <div className="space-y-2">
                            {[1, 2, 3].map((item) => (
                                <Skeleton key={item} className="h-4"></Skeleton>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

interface SideBarFiltersProps {
  initialLocation?: string;
}

const SideBarFilters = ({ initialLocation }: SideBarFiltersProps = {}) => {
    const { services, cities: locations, serviceLoading, citiesLoading, setAgencies } = useAppStore();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredServices, setFilteredServices] = useState(services);
    const [filteredLocations, setFilteredLocations] = useState(locations);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get city from URL if we're on a city-specific page
    const cityFromPath = pathname.startsWith('/agency/list/') 
        ? pathname.split('/').pop() 
        : null;

    useEffect(() => {
        const servicesParam = searchParams.get('services')?.split(' ').filter(Boolean) || [];
        const locationsParam = searchParams.get('location')?.split(' ').filter(Boolean) || [];
        
        // If we're on a city-specific page, include the city from the URL
        const locationsList = cityFromPath 
            ? [cityFromPath, ...locationsParam]
            : locationsParam;

        setSelectedServices(servicesParam);
        setSelectedLocations(locationsList);
    }, [searchParams, cityFromPath]);

    useEffect(() => {
        const filtered = services.filter(service => 
            service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredServices(filtered);

        const filteredLocs = locations.filter(location =>
            location.cityName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLocations(filteredLocs);
    }, [searchQuery, services, locations]);

    const clearFilters = async () => {
        setSelectedServices([]);
        setSelectedLocations([]); // Clear all locations, including the city from path
        setSearchQuery("");
        
        if (cityFromPath) {
            // If on city-specific page, redirect to main agency page
            router.push('/agency');
        } else {
            router.push('/agency');
        }
        
        // Always fetch without location filter
        const response = await axiosInstance.get('/agency');
        setAgencies(response.data);
    };

    const handleApplyFilters = async () => {
        const params = new URLSearchParams();
        if (selectedServices.length > 0) {
            params.set('services', selectedServices.join(' '));
        }
        
        // Only set location params for locations other than the current city page
        const additionalLocations = selectedLocations.filter(loc => loc !== cityFromPath);
        if (additionalLocations.length > 0) {
            params.set('location', additionalLocations.join(' '));
        }

        // If we're on a city-specific page and selecting additional locations,
        // redirect to the main agency page with all locations
        if (cityFromPath && additionalLocations.length > 0) {
            const allLocations = [cityFromPath, ...additionalLocations];
            params.set('location', allLocations.join(' '));
            router.push(`/agency?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
        }

        const response = await axiosInstance.get(`/agency?${params.toString()}`);
        setAgencies(response.data);
    };

    const hasActiveFilters = () => {
        // Always return true to show the clear filter button
        return true;
    };

    if (serviceLoading || citiesLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <Card className="col-span-1 h-fit">
            <CardHeader className="space-y-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold">Filter</CardTitle>
                    <Button
                        onClick={handleApplyFilters}
                        size="sm"
                        className="h-8"
                    >
                        Apply Filters
                    </Button>
                </div>
                <Input
                    placeholder="Search filters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                />
                <Separator />
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Services</Label>
                    <ScrollArea className="h-[200px] rounded-md">
                        <div className="grid grid-cols-1 gap-2 p-1">
                            {filteredServices.map((service) => (
                                <div key={service.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={service.slug}
                                        checked={selectedServices.includes(service.slug)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedServices([...selectedServices, service.slug]);
                                            } else {
                                                setSelectedServices(selectedServices.filter(s => s !== service.slug));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={service.slug} className="text-sm font-medium">
                                        {service.serviceName}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Locations</Label>
                    <ScrollArea className="h-[200px] rounded-md">
                        <div className="grid grid-cols-1 gap-2 p-1">
                            {filteredLocations.map((location) => (
                                <div key={location.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={location.citySlug}
                                        checked={selectedLocations.includes(location.citySlug)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedLocations([...selectedLocations, location.citySlug]);
                                            } else {
                                                setSelectedLocations(selectedLocations.filter(l => l !== location.citySlug));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={location.citySlug} className="text-sm font-medium">
                                        {location.cityName}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <Separator />

                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={clearFilters}
                >
                    <span className="mr-2">Clear all filters</span>
                    <X className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
};

export default SideBarFilters;
