"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { X, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Industry {
    industryName: string;
    slug: string;
}

interface IndustrySelectProps {
    value: string[];
    onChange: (value: string[]) => void;
}

export function IndustrySelect({ value, onChange }: IndustrySelectProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [industries, setIndustries] = React.useState<Industry[]>([]);

    const fetchIndustries = async () => {
        try {
            const response = await fetch('/api/industries');
            const data = await response.json();
            if (Array.isArray(data)) {
                setIndustries(data);
            }
        } catch (error) {
            console.error('Error fetching industries:', error);
        }
    };

    React.useEffect(() => {
        fetchIndustries();
    }, []);

    const handleUnselect = (industryName: string) => {
        onChange(value.filter((s) => s !== industryName));
    };

    const handleSelect = (industryName: string) => {
        if (!value.includes(industryName)) {
            onChange([...value, industryName]);
            setSearchQuery(""); // Clear search after selection
        }
    };

    const handleAddCustom = () => {
        const customIndustry = searchQuery.trim();
        if (customIndustry && !value.includes(customIndustry)) {
            onChange([...value, customIndustry]);
            setSearchQuery(""); // Clear search after adding
        }
    };

    const filteredIndustries = industries.filter((industry) =>
        industry.industryName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showAddCustom = searchQuery.trim().length > 0 && filteredIndustries.length === 0;

    return (
        <div className="space-y-4">
            {/* Selected Industries */}
            <div className="flex flex-wrap gap-2">
                {value.map((industryName) => (
                    <Badge 
                        key={industryName} 
                        variant="secondary" 
                        className="bg-green-50 text-green-700 hover:bg-green-100 py-2"
                    >
                        {industryName}
                        <button
                            className="ml-2"
                            onClick={() => handleUnselect(industryName)}
                        >
                            <X className="h-3 w-3 text-green-700 hover:text-green-900" />
                        </button>
                    </Badge>
                ))}
            </div>

            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search or type custom industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Industries Grid */}
            <ScrollArea className="h-[200px] rounded-md border">
                <div className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {filteredIndustries.map((industry) => (
                            <Card
                                key={industry.slug}
                                className={`p-3 cursor-pointer transition-colors ${
                                    value.includes(industry.industryName)
                                        ? 'bg-primary/5 border-primary'
                                        : 'hover:bg-muted'
                                }`}
                                onClick={() => handleSelect(industry.industryName)}
                            >
                                <p className="text-sm font-medium truncate">
                                    {industry.industryName}
                                </p>
                            </Card>
                        ))}
                    </div>
                    {showAddCustom && (
                        <div className="mt-4 p-4 border border-dashed rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm">Add custom industry:</span>
                                    <span className="font-medium text-foreground">
                                        {searchQuery}
                                    </span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={handleAddCustom}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    )}
                    {!showAddCustom && filteredIndustries.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                            No industries found. Type to add custom industry.
                        </p>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
} 