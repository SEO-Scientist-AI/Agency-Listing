"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useAppStore from "@/lib/store/useAppStore";
import axiosInstance from "@/lib/axios-instance";
import { Skeleton } from "@/components/ui/skeleton";
import { useAgencies } from "@/lib/hooks/use-agencies";
import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SideBarFiltersProps {
    servicesSlug?: string;
    locationSlug?: string;
}

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

const SideBarFilters = ({servicesSlug, locationSlug}: SideBarFiltersProps) => {
    const { services, cities: locations, serviceLoading, citiesLoading, setAgencies } = useAppStore();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [serviceSearch, setServiceSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState(services);
    const [filteredLocations, setFilteredLocations] = useState(locations);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(true);
    const [locationsOpen, setLocationsOpen] = useState(true);

    // Create params object once
    const params = new URLSearchParams(searchParams.toString());
    if (servicesSlug) params.set("services", servicesSlug);
    if (locationSlug) params.set("location", locationSlug);
    
    const { mutate } = useAgencies(params);

    useEffect(() => {
        const servicesParam = (servicesSlug || searchParams.get('services'))?.split(' ').filter(Boolean) || [];
        const locationsParam = (locationSlug || searchParams.get('location'))?.split(' ').filter(Boolean) || [];
        setSelectedServices(servicesParam);
        setSelectedLocations(locationsParam);
        
        // Set filtersApplied to true if there are any initial filters from the URL
        if (servicesParam.length > 0 || locationsParam.length > 0) {
            setFiltersApplied(true);
        }
    }, [servicesSlug, locationSlug, searchParams]);

    useEffect(() => {
        const filtered = services.filter(service => 
            service.serviceName.toLowerCase().includes(serviceSearch.toLowerCase())
        );
        setFilteredServices(filtered);
    }, [serviceSearch, services]);

    useEffect(() => {
        const filteredLocs = locations.filter(location =>
            location.cityName.toLowerCase().includes(locationSearch.toLowerCase())
        );
        setFilteredLocations(filteredLocs);
    }, [locationSearch, locations]);

    const clearFilters = async () => {
        setSelectedServices([]);
        setSelectedLocations([]);
        setServiceSearch("");
        setLocationSearch("");
        setFiltersApplied(false);
        
        // Clear URL and redirect to list page
        router.replace('/agency/list');
        
        // Refetch agencies without filters
        const response = await axiosInstance.get('/agency');
        setAgencies(response.data);
    };

    const handleApplyFilters = async () => {
        // Clear search inputs first
        setServiceSearch("");
        setLocationSearch("");

        try {
            // Case 1: Single service only
            if (selectedServices.length === 1 && selectedLocations.length === 0) {
                router.replace(`/agency/list/${selectedServices[0]}`);
                return;
            }

            // Case 2: Single location only
            if (selectedLocations.length === 1 && selectedServices.length === 0) {
                router.replace(`/agency/list/${selectedLocations[0]}`);
                return;
            }

            // Case 3: Single service and single location
            if (selectedServices.length === 1 && selectedLocations.length === 1) {
                router.replace(`/agency/list/${selectedServices[0]}/${selectedLocations[0]}`);
                return;
            }

            // Case 4: Multiple selections - use query params
            const params = new URLSearchParams();
            if (selectedServices.length > 0) {
                params.set('services', selectedServices.join(' '));
            }
            if (selectedLocations.length > 0) {
                params.set('location', selectedLocations.join(' '));
            }

            // Only add query string if we have parameters
            const queryString = params.toString();
            router.replace(queryString ? `/agency/list?${queryString}` : '/agency/list');
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    const removeServiceAndApply = async (serviceSlug: string) => {
        const newServices = selectedServices.filter(s => s !== serviceSlug);
        setSelectedServices(newServices);
        
        try {
            // Case 1: One service left and one location
            if (newServices.length === 1 && selectedLocations.length === 1) {
                router.replace(`/agency/list/${newServices[0]}/${selectedLocations[0]}`);
                return;
            }

            // Case 2: One service left, no locations
            if (newServices.length === 1 && selectedLocations.length === 0) {
                router.replace(`/agency/list/${newServices[0]}`);
                return;
            }

            // Case 3: One location left, no services
            if (newServices.length === 0 && selectedLocations.length === 1) {
                router.replace(`/agency/list/${selectedLocations[0]}`);
                return;
            }

            // Case 4: Multiple selections or none - use query params
            const params = new URLSearchParams();
            if (newServices.length > 0) {
                params.set('services', newServices.join(' '));
            }
            if (selectedLocations.length > 0) {
                params.set('location', selectedLocations.join(' '));
            }

            const queryString = params.toString();
            router.replace(queryString ? `/agency/list?${queryString}` : '/agency/list');
        } catch (error) {
            console.error('Error removing service:', error);
        }
    };

    const removeLocationAndApply = async (locationSlug: string) => {
        const newLocations = selectedLocations.filter(l => l !== locationSlug);
        setSelectedLocations(newLocations);
        
        try {
            // Case 1: One service and one location left
            if (selectedServices.length === 1 && newLocations.length === 1) {
                router.replace(`/agency/list/${selectedServices[0]}/${newLocations[0]}`);
                return;
            }

            // Case 2: One location left, no services
            if (newLocations.length === 1 && selectedServices.length === 0) {
                router.replace(`/agency/list/${newLocations[0]}`);
                return;
            }

            // Case 3: One service left, no locations
            if (newLocations.length === 0 && selectedServices.length === 1) {
                router.replace(`/agency/list/${selectedServices[0]}`);
                return;
            }

            // Case 4: Multiple selections or none - use query params
            const params = new URLSearchParams();
            if (selectedServices.length > 0) {
                params.set('services', selectedServices.join(' '));
            }
            if (newLocations.length > 0) {
                params.set('location', newLocations.join(' '));
            }

            const queryString = params.toString();
            router.replace(queryString ? `/agency/list?${queryString}` : '/agency/list');
        } catch (error) {
            console.error('Error removing location:', error);
        }
    };

    const hasActiveFilters = () => {
        return selectedServices.length > 0 || selectedLocations.length > 0 || serviceSearch.length > 0 || locationSearch.length > 0;
    };

    if (serviceLoading || citiesLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <Card className="col-span-1 h-fit w-full max-w-[280px]">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {hasActiveFilters() && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-muted-foreground"
                            onClick={clearFilters}
                        >
                            Clear All
                        </Button>
                    )}
                </div>

                {filtersApplied && (selectedServices.length > 0 || selectedLocations.length > 0) && (
                    <div className="mb-4">
                        <ScrollArea className="h-full max-h-[100px]">
                            <div className="flex flex-wrap gap-2">
                                {selectedServices.map((serviceSlug) => {
                                    const service = services.find(s => s.slug === serviceSlug);
                                    return (
                                        <Badge 
                                            key={serviceSlug} 
                                            variant="secondary" 
                                            className="rounded-full"
                                        >
                                            {service?.serviceName}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                                                onClick={() => removeServiceAndApply(serviceSlug)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    );
                                })}
                                {selectedLocations.map((locSlug) => {
                                    const location = locations.find(l => l.citySlug === locSlug);
                                    return (
                                        <Badge 
                                            key={locSlug} 
                                            variant="secondary" 
                                            className="rounded-full"
                                        >
                                            {location?.cityName}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                                                onClick={() => removeLocationAndApply(locSlug)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                )}

                <Button 
                    className="w-full" 
                    size="sm" 
                    onClick={handleApplyFilters}
                >
                    Apply Filters {(selectedServices.length + selectedLocations.length) > 0 && 
                        `(${selectedServices.length + selectedLocations.length})`}
                </Button>
            </div>

            <div className="p-4">
                <div className="space-y-4">
                    <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                            <div className="flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                                <span>Services</span>
                            </div>
                            {servicesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 pt-2">
                            <Input
                                placeholder="Search services..."
                                value={serviceSearch}
                                onChange={(e) => setServiceSearch(e.target.value)}
                                className="h-8 text-sm"
                            />
                            <ScrollArea className="h-[200px]">
                                <div className="space-y-2 pr-2">
                                    {filteredServices.map((service) => (
                                        <div key={service._id} className="flex items-center space-x-2">
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
                                            <Label htmlFor={service.slug} className="text-sm font-normal">
                                                {service.serviceName}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    <Collapsible open={locationsOpen} onOpenChange={setLocationsOpen}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>Locations</span>
                            </div>
                            {locationsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 pt-2">
                            <Input
                                placeholder="Search locations..."
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                                className="h-8 text-sm"
                            />
                            <ScrollArea className="h-[200px]">
                                <div className="space-y-2 pr-2">
                                    {filteredLocations.map((location) => (
                                        <div key={location._id} className="flex items-center space-x-2">
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
                                            <Label htmlFor={location.citySlug} className="text-sm font-normal">
                                                {location.cityName}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </Card>
    );
};

export default SideBarFilters;
