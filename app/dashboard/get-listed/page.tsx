"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios-instance";
import Image from "next/image";
import { ServiceSelect } from "./_components/service-select";

const companies = [
    { id: 0, name: "Company 1" },
    { id: 1, name: "Company 2" },
    { id: 2, name: "Company 3" },
    { id: 3, name: "Company 4" },
    { id: 4, name: "Company 5" },
    { id: 5, name: "Company 6" },
];

const testimonials = [
    {
        quote: "We found our ideal partnerships within 48 hours of listing. The quality of connections was exceptional!",
        author: "Sarah Chen",
        company: "TechCorp",
    },
    {
        quote: "The platform made finding agency partnerships incredibly simple. Highly recommended!",
        author: "Mark Johnson",
        company: "StartupX",
    },
    {
        quote: "We've consistently found high-quality partnerships here. It's our go-to platform for all our growth needs.",
        author: "Emily Rodriguez",
        company: "InnovateNow",
    },
];

const stats = [
    { value: "10k+", label: "Monthly active agencies" },
    { value: "48h", label: "Average response time" },
    { value: "95%", label: "Client satisfaction rate" },
    { value: "500+", label: "Active partnerships" },
];

export default function GetListed() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        location: "",
        websiteUrl: "",
        imageUrl: "",
        services: [] as string[],
        budgetRange: "",
        email: "",
        phone: "",
        foundedYear: "",
        teamSize: "",
        industries: [] as string[],
        languages: "",
        socialMedia: {
            linkedin: "",
            twitter: "",
            facebook: "",
            instagram: "",
        },
        officeAddress: "",
        projectDeliveryProcess: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/agency/create', formData);

            if (response.data.success) {
                toast({
                    title: "Success!",
                    description: "Your agency has been listed successfully.",
                });
                router.push('/agency');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to list your agency. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

  return (
        <div className="container py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>List Your Agency</CardTitle>
                            <CardDescription>
                                Fill out the form below to get your agency listed on our platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Basic Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Agency Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your agency name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tagline">Tagline</Label>
                                            <Input
                                                id="tagline"
                                                name="tagline"
                                                value={formData.tagline}
                                                onChange={handleChange}
                                                placeholder="A short catchy tagline"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            required
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe your agency and its services"
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location *</Label>
                                            <Input
                                                id="location"
                                                name="location"
                                                required
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="City, Country"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="services">Services *</Label>
                                            <ServiceSelect
                                                value={formData.services}
                                                onChange={(services) => setFormData(prev => ({ ...prev, services }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="contact@agency.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Company Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="websiteUrl">Website URL</Label>
                                            <Input
                                                id="websiteUrl"
                                                name="websiteUrl"
                                                type="url"
                                                value={formData.websiteUrl}
                                                onChange={handleChange}
                                                placeholder="https://your-agency.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="imageUrl">Logo URL</Label>
                                            <Input
                                                id="imageUrl"
                                                name="imageUrl"
                                                type="url"
                                                value={formData.imageUrl}
                                                onChange={handleChange}
                                                placeholder="https://your-agency.com/logo.png"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="foundedYear">Founded Year</Label>
                                            <Input
                                                id="foundedYear"
                                                name="foundedYear"
                                                type="number"
                                                value={formData.foundedYear}
                                                onChange={handleChange}
                                                placeholder="2020"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="teamSize">Team Size</Label>
                                            <Input
                                                id="teamSize"
                                                name="teamSize"
                                                value={formData.teamSize}
                                                onChange={handleChange}
                                                placeholder="e.g., 10-50 employees"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="budgetRange">Budget Range</Label>
                                            <Input
                                                id="budgetRange"
                                                name="budgetRange"
                                                value={formData.budgetRange}
                                                onChange={handleChange}
                                                placeholder={'e.g., $1,000 - $10,000'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Social Media</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="linkedin">LinkedIn</Label>
                                            <Input
                                                id="linkedin"
                                                name="socialMedia.linkedin"
                                                value={formData.socialMedia.linkedin}
                                                onChange={handleChange}
                                                placeholder="LinkedIn URL"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="twitter">Twitter</Label>
                                            <Input
                                                id="twitter"
                                                name="socialMedia.twitter"
                                                value={formData.socialMedia.twitter}
                                                onChange={handleChange}
                                                placeholder="Twitter URL"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Agency"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card className="lg:sticky lg:top-4">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Trusted by Industry Leaders
                            </CardTitle>
                            <CardDescription>
                                Join thousands of agencies growing their business
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Company Logos */}
                            <div className="grid grid-cols-3 gap-4">
                                {companies.map((company) => (
                                    <div
                                        key={company.id}
                                        className="flex items-center justify-center"
                                    >
                                        <Image
                                            src="/images/placeholder.svg"
                                            alt={company.name}
                                            height={80}
                                            width={80}
                                            className="opacity-75 transition-opacity hover:opacity-100 rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Testimonials */}
                            <div className="space-y-4">
                                {testimonials.map((testimonial, index) => (
                                    <blockquote
                                        key={index}
                                        className="border-l-2 border-primary pl-4"
                                    >
                                        <p className="text-sm italic text-muted-foreground">
                                            "{testimonial.quote}"
                                        </p>
                                        <footer className="mt-2 text-sm font-medium">
                                            - {testimonial.author}, {testimonial.company}
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="rounded-lg bg-muted p-4">
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
    );
}
