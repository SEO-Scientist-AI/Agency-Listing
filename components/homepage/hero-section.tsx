"use client";

import {
    ArrowRight,
    Search,
    MapPin,
    Briefcase,
    ArrowRightIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { useEffect, useState } from "react";
import useAppStore from "@/lib/store/useAppStore"

const avatarUrls = [
    { id: 1, url: "/images/testimonials/testimonials_1.png" },
    { id: 2, url: "/images/testimonials/testimonials_2.png" },
    { id: 3, url: "/images/testimonials/testimonials_3.png" },
    { id: 4, url: "/images/testimonials/testimonials_4.png" },
];

const avatarElements = avatarUrls.map((avatar) => (
    <div key={avatar.id}>
        <Image
            src={avatar.url}
            alt={`User avatar ${avatar.id}`}
            width={32}
            height={32}
            className="rounded-full border-2 border-background"
        />
    </div>
));

export default function HeroSection() {
    const { services ,cities} = useAppStore();
   
    

    const router = useRouter();
    const [selectedService, setSelectedService] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");

    const handleSearch = () => {
        const searchParams = new URLSearchParams();
        

        if (selectedService && selectedCity) {
            router.push(`/agency/list/${selectedService}/${selectedCity}`);
            return;
        
        } else if (selectedService){
            router.push(`/agency/list/${selectedService}`);
            return;
        }
        if (selectedRegion) {
            searchParams.append("region", selectedRegion);
        }
        if (selectedCity) {
            searchParams.append("location", selectedCity);
        }

        const queryString = searchParams.toString();
        router.push(`/agency${queryString ? `?${queryString}` : ""}`);
    };

    return (
        <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative overflow-hidden">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>

            {/* Floating agency-related elements */}
            <div className="absolute inset-0 overflow-hidden z-10">
                {/* Digital Marketing Icon */}
                <div className="absolute top-20 right-[15%] text-4xl opacity-20 dark:opacity-10 rotate-12 animate-float-slow">
                    <svg
                        className="w-16 h-16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                            className="stroke-orange-500 dark:stroke-orange-400"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M7 17V13.5V10"
                            className="stroke-orange-500 dark:stroke-orange-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11 17V7"
                            className="stroke-orange-500 dark:stroke-orange-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15 17V13.5V10"
                            className="stroke-orange-500 dark:stroke-orange-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 17V7"
                            className="stroke-orange-500 dark:stroke-orange-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Web Development Icon */}
                <div className="absolute top-1/3 left-[10%] text-4xl opacity-20 dark:opacity-10 -rotate-12 animate-float">
                    <svg
                        className="w-20 h-20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15"
                            className="stroke-blue-500 dark:stroke-blue-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M13.5 7L10.5 17"
                            className="stroke-blue-500 dark:stroke-blue-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M8.5 9L8.32843 9.17157C6.99509 10.5049 6.32843 11.1716 6.32843 12C6.32843 12.8284 6.99509 13.4951 8.32843 14.8284L8.5 15"
                            className="stroke-blue-500 dark:stroke-blue-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* SEO Icon */}
                <div className="absolute bottom-1/4 right-[20%] text-4xl opacity-20 dark:opacity-10 rotate-45 animate-float-slow delay-300">
                    <svg
                        className="w-16 h-16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                            className="stroke-purple-500 dark:stroke-purple-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Social Media Icon */}
                <div className="absolute bottom-[20%] left-[25%] text-4xl opacity-20 dark:opacity-10 -rotate-12 animate-float delay-150">
                    <svg
                        className="w-16 h-16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 10V16M12 7V16M17 4V16"
                            className="stroke-pink-500 dark:stroke-pink-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M21 16.0001H3"
                            className="stroke-pink-500 dark:stroke-pink-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M21 20.0001H3"
                            className="stroke-pink-500 dark:stroke-pink-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Content Creation Icon */}
                <div className="absolute top-[25%] left-[30%] text-4xl opacity-20 dark:opacity-10 rotate-90 animate-float-slow delay-700">
                    <svg
                        className="w-14 h-14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 4H6C4.89543 4 4 4.89543 4 6V8M8 20H6C4.89543 20 4 19.1046 4 18V16M16 4H18C19.1046 4 20 4.89543 20 6V8M16 20H18C19.1046 20 20 19.1046 20 18V16"
                            className="stroke-green-500 dark:stroke-green-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12 9V12M12 12V15M12 12H15M12 12H9"
                            className="stroke-green-500 dark:stroke-green-400"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(var(--tw-rotate));
                    }
                    50% {
                        transform: translateY(-20px) rotate(var(--tw-rotate));
                    }
                }
                @keyframes float-slow {
                    0%,
                    100% {
                        transform: translateY(0) rotate(var(--tw-rotate));
                    }
                    50% {
                        transform: translateY(-10px) rotate(var(--tw-rotate));
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
            `}</style>

            <div className="relative z-20 container mx-auto px-4 py-20">
                <div className="flex flex-col items-center leading-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mt-8 text-center relative">
                            <span className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl inline-block">
                                Discover & Connect
                            </span>
                            <div className="relative">
                                <span className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 inline-block">
                                    with Top Agencies
                                </span>
                                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transform scale-x-0 transition-transform duration-700 group-hover:scale-x-100"></span>
                            </div>
                            <span className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl inline-block">
                                Worldwide
                            </span>
                        </h1>

                        <p className="mt-6 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl">
                            Connect with top-rated agencies that match your
                            needs. Filter by location, expertise, and budget to
                            find your ideal partner.
                        </p>
                    </div>

                    <Card className="mt-12 w-full max-w-4xl border border-black/5 dark:border-white/5 bg-white/80 dark:bg-black/80 p-6 backdrop-blur-sm transition-colors duration-300">
                        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                            <Select
                                value={selectedService}
                                onValueChange={setSelectedService}
                            >
                                <SelectTrigger className="h-12 bg-white/50 dark:bg-black/50">
                                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="All Services" />
                                </SelectTrigger>
                                <SelectContent className="h-48">
                                    {services.map((service) => (
                                        <SelectItem
                                            value={service.slug}
                                            key={service.id}
                                        >
                                            {service.serviceName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedCity}
                                onValueChange={setSelectedCity}
                            >
                                <SelectTrigger className="h-12 bg-white/50 dark:bg-black/50">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="All Cities" />
                                </SelectTrigger>
                                <SelectContent className="h-48">
                                    {cities.map((city) => (
                                        <SelectItem value={city.citySlug} key={city.id}>
                                            {city.cityName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                size="lg"
                                className="h-12 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-8 relative group overflow-hidden"
                                onClick={handleSearch}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Search Agencies
                                    <Search className="h-4 w-4" />
                                </span>
                                <div className="absolute inset-0 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
                            </Button>
                        </div>
                    </Card>

                    {/* <div className="mt-8 flex justify-center">
                        <Link href="/dashboard">
                            <Button className="rounded-md bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                                List Your Agency
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div> */}

                    <div className="mt-12 flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {avatarElements.map((avatar, index) => (
                                <div
                                    key={index}
                                    className="relative transition-transform hover:scale-110 duration-300"
                                >
                                    {avatar}
                                    <div className="absolute inset-0 rounded-full ring-2 ring-orange-500/20 dark:ring-orange-400/30" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-black dark:text-white">
                                500+
                            </span>{" "}
                            Agencies already listed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
