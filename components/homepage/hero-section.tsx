"use client";

import {
    ArrowRight,
    Search,
    MapPin,
    Briefcase,
    ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BorderBeam } from "../magicui/border-beam";
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
import { cities, services } from "../wrapper/location-data";

const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
];

const avatarElements = avatarUrls.map((url) => (
    <div key={url}>
        <Image
            src={url}
            alt="users avatar"
            width={32}
            height={32}
            className="rounded-full border-2 border-background"
        />
    </div>
));

export default function HeroSection() {
    return (
        <section className="relative">
            {/* Background gradient */}
            <div
                className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
                aria-hidden="true"
            >
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-400 opacity-20 blur-[100px]" />
            </div>

            <div className="container px-4 pb-16 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-36">
                <div className="flex flex-col items-center justify-center leading-6 ">
                    <div
                        className={cn(
                            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                        )}
                    >
                        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                            <span>✨ Find Your Perfect Agency Match</span>
                            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedShinyText>
                    </div>

                    <h1 className="mt-6 text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl lg:text-6xl">
                        Discover & Connect <br />
                        <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            with Top Agencies Worldwide
                        </span>
                    </h1>

                    <p className="mt-6 max-w-[700px] text-center text-lg text-muted-foreground">
                        Share your requirements & we&#39;ll find the right service
                        provider for your project
                    </p>

                    <Card className="mt-12 w-full max-w-4xl border-none bg-background/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                        <Select >
                                <SelectTrigger className="h-12">
                                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="All Services" />
                                </SelectTrigger>
                                <SelectContent className="h-48">
                                    {services.map(service=>(
                                        <SelectItem value={service.name} key={service.name}>
                                        {service.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="h-12">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Select Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="na">
                                        North America
                                    </SelectItem>
                                    <SelectItem value="eu">Europe</SelectItem>
                                    <SelectItem value="asia">
                                        Asia Pacific
                                    </SelectItem>
                                    <SelectItem value="latam">
                                        Latin America
                                    </SelectItem>
                                    <SelectItem value="mea">
                                        Middle East & Africa
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="h-12">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="All Cities" />
                                </SelectTrigger>
                                <SelectContent className="h-48">
                                {cities.map(city=>(
                                        <SelectItem value={city} key={city}>
                                        {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                           

                            <Button
                                size="lg"
                                className="h-12 bg-orange-500 px-8 hover:bg-orange-600"
                            >
                                Search
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                        <Link href="/dashboard/get-listed">
                            <Button className="animate-buttonheartbeat rounded-md bg-orange-500 hover:bg-signature text-sm font-semibold text-white">
                                List Your Agency
                            </Button>
                        </Link>

                        <Link href="/dashboard/find-agencies">
                            <Button variant="outline" className="flex gap-1">
                                Find Agencies
                                <Search
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex -space-x-4">{avatarElements}</div>
                        <div>
                            <span className="font-medium">500+</span> Agencies
                            already listed
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
