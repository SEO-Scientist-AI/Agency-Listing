"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { X, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Location {
    cityName: string;
    citySlug: string;
    countryName: string;
    countrySlug: string;
}

interface LocationSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
}

const capitalizeFirstLetter = (str: string) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export function LocationSelect({ value, onChange }: LocationSelectProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [locations, setLocations] = React.useState<Location[]>([]);
    const [customCity, setCustomCity] = React.useState("");
    const [customCountry, setCustomCountry] = React.useState("");
    const [showCustomForm, setShowCustomForm] = React.useState(false);

    const fetchLocations = async () => {
        try {
            const response = await fetch('/api/locations');
            const data = await response.json();
            if (Array.isArray(data)) {
                setLocations(data);
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    React.useEffect(() => {
        fetchLocations();
    }, []);

    const formatLocation = (location: Location) => `${location.cityName}, ${location.countryName}`;

    const handleUnselect = (locationStr: string) => {
        onChange(value.filter((l) => l !== locationStr));
    };

    const handleSelect = (location: Location) => {
        const locationStr = formatLocation(location);
        if (!value.includes(locationStr)) {
            onChange([...value, locationStr]);
            setSearchQuery(""); // Clear search after selection
        }
    };

    const handleAddCustom = () => {
        const city = capitalizeFirstLetter(customCity.trim());
        const country = capitalizeFirstLetter(customCountry.trim());
        
        if (city && country) {
            const locationStr = `${city}, ${country}`;
            if (!value.includes(locationStr)) {
                onChange([...value, locationStr]);
                setCustomCity("");
                setCustomCountry("");
                setShowCustomForm(false);
            }
        }
    };

    const filteredLocations = locations.filter((location) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            location.cityName.toLowerCase().includes(searchLower) ||
            location.countryName.toLowerCase().includes(searchLower)
        );
    });

    const showAddCustom = searchQuery.trim().length > 0 && filteredLocations.length === 0;

    return (
        <div className="space-y-4">
            {/* Selected Locations */}
            <div className="flex flex-wrap gap-2">
                {value.map((locationStr) => (
                    <Badge 
                        key={locationStr} 
                        variant="secondary" 
                        className="bg-orange-50 text-orange-700 hover:bg-orange-100 py-2"
                    >
                        {locationStr}
                        <button
                            className="ml-2"
                            onClick={() => handleUnselect(locationStr)}
                        >
                            <X className="h-3 w-3 text-orange-700 hover:text-orange-900" />
                        </button>
                    </Badge>
                ))}
            </div>

            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search cities or countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Locations Grid */}
            <ScrollArea className="h-[200px] rounded-md border">
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                        {filteredLocations.map((location) => (
                            <Card
                                key={location.citySlug}
                                className={`p-3 cursor-pointer transition-colors ${
                                    value.includes(formatLocation(location))
                                        ? 'bg-orange-50 border-orange-200'
                                        : 'hover:bg-muted'
                                }`}
                                onClick={() => handleSelect(location)}
                            >
                                <p className="text-sm font-medium">
                                    {location.cityName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {location.countryName}
                                </p>
                            </Card>
                        ))}
                    </div>
                    {showAddCustom && !showCustomForm && (
                        <div className="mt-4 p-4 border border-dashed rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm">Add custom location</span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowCustomForm(true)}
                                >
                                    Add New
                                </Button>
                            </div>
                        </div>
                    )}
                    {showCustomForm && (
                        <div className="mt-4 p-4 border border-dashed rounded-lg">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customCity">City Name</Label>
                                    <Input
                                        id="customCity"
                                        value={customCity}
                                        onChange={(e) => setCustomCity(e.target.value)}
                                        placeholder="Enter city name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customCountry">Country Name</Label>
                                    <Input
                                        id="customCountry"
                                        value={customCountry}
                                        onChange={(e) => setCustomCountry(e.target.value)}
                                        placeholder="Enter country name"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setShowCustomForm(false);
                                            setCustomCity("");
                                            setCustomCountry("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={handleAddCustom}
                                        disabled={!customCity.trim() || !customCountry.trim()}
                                    >
                                        Add Location
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {!showAddCustom && !showCustomForm && filteredLocations.length === 0 && (
                        <div className="mt-4 p-4 border border-dashed rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm">No locations found</span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowCustomForm(true)}
                                >
                                    Add New Location
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
} 