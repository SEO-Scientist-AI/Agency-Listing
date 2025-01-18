"use client"
import Link from 'next/link';
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { UserProfile } from "../user-profile";
import ModeToggle from "../mode-toggle";
import { BlocksIcon, ChevronDown, ChevronRight } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import config from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { Icons } from "@/components/Icons"



import { 
  Building2, 
  PenLine, 
  FileEdit, 
  Mail, 
  Target, 
  MapPin, 
  BarChart2, 
  MousePointerClick, 
  ThumbsUp, 
  Search, 
  Layout, 
  Globe, 
  Code 
} from 'lucide-react'


const services = [
  { icon: Building2, name: 'Digital Agencies' },
  { icon: PenLine, name: 'Advertising' },
  { icon: FileEdit, name: 'Content Marketing' },
  { icon: Mail, name: 'Email Marketing' },
  { icon: Target, name: 'Lead Generation' },
  { icon: MapPin, name: 'Local SEO' },
  { icon: BarChart2, name: 'Market Research' },
  { icon: MousePointerClick, name: 'PPC' },
  { icon: ThumbsUp, name: 'Social Media Marketing' },
  { icon: Search, name: 'SEO' },
  { icon: Layout, name: 'UX Design' },
  { icon: Globe, name: 'Web Design' },
  { icon: Code, name: 'Web Development' },
]

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Marketing Page",
        href: "/marketing-page",
        description: "Write some wavy here to get them to click.",
    },
];

export default function NavBar() {
    // Move hook call to the top level
    const auth = useAuth();
    
    // Compute userId after the hook call
    const userId = config?.auth?.enabled ? auth?.userId : null;

    return (
        <div className="flex min-w-full fixed justify-between p-4 border-b z-10 dark:bg-black dark:bg-opacity-50 bg-white">
            <div className="flex justify-between w-full min-[825px]:hidden">
                <Dialog>
                    <SheetTrigger className="p-2 transition">
                        <Button size="icon" variant="ghost" className="w-4 h-4" aria-label="Open menu" asChild>
                            <GiHamburgerMenu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>SEO Scientist</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button variant="outline" className="w-full">Home</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard" legacyBehavior passHref className="cursor-pointer">
                                    <Button variant="outline">Dashboard</Button>
                                </Link>
                            </DialogClose>
                        </div>
                    </SheetContent>
                </Dialog>
                <ModeToggle />
            </div>
            <NavigationMenu>
                <NavigationMenuList className="max-[825px]:hidden flex gap-3 w-[100%] justify-between">
                    <Link href="/" className="pl-2 flex items-center" aria-label="Home">
                        <Icons.companyLogo className="h-8 w-8" />
                        <div className="ml-2 flex flex-col gap-0">  
                            <span className="text-sm font-semibold">SEO Scientist</span>
                            <span className="text-xs">Agency Spot</span>
                        </div>
                        <span className="sr-only">Home</span>
                    </Link>                
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem className="max-[825px]:hidden ml-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="dark:bg-black dark:bg-opacity-50">
                                    Browse Agencies
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[90vw] p-0 dark:bg-gray-800 dark:text-white fixed left-[-170] top-[12px]">
                                <div className="grid grid-cols-4 gap-0">
                                    <div className="col-span-1 border-r dark:border-gray-700">
                                        <div className="py-4">
                                            {services.map((service) => {
                                                const Icon = service.icon
                                                return (
                                                    <DropdownMenuItem key={service.name} asChild>
                                                        <Link
                                                            href="#"
                                                            className={cn(
                                                                "flex items-center justify-between px-4 py-2.5 hover:bg-[#fff6f3] hover:text-[#ff642d] dark:hover:bg-gray-700 dark:hover:text-[#ff642d]"
                                                            )}
                                                        >
                                                            <span className="flex items-center gap-3 ">
                                                                <Icon className="h-4 w-4" />
                                                                <span className="text-sm font-medium">{service.name}</span>
                                                            </span>
                                                            <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                        </Link>
                                                    </DropdownMenuItem>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-span-3 grid grid-cols-3 gap-6 p-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">COUNTRIES</h3>
                                            <div className="space-y-2">
                                                {['Australia', 'Canada', 'France', 'Germany', 'India', 'Italy', 'Netherlands', 'Spain', 'United Kingdom', 'United States'].map((country) => (
                                                    <DropdownMenuItem key={country} asChild>
                                                        <Link href="#" className="text-sm font-medium text-gray-700 hover:text-[#ff642d] dark:text-gray-300 dark:hover:text-[#ff642d]">
                                                            {country}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">STATES</h3>
                                            <div className="space-y-2">
                                                {['Arizona', 'California', 'Colorado', 'Florida', 'Georgia', 'Illinois', 'Massachusetts', 'Minnesota', 'New York', 'Pennsylvania', 'Texas', 'Virginia', 'Washington'].map((state) => (
                                                    <DropdownMenuItem key={state} asChild>
                                                        <Link href="#" className="text-sm font-medium text-gray-700 hover:text-[#ff642d] dark:text-gray-300 dark:hover:text-[#ff642d]">
                                                            {state}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">CITIES</h3>
                                            <div className="space-y-2">
                                                {['Chicago', 'Dallas', 'Houston', 'London', 'Los Angeles', 'Manchester', 'Melbourne', 'San Diego', 'Sydney', 'Toronto'].map((city) => (
                                                    <DropdownMenuItem key={city} asChild>
                                                        <Link href="#" className="text-sm font-medium text-gray-700 hover:text-[#ff642d] dark:text-gray-300 dark:hover:text-[#ff642d]">
                                                            {city}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Put location aside and browse all Lead Generation agencies.
                                        </p>
                                        <Button className="bg-[#ff642d] hover:bg-[#e55a28] text-white">
                                            Browse agencies
                                        </Button>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="max-[825px]:hidden">
                        <Link href="/dashboard" legacyBehavior passHref>
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="max-[825px]:hidden">
                        <Link href="#faq" legacyBehavior passHref>
                            <Button variant="ghost">FAQ</Button>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2 max-[825px]:hidden">
                {userId && <UserProfile />}
                <ModeToggle />
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
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
