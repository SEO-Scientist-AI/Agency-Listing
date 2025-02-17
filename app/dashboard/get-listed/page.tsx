"use client";

import { useState, useEffect, useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogoUpload } from "./_components/logo-upload";
import { GoogleReviewsFetch } from "./_components/google-reviews-fetch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormMethodSelector } from "./_components/form-method-selector";
import { AgencySidebar } from "./_components/agency-sidebar";
import { FormSection, InputField, TextareaField } from "./_components/agency-form-sections";
import { Progress } from "@/components/ui/progress"

const featuredAgencies = [
  {
    id: 1,
    name: "Apricot DB",
    logo: "/images/agency/apricotdb.jpg",
  },
  {
    id: 2,
    name: "Aries Web Solutions",
    logo: "/images/agency/aries-web-solutions.jpg",
  },
  {
    id: 3,
    name: "Baunfire",
    logo: "/images/agency/baunfire.jpg",
  },
  {
    id: 4,
    name: "Brainz Digital",
    logo: "/images/agency/brainz-digital.jpg",
  },
  {
    id: 5,
    name: "Cadence SEO",
    logo: "/images/agency/cadenceseo.jpg",
  },
  {
    id: 6,
    name: "The Bureau of Small Projects",
    logo: "/images/agency/the-bureau-of-small-projects.jpg",
  },
];

