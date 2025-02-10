"use client";

import { useState } from "react";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "../common/landing/tab-content";
import useAppStore from "@/lib/store/useAppStore";

type Industry = {
    name: string;
    selected?: boolean;
};

const BrowseAgencyGalleries = () => {
    const { services ,cities,industries} = useAppStore();
  

    return (
        <div className="flex flex-col justify-center items-center lg:w-[75%] mt-[6rem]">
            <div className="flex flex-col mb-[3rem]">
                <h2
                    className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight dark:text-white text-gray-900`}
                >
                    We simplify every step of your research process
                </h2>
                <p className="mx-auto max-w-[500px] text-gray-600 dark:text-gray-400 text-center mt-2 ">
                    Whatever your search criteria are, we&apos;ve got you
                    covered. Find a suitable agency team in one of these
                    dedicated galleries.
                </p>
            </div>
            <div className="w-full">
                <Tabs defaultValue="industry" className="w-full">
                    <TabsList className="flex flex-wrap   w-full justify-center border-border mb-16 sm:mb-6 bg-white dark:bg-black">
                        <TabsTrigger
                            value="service"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d] hover:border-[#FF4405]"
                        >
                            By service
                        </TabsTrigger>
                        <TabsTrigger
                            value="industry"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d] hover:border-[#FF4405]"
                        >
                            By industry
                        </TabsTrigger>
                        <TabsTrigger
                            value="country"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d] hover:border-[#FF4405]"
                        >
                            By country
                        </TabsTrigger>
                        {/* <TabsTrigger
                            value="state"

                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d] hover:border-[#FF4405]"
                        >
                            By state
                        </TabsTrigger> */}
                        <TabsTrigger
                            value="city"
                            className="inline font-semibold dark:text-gray-100 text-gray-900 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#FF4405] data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-none hover:text-[#ff642d] hover:border-[#FF4405]"
                        >
                            By city
                        </TabsTrigger>
                    </TabsList>
                    <TabContent tabData={services} value="service" />
                    <TabContent tabData={industries} value="industry" />
                    <TabContent tabData={cities} value="country" />
                    <TabContent tabData={cities} value="city" />

                    {/* Other TabsContent components can be added here for service, country, state, city, and size */}
                </Tabs>
            </div>
        </div>
    );
};

export default BrowseAgencyGalleries;
