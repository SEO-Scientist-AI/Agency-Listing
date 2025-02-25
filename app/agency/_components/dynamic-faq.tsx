"use client";

import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import useAppStore from "@/lib/store/useAppStore";
import { Separator } from "@/components/ui/separator";

interface DynamicFAQProps {
    service?: string;
    location?: string;
}

export function DynamicFAQ({ service, location }: DynamicFAQProps) {
    const { services, cities } = useAppStore();
    const [serviceName, setServiceName] = useState<string>("Digital Marketing");
    const [locationName, setLocationName] = useState<string>("Worldwide");

    useEffect(() => {
        if (service) {
            const foundService = services.find(s => s.slug === service);
            if (foundService) {
                setServiceName(foundService.serviceName);
            }
        }

        if (location) {
            const foundLocation = cities.find(c => c.citySlug === location);
            if (foundLocation) {
                setLocationName(foundLocation.cityName);
            }
        }
    }, [service, location, services, cities]);

    const faqItems = [
        {
            question: `What is ${serviceName} in ${locationName}?`,
            answer: `${serviceName} in ${locationName} refers to professional solutions that help businesses improve their online presence, rank higher on search engines, and attract local and global customers.`
        },
        {
            question: `What Does a ${serviceName} Consultant in ${locationName} Do?`,
            answer: `A ${serviceName} consultant in ${locationName} analyzes your website, identifies gaps, and implements strategies like keyword research, on-page optimization, and link building to boost rankings and performance.`
        },
        {
            question: `How Much Do ${serviceName} Services Cost in ${locationName}?`,
            answer: `The cost of ${serviceName} in ${locationName} varies. Basic packages start at $500/month, while advanced strategies for highly competitive markets can cost $5,000+ per month, depending on your goals and requirements.`
        },
        {
            question: `What Are the Benefits of Hiring a ${serviceName} Agency in ${locationName}?`,
            answer: `Hiring a ${serviceName} agency in ${locationName} helps businesses increase visibility, improve website rankings, drive organic traffic, and generate high-quality leads through expert strategies.`
        },
        {
            question: `How Do I Choose the Best ${serviceName} Company in ${locationName}?`,
            answer: `When choosing the best ${serviceName} company in ${locationName}, consider client reviews, past results, pricing structure, industry experience, and expertise in your specific market.`
        },
        {
            question: `What Is the Difference Between a ${serviceName} Agency and a ${serviceName} Consultant in ${locationName}?`,
            answer: `A ${serviceName} agency in ${locationName} offers a full range of services with a team of specialists, while a consultant provides expert advice and tailored strategies for specific business goals.`
        },
        {
            question: `How Long Does It Take to See ${serviceName} Results in ${locationName}?`,
            answer: `${serviceName} results in ${locationName} typically take 3-6 months for noticeable improvements and 6-12 months for significant business impact, depending on the strategies implemented.`
        },
        {
            question: `What Are the Latest ${serviceName} Trends in ${locationName} for 2025?`,
            answer: `Top ${serviceName} trends in ${locationName} for 2025 include AI-driven automation, personalized customer experiences, video marketing, voice search optimization, and enhanced data analytics for better decision-making.`
        },
        {
            question: `Can a ${serviceName} Firm in ${locationName} Guarantee #1 Rankings?`,
            answer: `No reputable ${serviceName} firm in ${locationName} can guarantee #1 rankings due to algorithm updates and competitive factors, but they can significantly improve your visibility and performance.`
        },
        {
            question: `How Can I Get Started with the Best ${serviceName} Agency in ${locationName}?`,
            answer: `Looking for the best ${serviceName} agency in ${locationName}? Browse our curated list of trusted agencies above, compare reviews, and request a consultation today to find your perfect marketing partner!`
        }
    ];

    return (
        <div className="container mx-auto max-w-6xl px-4 py-16">
            <Separator className="mb-16" />
            <div className="flex flex-col w-full">
                <h2 className={`${TITLE_TAILWIND_CLASS} mt-2 mb-8 font-semibold text-left tracking-tight`}>
                    Frequently Asked Questions (FAQs) - Best {serviceName} in {locationName}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger>
                                <span className="font-medium text-left">{item.question}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
} 