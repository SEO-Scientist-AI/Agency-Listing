"use client";
import Link from "next/link";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../ui/button";
import {
Sheet,
SheetContent,
SheetHeader,
SheetTitle,
SheetTrigger,
SheetClose,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";
import ModeToggle from "../mode-toggle";
import { BlocksIcon, ChevronDown, ChevronRight } from "lucide-react";
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { Icons } from "@/components/Icons";
import {
cities,
states,
countries,
services,
} from "@/components/wrapper/location-data";
import { AgencyButton } from "../ui/agency-button";

const components: { title: string; href: string; description: string }[] = [
{
    title: "Marketing Page",
    href: "/marketing-page",
    description: "Write some wavy here to get them to click.",
},
];

export default function NavbarCopy() {
// Move hook call to the top level
const auth = useAuth();

const [currentService, setCurrentService] = React.useState(
    services[0].name
);
const [open, setOpen] = React.useState(false);

// Compute userId after the hook call
const userId = config?.auth?.enabled ? auth?.userId : null;

return (
    <div className="flex min-w-full fixed justify-between p-4 border-b z-50 dark:bg-black dark:bg-opacity-50 bg-white">
        <div className="container mx-auto max-w-8xl flex justify-between">
            <div className="flex justify-between w-full min-[825px]:hidden">
                <Sheet>
                    <SheetTrigger className="p-2 transition">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="w-4 h-4"
                            aria-label="Open menu"
                            asChild
                        >
                            <GiHamburgerMenu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Agency Spot</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem]">
                            <SheetClose asChild>
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Home
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Browse Agencies{" "}
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="left"
                                        aria-describedby={undefined}
                                    >
                                        <SheetHeader>
                                            <SheetTitle>
                                                Browse Agencies
                                            </SheetTitle>
                                        </SheetHeader>
                                        <div className="flex flex-col space-y-3 mt-[1rem]">
                                            <SheetClose asChild>
                                                <Sheet
                                                    open={open}
                                                    onOpenChange={setOpen}
                                                >
                                                    <SheetTrigger>
                                                        <div className="py-4">
                                                            {services.map(
                                                                (service) => {
                                                                    const Icon =
                                                                        service.icon;
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                service.name
                                                                            }
                                                                            onClick={() => {
                                                                                setOpen(
                                                                                    true
                                                                                );
                                                                                setCurrentService(
                                                                                    service.name
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                href="#"
                                                                                className={
                                                                                    cn(
                                                                                        "flex items-center justify-between px-4 py-2 hover:bg-[#fff6f3] hover:text-[#ff642d] dark:hover:bg-gray-700 dark:hover:text-[#ff642d]"
                                                                                    ) +
                                                                                    (currentService ===
                                                                                    service.name
                                                                                        ? "bg-[#fff6f3] text-[#ff642d]"
                                                                                        : "")
                                                                                }
                                                                            >
                                                                                <span className="flex items-center gap-3 ">
                                                                                    <Icon className="h-4 w-4" />
                                                                                    <span className="text-sm font-medium">
                                                                                        {
                                                                                            service.name
                                                                                        }
                                                                                    </span>
                                                                                </span>
                                                                                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                                            </Link>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </SheetTrigger>
                                                    <SheetContent
                                                        side="left"
                                                        aria-describedby={
                                                            undefined
                                                        }
                                                    >
                                                        <SheetHeader>
                                                            <SheetTitle>
                                                                Browse Place
                                                            </SheetTitle>
                                                        </SheetHeader>
                                                        <div className="flex flex-col space-y-3 mt-[1rem]">
                                                            <SheetClose asChild>
                                                                <Sheet>
                                                                    <SheetTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-full"
                                                                        >
                                                                            Countries
                                                                            <ChevronRight className="ml-2 h-4 w-4" />
                                                                        </Button>
                                                                    </SheetTrigger>
                                                                    <SheetContent
                                                                        side="left"
                                                                        aria-describedby={
                                                                            undefined
                                                                        }
                                                                    >
                                                                        <SheetHeader>
                                                                            <SheetTitle>
                                                                                Countries
                                                                            </SheetTitle>
                                                                        </SheetHeader>
                                                                        <div className="flex flex-col space-y-3 mt-[1rem]">
                                                                            {countries.map(
                                                                                (
                                                                                    country
                                                                                ) => (
                                                                                    <SheetClose
                                                                                        asChild
                                                                                        key={
                                                                                            country
                                                                                        }
                                                                                    >
                                                                                        <Link
                                                                                            href={`/${currentService}/${country}`}
                                                                                        >
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                className="w-full"
                                                                                            >
                                                                                                {
                                                                                                    country
                                                                                                }
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </SheetClose>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </SheetContent>
                                                                </Sheet>
                                                            </SheetClose>

                                                            <SheetClose asChild>
                                                                <Sheet>
                                                                    <SheetTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-full"
                                                                        >
                                                                            States
                                                                            <ChevronRight className="ml-2 h-4 w-4" />
                                                                        </Button>
                                                                    </SheetTrigger>
                                                                    <SheetContent side="left">
                                                                        <SheetHeader>
                                                                            <SheetTitle>
                                                                                States
                                                                            </SheetTitle>
                                                                        </SheetHeader>
                                                                        <div className="flex flex-col space-y-3 mt-[1rem]">
                                                                            {states.map(
                                                                                (
                                                                                    state
                                                                                ) => (
                                                                                    <SheetClose
                                                                                        asChild
                                                                                        key={
                                                                                            state
                                                                                        }
                                                                                    >
                                                                                        <Link
                                                                                            href={`/${currentService}/${state}`}
                                                                                        >
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                className="w-full"
                                                                                            >
                                                                                                {
                                                                                                    state
                                                                                                }
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </SheetClose>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </SheetContent>
                                                                </Sheet>
                                                            </SheetClose>

                                                            <SheetClose asChild>
                                                                <Sheet>
                                                                    <SheetTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-full"
                                                                        >
                                                                            Cities
                                                                            <ChevronRight className="ml-2 h-4 w-4" />
                                                                        </Button>
                                                                    </SheetTrigger>
                                                                    <SheetContent side="left">
                                                                        <SheetHeader>
                                                                            <SheetTitle>
                                                                                Cities
                                                                            </SheetTitle>
                                                                        </SheetHeader>
                                                                        <div className="flex flex-col space-y-3 mt-[1rem]">
                                                                            {cities.map(
                                                                                (
                                                                                    city
                                                                                ) => (
                                                                                    <SheetClose
                                                                                        asChild
                                                                                        key={
                                                                                            city
                                                                                        }
                                                                                    >
                                                                                        <Link
                                                                                            href={`/${currentService}/${city}`}
                                                                                        >
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                className="w-full"
                                                                                            >
                                                                                                {
                                                                                                    city
                                                                                                }
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </SheetClose>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </SheetContent>
                                                                </Sheet>
                                                            </SheetClose>
                                                        </div>
                                                    </SheetContent>
                                                </Sheet>
                                            </SheetClose>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link
                                    href="/dashboard"
                                    legacyBehavior
                                    passHref
                                    className="cursor-pointer"
                                >
                                    <Button variant="outline">Dashboard</Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
                <ModeToggle />
            </div>
            <NavigationMenu>
                <NavigationMenuList className="max-[825px]:hidden flex gap-3 w-[100%] justify-between">
                    <Link
                        href="/"
                        className="flex items-center"
                        aria-label="Home"
                    >
                        <Icons.companyLogo className="h-8 w-8" />
                        <div className="ml-2 flex flex-col gap-0">
                            <span className="text-sm font-semibold">
                                SEO Scientist
                            </span>
                            <span className="text-xs">Agency Spot</span>
                        </div>
                        <span className="sr-only">Home</span>
                    </Link>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem className="max-[825px]:hidden ml-8">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="dark:bg-black dark:bg-opacity-50"
                                >
                                    Browse Agencies
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="max-[825px]:hidden w-[100vw] outline-none shadow-none border-none  p-0 dark:bg-gray-800 dark:text-white flex items-center justify-center">
                                <div className="w-[90vw] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none">
                                    <div className="grid grid-cols-4 gap-0">
                                        <div className="col-span-1 border-r dark:border-gray-700">
                                            <div className="py-4">
                                                {services.map((service) => {
                                                    const Icon = service.icon;
                                                    return (
                                                        <div
                                                            key={service.name}
                                                            onClick={() =>
                                                                setCurrentService(
                                                                    service.name
                                                                )
                                                            }
                                                        >
                                                            <Link
                                                                href="#"
                                                                className={
                                                                    cn(
                                                                        "flex items-center justify-between px-4 py-2 hover:bg-[#fff6f3] hover:text-[#ff642d] dark:hover:bg-gray-700 dark:hover:text-[#ff642d]"
                                                                    ) +
                                                                    (currentService ===
                                                                    service.name
                                                                        ? "bg-[#fff6f3] text-[#ff642d]"
                                                                        : "")
                                                                }
                                                            >
                                                                <span className="flex items-center gap-3 ">
                                                                    <Icon className="h-4 w-4" />
                                                                    <span className="text-sm font-medium">
                                                                        {
                                                                            service.name
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="col-span-3 grid grid-cols-3 gap-6 p-6 ">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                                    COUNTRIES
                                                </h3>
                                                <div className="space-y-1">
                                                    {countries.map(
                                                        (country) => (
                                                            <div key={country}>
                                                                <Link
                                                                    href={`/${currentService}/${country}`}
                                                                    className="text-sm font-medium text-gray-700 hover:text-[#ff642d] dark:text-gray-300 dark:hover:text-[#ff642d]"
                                                                >
                                                                    {country}
                                                                </Link>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                                    STATES
                                                </h3>
                                                <div className="space-y-1">
                                                    {states.map((state) => (
                                                        <div key={state}>
                                                            <Link
                                                                href={`/${currentService}/${state}`}
                                                                className="text-sm font-medium text-gray-700 hover:text-[#ff642d] dark:text-gray-300 dark:hover:text-[#ff642d]"
                                                            >
                                                                {state}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                                                    CITIES
                                                </h3>
                                                <div className="space-y-1">
                                                    {cities.map((city) => (
                                                        <div key={city}>
                                                            <Link
                                                                href={`/${currentService}/${city}`}
                                                                className="text-sm font-medium text-gray-700 hover:text-[#ff642d] dark:text-gray-300 dark:hover:text-[#ff642d]"
                                                            >
                                                                {city}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-2 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Put location aside and browse
                                                all Lead Generation agencies.
                                            </p>
                                            <Button className="bg-[#ff642d] hover:bg-[#e55a28] text-white">
                                                Browse agencies
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-6 max-[825px]:hidden">
                <Link
                    href="https://seoscientist.agency/case-studies/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="ghost">Case Studies</Button>
                </Link>
                <Link
                    href="https://seoscientist.agency/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="ghost">About Us</Button>
                </Link>
                <Link href="/dashboard/settings">
                    <AgencyButton>
                        List Agency
                    </AgencyButton>
                </Link>
                {userId && <UserProfile />}
            </div>
        </div>
    </div>
);
}
const ListItem = React.forwardRef<
React.ElementRef<"a">,
React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
return (
    <li>
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">
                    {title}
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
);
});
ListItem.displayName = "ListItem";
