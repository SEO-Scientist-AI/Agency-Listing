"use client";

import { type FC } from "react";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Facebook,
    Instagram,
    Linkedin,
    Moon,
    Send,
    Sun,
    Twitter,
} from "lucide-react";
import Image from "next/image";
import { FacebookIcon, LinkedinIcon, InstagramIcon, XIcon } from "@/app/agency/_components/social-icons";

const Footer: FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);


    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <footer className="relative border-t bg-background transition-colors duration-300 mt-8">
            <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <div className="mb-6"> 
                            
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/images/favicon.svg"
                                    alt="Agency Spot Logo"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                            
                        </div>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            Global Marketing Agency Marketplace connecting brands with top agencies for branding, digital marketing, SEO, and advertising.
                        </p>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[#FF4405]/10 blur-2xl" />
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold dark:text-gray-100 text-gray-900">
                            Quick Links
                        </h3>
                        <nav className="space-y-2 text-sm">
                            {[
                                { href: "/", text: "Home" },
                                { href: "https://seoscientist.agency/blog/", text: "Our Blog" },
                                { href: "https://www.seoscientist.ai/", text: "Our Tools" },
                                { href: "https://seoscientist.agency/get-quote/", text: "Get Quote" },
                                { href: "https://seoscientist.agency/contact/", text: "Contact Us" },
                                { href: "https://seoscientist.agency/case-studies/", text: "Case Studies" },
                            ].map((link) => (
                                <Link
                                    key={link.text}
                                    href={link.href}
                                    className="block text-gray-600 dark:text-gray-400 transition-colors hover:text-[#ff642d]"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold dark:text-gray-100 text-gray-900">
                            Our Locations
                        </h3>
                        <address className="space-y-4 text-sm not-italic text-gray-600 dark:text-gray-400">
                            <div>
                                <p className="font-semibold flex items-center gap-2">
                                    <span role="img" aria-label="UAE flag">🇦🇪</span> UAE
                                </p>
                                <p>164, A1 Jaddaf Walk</p>
                                <p>A1 Jaddaf Dubai 500001</p>
                            </div>
                            <div>
                                <p className="font-semibold flex items-center gap-2">
                                    <span role="img" aria-label="India flag">🇮🇳</span> India
                                </p>
                                <p>404, 4th Floor Govindpuri</p>
                                <p>New Delhi-11003</p>
                            </div>
                            <div className="pt-2">
                                <p className="font-semibold flex items-center gap-2">
                                    <span role="img" aria-label="Contact">📞</span> Contact Us
                                </p>
                                <p>Phone: +917428430119</p>
                                <p>Email: info@seoscientist.agency</p>
                            </div>
                        </address>
                    </div>
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold dark:text-gray-100 text-gray-900">
                            Follow Us
                        </h3>
                        <div className="mb-6 flex space-x-4">
                            {[
                                { 
                                    href: "https://www.facebook.com/seoscientistagency/", 
                                    icon: FacebookIcon, 
                                    label: "Facebook",
                                    className: "p-1.5 border border-dashed border-[#1877F2]/20 rounded-lg text-[#1877F2] dark:text-[#1877F2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#1877F2]/5 transition-all bg-background"
                                },
                                { 
                                    href: "https://twitter.com/iamseoscientist", 
                                    icon: XIcon, 
                                    label: "Twitter",
                                    className: "p-1.5 border border-dashed border-[#1DA1F2]/20 rounded-lg text-[#1DA1F2] dark:text-[#1DA1F2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#1DA1F2]/5 transition-all bg-background"
                                },
                                { 
                                    href: "https://www.instagram.com/seoscientistuae/", 
                                    icon: InstagramIcon, 
                                    label: "Instagram",
                                    className: "p-1.5 border border-dashed border-[#E4405F]/20 rounded-lg text-[#E4405F] dark:text-[#E4405F]/80 hover:text-primary hover:border-primary/50 hover:bg-[#E4405F]/5 transition-all bg-background"
                                },
                                { 
                                    href: "https://www.linkedin.com/company/seoscientistusa", 
                                    icon: LinkedinIcon, 
                                    label: "LinkedIn",
                                    className: "p-1.5 border border-dashed border-[#0A66C2]/20 rounded-lg text-[#0A66C2] dark:text-[#0A66C2]/80 hover:text-primary hover:border-primary/50 hover:bg-[#0A66C2]/5 transition-all bg-background"
                                },
                            ].map((social) => (
                                <TooltipProvider key={social.label}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={social.className}
                                            >
                                                <social.icon />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Follow us on {social.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4" />
                            <Switch
                                id="dark-mode"
                                checked={isDarkMode}
                                onCheckedChange={setIsDarkMode}
                            />
                            <Moon className="h-4 w-4" />
                            <Label htmlFor="dark-mode" className="sr-only">
                                Toggle dark mode
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Copyright © 2024 SEO Scientist
                    </p>
                    <nav className="flex gap-4 text-sm">
                        {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-gray-600 dark:text-gray-400 transition-colors hover:text-[#ff642d]"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
