"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ServiceSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
}

export function ServiceSelect({ value, onChange }: ServiceSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [services, setServices] = React.useState<{ serviceName: string; slug: string }[]>([]);

    // Fetch services from API
    React.useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchServices();
    }, []);

    const toggleService = (serviceSlug: string, serviceName: string) => {
        const newValue = value.includes(serviceSlug)
            ? value.filter((item) => item !== serviceSlug)
            : [...value, serviceSlug];
        onChange(newValue);
        // Don't close the popover after selection
        setOpen(true);
    };

    const handleAddCustom = () => {
        if (inputValue.trim()) {
            const customSlug = inputValue.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (!value.includes(customSlug)) {
                const newService = { serviceName: inputValue, slug: customSlug };
                setServices(prev => [...prev, newService]);
                onChange([...value, customSlug]);
                setInputValue("");
            }
        }
    };

    const removeService = (serviceSlug: string) => {
        onChange(value.filter((item) => item !== serviceSlug));
    };

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-10 px-3 text-left font-normal"
                    >
                        <span className="truncate">
                            {value.length === 0 && "Select services..."}
                            {value.length > 0 && `${value.length} service${value.length > 1 ? 's' : ''} selected`}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={5}>
                    <Command>
                        <CommandInput 
                            placeholder="Search services..." 
                            value={inputValue}
                            onValueChange={setInputValue}
                        />
                        <CommandList>
                            <CommandEmpty>
                                <Button
                                    size="sm"
                                    className="w-full mt-2"
                                    onClick={handleAddCustom}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add &quot;{inputValue}&quot;
                                </Button>
                            </CommandEmpty>
                            <CommandGroup heading="Available Services">
                                {services.map((service) => (
                                    <CommandItem
                                        key={service.slug}
                                        value={service.slug}
                                        onSelect={() => toggleService(service.slug, service.serviceName)}
                                        className="flex items-center justify-between cursor-pointer"
                                    >
                                        <span>{service.serviceName}</span>
                                        {value.includes(service.slug) && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Selected Services Badges */}
            <div className="flex flex-wrap gap-2 min-h-[32px]">
                {value.map((serviceSlug) => {
                    const service = services.find(s => s.slug === serviceSlug);
                    return (
                        <Badge
                            key={serviceSlug}
                            variant="secondary"
                            className="flex items-center gap-1"
                        >
                            {service?.serviceName || serviceSlug}
                            <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeService(serviceSlug);
                                }}
                            />
                        </Badge>
                    );
                })}
            </div>
        </div>
    );
} 