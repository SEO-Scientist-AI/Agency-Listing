"use client";

import { type FC } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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

const Footer: FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(true);
    const [isChatOpen, setIsChatOpen] = React.useState(false);

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <footer className="relative border-t bg-background text-foreground transition-colors duration-300 mt-8">
            <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">
                            Stay Connected
                        </h2>
                        <p className="mb-6 text-muted-foreground">
                            Join our newsletter for the latest updates and
                            exclusive offers.
                        </p>
                        <form className="relative">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pr-12 backdrop-blur-sm"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </form>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Links
                        </h3>
                        <nav className="space-y-2 text-sm">
                            <a
                                href="/"
                                className="block transition-colors hover:text-primary"
                            >
                                Home
                            </a>
                            <a
                                href="https://seoscientist.agency/blog/"
                                className="block transition-colors hover:text-primary"
                            >
                                Our Blog
                            </a>
                            <a
                                href="https://www.seoscientist.ai/"
                                className="block transition-colors hover:text-primary"
                            >
                                Our Tools
                            </a>
                            <a
                                href="https://seoscientist.agency/get-quote/"
                                className="block transition-colors hover:text-primary"
                            >
                                Get Quote
                            </a>
                            <a
                                href="https://seoscientist.agency/contact/"
                                className="block transition-colors hover:text-primary"
                            >
                                Contact Us
                            </a>
                            <a
                                href="https://seoscientist.agency/case-studies/"
                                className="block transition-colors hover:text-primary"
                            >
                                Case Studies
                            </a>
                        </nav>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Our Locations
                        </h3>
                        <address className="space-y-4 text-sm not-italic">
                            <div>
                                <p className="font-semibold">UAE</p>
                                <p>164, A1 Jaddaf Walk</p>
                                <p>A1 Jaddaf Dubai 500001</p>
                            </div>
                            <div>
                                <p className="font-semibold">India</p>
                                <p>404, 4th Floor Govindpuri</p>
                                <p>New Delhi-11003</p>
                            </div>
                            <div className="pt-2">
                                <p className="font-semibold">Contact Us</p>
                                <p>Phone: +917428430119</p>
                                <p>Email: info@seoscientist.agency</p>
                            </div>
                        </address>
                    </div>
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold">
                            Follow Us
                        </h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full"
                                            asChild
                                        >
                                            <a
                                                href="https://www.facebook.com/seoscientistagency/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Facebook className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Facebook
                                                </span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Facebook</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full"
                                            asChild
                                        >
                                            <a
                                                href="https://twitter.com/iamseoscientist"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Twitter className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Twitter
                                                </span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Twitter</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full"
                                            asChild
                                        >
                                            <a
                                                href="https://www.instagram.com/seoscientistuae/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Instagram className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Instagram
                                                </span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Instagram</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full"
                                            asChild
                                        >
                                            <a
                                                href="https://www.linkedin.com/company/seoscientistusa"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                                <span className="sr-only">
                                                    LinkedIn
                                                </span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Connect with us on LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>{" "}
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
                    <p className="text-sm text-muted-foreground">
                        Copyright © 2024 SEO Scientist
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Cookie Settings
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
