"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAppStore from "@/lib/store/useAppStore"
import axiosInstance from "@/lib/axios-instance";
function LoadingSidebarSection() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-6 w-24" />
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                </div>
            ))}
        </div>
    );
}



const SideBarFilters = () => {
    const { services ,cities:locations,serviceLoading,citiesLoading,setAgencies} = useAppStore();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();



    useEffect(() => {
        const servicesParam = searchParams.get('services')?.split(' ').filter(Boolean) || [];
        const locationsParam = searchParams.get('location')?.split(' ').filter(Boolean) || [];
        setSelectedServices(servicesParam);
        setSelectedLocations(locationsParam);
    }, []);
    const handleApplyFilters = async () => {
        const params = new URLSearchParams();
        if (selectedServices.length > 0) {
            params.set('services', selectedServices.join(' '));
        } 
        if (selectedLocations.length > 0) {
            params.set('location', selectedLocations.join(' '));
        }
        router.push(`${pathname}?${params.toString()}`);
       const response = await axiosInstance.get(`/agency?${params.toString()}`);
       const data = await response.data;
        setAgencies(data);
    };

    if (serviceLoading && citiesLoading) {
        return (
            <div className="w-72 sticky top-28 self-start">
                <Card className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <CardContent className="p-4 space-y-6">
                        <LoadingSidebarSection />
                        <LoadingSidebarSection />
                        <Skeleton className="h-9 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-72 sticky top-28 self-start">
            <Card className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <CardContent className="p-4 space-y-6">
                    <Collapsible defaultOpen={true}>
                        <CollapsibleTrigger className="w-full flex justify-between items-center">
                            <span className="font-medium">Services</span>
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2">
                            {services.map((service) => (
                                <label key={service.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service.slug)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedServices([...selectedServices, service.slug]);
                                            } else {
                                                setSelectedServices(selectedServices.filter(s => s !== service.slug));
                                            }
                                        }}
                                    />
                                    <span>{service.serviceName}</span>
                                </label>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible defaultOpen={true}>
                        <CollapsibleTrigger className="w-full flex justify-between items-center">
                            <span className="font-medium">Locations</span>
                            <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2">
                            {locations.map((location) => (
                                <label key={location.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedLocations.includes(location.citySlug)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedLocations([...selectedLocations, location.citySlug]);
                                            } else {
                                                setSelectedLocations(selectedLocations.filter(l => l !== location.citySlug));
                                            }
                                        }}
                                    />
                                    <span>{location.cityName}</span>
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