const companies = featuredAgencies;

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
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [formMethod, setFormMethod] = useState<'google' | 'manual' | null>(null);
    const [progress, setProgress] = useState(0);

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
        founded_year: "",
        team_size: "",
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
        starting_price: "",
        min_budget: "",
        max_budget: "",
        google_rating: "",
        google_review_count: "",
        client_sizes: [] as string[],
        project_durations: [] as string[],
        locations: [] as string[],
        expertise: [] as string[],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post("/api/agency/create", {
                ...formData,
                services: selectedServices,
                min_budget: parseInt(formData.min_budget),
                max_budget: parseInt(formData.max_budget),
                google_rating: parseFloat(formData.google_rating),
                google_review_count: parseInt(formData.google_review_count),
                founded_year: parseInt(formData.founded_year),
            });

            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "Agency listed successfully",
                });
                router.push('/agency');
            }
        } catch (error) {
            console.error("Error creating agency:", error);
            toast({
                title: "Error",
                description: "Failed to list agency",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const teamSizes = [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
    ];

    const projectDurations = [
        "Less than 1 month",
        "1-3 months",
        "3-6 months",
        "6-12 months",
        "1+ year",
    ];

    const clientSizes = [
        "Startups",
        "Small Business",
        "Mid-Market",
        "Enterprise",
    ];

    const scrollToGoogleSection = () => {
        setTimeout(() => {
            const googleSection = document.querySelector('[value="google-reviews"]');
            if (googleSection) {
                googleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (googleSection as HTMLElement).click();
            }
        }, 100);
    };

    const getSectionCompletion = useCallback((section: string) => {
        switch (section) {
            case 'basic-info':
                return !!(formData.name && formData.description && formData.location);
            case 'contact-info':
                return !!(formData.email);
            case 'company-details':
                return !!(formData.websiteUrl && formData.imageUrl);
            case 'pricing':
                return !!(formData.starting_price && formData.min_budget && formData.max_budget);
            case 'google-reviews':
                return !!(formData.google_rating && formData.google_review_count);
            default:
                return false;
        }
    }, [formData]);

    useEffect(() => {
        const sections = ['basic-info', 'contact-info', 'company-details', 'pricing', 'google-reviews'];
        const completedSections = sections.filter(getSectionCompletion).length;
        setProgress((completedSections / sections.length) * 100);
    }, [formData, getSectionCompletion]);

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
                            {formMethod && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Overall Progress</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            {!formMethod ? (
                                <FormMethodSelector 
                                    onSelect={(method) => {
                                        setFormMethod(method);
                                        if (method === 'google') {
                                            scrollToGoogleSection();
                                        }
                                    }}
                                />
                            ) : (
                                <>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {formMethod === 'google' && (
                                            <div className="mb-6 p-4 bg-muted rounded-lg">
                                                <p className="text-sm">
                                                    Start by entering your Google Business URL in the Google Reviews section below.
                                                    The form will be auto-filled with your business details.
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="link"
                                                    onClick={() => setFormMethod(null)}
                                                    className="px-0"
                                                >
                                                    Switch to manual entry
                                                </Button>
                                            </div>
                                        )}

                                        <Accordion 
                                            type="single" 
                                            collapsible 
                                            defaultValue={formMethod === 'google' ? 'google-reviews' : 'basic-info'}
                                        >
                                            <FormSection
                                                title="Basic Information"
                                                value="basic-info"
                                                isCompleted={getSectionCompletion('basic-info')}
                                            >
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
                                                            value={selectedServices}
                                                            onChange={setSelectedServices}
                                                        />
                                                    </div>
                                                </div>
                                            </FormSection>

                                            <FormSection
                                                title="Contact Information"
                                                value="contact-info"
                                                isCompleted={getSectionCompletion('contact-info')}
                                            >
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
                                            </FormSection>

                                            <FormSection
                                                title="Company Details"
                                                value="company-details"
                                                isCompleted={getSectionCompletion('company-details')}
                                            >
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
                                                        <Label>Agency Logo</Label>
                                                        <LogoUpload 
                                                            onUploadComplete={(url) => 
                                                                setFormData(prev => ({ ...prev, imageUrl: url || '' }))
                                                            }
                                                            maxSizeInMB={5}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="founded_year">Founded Year</Label>
                                                        <Input
                                                            id="founded_year"
                                                            name="founded_year"
                                                            type="number"
                                                            value={formData.founded_year}
                                                            onChange={handleChange}
                                                            placeholder="2020"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="team_size">Team Size</Label>
                                                        <Select
                                                            name="team_size"
                                                            onValueChange={(value) =>
                                                                setFormData((prev) => ({ ...prev, team_size: value }))
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select team size" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {teamSizes.map((size) => (
                                                                    <SelectItem key={size} value={size}>
                                                                        {size}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="budgetRange">Budget Range</Label>
                                                        <Input
                                                            id="budgetRange"
                                                            name="budgetRange"
                                                            value={formData.budgetRange}
                                                            onChange={handleChange}
                                                            placeholder="e.g., $1,000 - $10,000"
                                                        />
                                                    </div>
                                                </div>
                                            </FormSection>

                                            <FormSection
                                                title="Social Media"
                                                value="social-media"
                                                isCompleted={getSectionCompletion('social-media')}
                                            >
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
                                            </FormSection>

                                            <FormSection
                                                title="Pricing Information"
                                                value="pricing"
                                                isCompleted={getSectionCompletion('pricing')}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <Label htmlFor="starting_price">Starting Price</Label>
                                                        <Input
                                                            id="starting_price"
                                                            name="starting_price"
                                                            value={formData.starting_price}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="min_budget">Minimum Budget</Label>
                                                        <Input
                                                            type="number"
                                                            id="min_budget"
                                                            name="min_budget"
                                                            value={formData.min_budget}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="max_budget">Maximum Budget</Label>
                                                        <Input
                                                            type="number"
                                                            id="max_budget"
                                                            name="max_budget"
                                                            value={formData.max_budget}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </FormSection>

                                            <FormSection
                                                title="Google Reviews"
                                                value="google-reviews"
                                                isCompleted={getSectionCompletion('google-reviews')}
                                            >
                                                <GoogleReviewsFetch
                                                    onFetchComplete={({ rating, reviewCount, name, address, website, phone }) => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            google_rating: rating.toString(),
                                                            google_review_count: reviewCount.toString(),
                                                            ...(name && !prev.name ? { name } : {}),
                                                            ...(address && !prev.location ? { location: address } : {}),
                                                            ...(website && !prev.websiteUrl ? { websiteUrl: website } : {}),
                                                            ...(phone && !prev.phone ? { phone } : {})
                                                        }));
                                                    }}
                                                />
                                            </FormSection>
                                        </Accordion>
                                    </form>
                                    
                                    <div className="pt-6">
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
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1">
                    <AgencySidebar 
                        companies={companies}
                        testimonials={testimonials}
                        stats={stats}
                    />
                </div>
            </div>
        </div>
    );
}
