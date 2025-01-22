"use client";

import { useState } from "react";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cities, countries, services, states } from "../wrapper/location-data";
import TabContent from "../common/landing/tab-content";

type Industry = {
    name: string;
    selected?: boolean;
};

const BrowseAgencyGalleries = () => {
    const [industries, setIndustries] = useState<Industry[]>([
        { name: "Agriculture" },
        { name: "Architecture" },
        { name: "Automotive", selected: true },
        { name: "B2B Services" },
        { name: "Construction" },
        { name: "Consumer Goods" },
        { name: "Dental" },
        { name: "Ecommerce" },
        { name: "Education Institutions" },
        { name: "Fashion Retail" },
        { name: "Fintech" },
        { name: "Food & Beverages" },
        { name: "Gambling" },
        { name: "Government" },
        { name: "Health & Wellness" },
        { name: "Healthcare & Hospital" },
        { name: "Insurance" },
        { name: "IT" },
        { name: "Legal Services" },
        { name: "Logistics" },
        { name: "Manufacturing" },
        { name: "Media & Entertainment" },
        { name: "Non-profits" },
        { name: "Oil & Gas" },
        { name: "Real Estate" },
        { name: "Restaurants" },
        { name: "Sports & Fitness" },
        { name: "Telecommunications" },
        { name: "Transportation" },
        { name: "Travel & Tourism" },
    ]);

    const handleIndustryClick = (clickedIndustry: string) => {
        setIndustries(
            industries.map((industry) => ({
                ...industry,
                selected:
                    industry.name === clickedIndustry
                        ? !industry.selected
                        : industry.selected,
            }))
        );
    };

    return (
        <div className="flex flex-col justify-center items-center lg:w-[75%]">
            <div className="flex flex-col mb-[3rem]">
                <h2
                    className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight dark:text-white text-gray-900`}
                >
                    We simplify every step of your research process
                </h2>
                <p className="mx-auto max-w-[500px] text-gray-600 dark:text-gray-400 text-center mt-2 ">
                    Whatever your search criteria are, we&apos;ve got you covered.
                    Find a suitable agency team in one of these dedicated
                    galleries.
                </p>
            </div>
            <div className="w-full">
                <Tabs defaultValue="industry" className="w-full">
                    <TabsList className="flex flex-wrap   w-full justify-center border-border mb-16 sm:mb-6 bg-white dark:bg-black">
                        <TabsTrigger
                            value="service"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d]"
                        >
                            By service
                        </TabsTrigger>
                        <TabsTrigger
                            value="industry"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d]"
                        >
                            By industry
                        </TabsTrigger>
                        <TabsTrigger
                            value="country"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d]"
                        >
                            By country
                        </TabsTrigger>
                        <TabsTrigger
                            value="state"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d]"
                        >
                            By state
                        </TabsTrigger>
                        <TabsTrigger
                            value="city"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d]"
                        >
                            By city
                        </TabsTrigger>
                        
                    </TabsList>

                    <TabContent tabData={services} value="service" />
                    <TabContent tabData={industries} value="industry" />
                    <TabContent tabData={countries} value="country"/>
                    <TabContent tabData={states} value="state"/>
                    <TabContent tabData={cities} value="city"/>
                    

                    {/* Other TabsContent components can be added here for service, country, state, city, and size */}
                </Tabs>
            </div>
        </div>
    );
};

export default BrowseAgencyGalleries;
