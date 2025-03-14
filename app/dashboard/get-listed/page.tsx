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
import { FormSection, InputField, TextareaField, SubSection } from "./_components/agency-form-sections";
import { Progress } from "@/components/ui/progress"
import { FormMethodHeader } from "./_components/form-method-header";
import { createAgency } from '@/lib/actions/agencies';
import { IndustrySelect } from "./_components/industry-select";
import { LocationSelect } from "./_components/location-select";

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

const capitalizeFirstLetter = (str: string) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

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
        additionalLocations: [] as string[],
        locationCity: "",
        locationCountry: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        
        // Handle nested social media fields
        if (name.startsWith('socialMedia.')) {
            const socialField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                socialMedia: {
                    ...prev.socialMedia,
                    [socialField]: value
                }
            }));
        } else {
            // Handle other fields as before
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isFormValid()) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            // Prepare the data
            const agencyData = {
                ...formData,
                services: selectedServices,
                min_budget: parseInt(formData.min_budget),
                max_budget: parseInt(formData.max_budget),
                google_rating: parseFloat(formData.google_rating),
                google_review_count: parseInt(formData.google_review_count),
                founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
            };

            // Create agency in MongoDB
            const result = await createAgency(agencyData);

            if (result.success) {
                toast({
                    title: "Success!",
                    description: "Your agency has been successfully listed. Our team will review your submission.",
                });
                
                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                throw new Error(result.error || "Failed to create agency");
            }
        } catch (error) {
            console.error("Error creating agency:", error);
            toast({
                title: "Error",
                description: "Failed to list agency. Please try again.",
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
                return !!(
                    formData.name && 
                    formData.description && 
                    formData.location && 
                    formData.industries.length > 0
                );
            case 'contact-info':
                return !!(formData.email);
            case 'company-details':
                return !!(formData.websiteUrl && formData.imageUrl);
            case 'social-media':
                // Check if at least one social media link is provided
                return !!(
                    formData.socialMedia.linkedin ||
                    formData.socialMedia.twitter ||
                    formData.socialMedia.facebook ||
                    formData.socialMedia.instagram
                );
            case 'pricing':
                return !!(formData.starting_price && formData.min_budget && formData.max_budget);
            case 'google-reviews':
                return !!(formData.google_rating && formData.google_review_count);
            default:
                return false;
        }
    }, [formData]);

    useEffect(() => {
        const sections = [
            'basic-info',
            'contact-info',
            'company-details',
            'social-media',
            'pricing',
            'google-reviews'
        ];
        const completedSections = sections.filter(getSectionCompletion).length;
        setProgress((completedSections / sections.length) * 100);
    }, [formData, getSectionCompletion]);

    const isFormValid = () => {
        // Check required fields
        const requiredFields = {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            email: formData.email,
            websiteUrl: formData.websiteUrl,
            imageUrl: formData.imageUrl,
            starting_price: formData.starting_price,
            min_budget: formData.min_budget,
            max_budget: formData.max_budget,
        };

        const hasRequiredFields = Object.values(requiredFields).every(field => !!field);
        const hasServices = selectedServices.length > 0;
        const hasSocialMedia = Object.values(formData.socialMedia).some(url => !!url);
        const hasGoogleReviews = !!(formData.google_rating && formData.google_review_count);

        return hasRequiredFields && hasServices && hasSocialMedia && hasGoogleReviews;
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
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {formMethod && (
                                        <FormMethodHeader
                                            method={formMethod}
                                            onChangeMethod={() => setFormMethod(null)}
                                            onSwitchMethod={() => setFormMethod(formMethod === 'google' ? 'manual' : 'google')}
                                        />
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
                                            <SubSection title="Agency Identity">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <InputField
                                                        label="Agency Name"
                                                        required
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your agency name"
                                                        description="Your official agency name"
                                                    />
                                                    <InputField
                                                        label="Tagline"
                                                        id="tagline"
                                                        name="tagline"
                                                        value={formData.tagline}
                                                        onChange={handleChange}
                                                        placeholder="A short catchy tagline"
                                                        description="A brief slogan that describes your agency"
                                                    />
                                                </div>
                                            </SubSection>

                                            <SubSection title="Location Details">
                                                <div className="space-y-2">
                                                    <Label className="font-medium">
                                                        Primary Location *
                                                    </Label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Input
                                                                id="locationCity"
                                                                name="locationCity"
                                                                required
                                                                value={formData.locationCity || ''}
                                                                onChange={(e) => {
                                                                    const city = capitalizeFirstLetter(e.target.value);
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        locationCity: city,
                                                                        location: prev.locationCountry ? `${city}, ${prev.locationCountry}` : city
                                                                    }));
                                                                }}
                                                                placeholder="Enter city name"
                                                            />
                                                            <p className="text-xs text-muted-foreground">City</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Input
                                                                id="locationCountry"
                                                                name="locationCountry"
                                                                required
                                                                value={formData.locationCountry || ''}
                                                                onChange={(e) => {
                                                                    const country = capitalizeFirstLetter(e.target.value);
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        locationCountry: country,
                                                                        location: prev.locationCity ? `${prev.locationCity}, ${country}` : country
                                                                    }));
                                                                }}
                                                                placeholder="Enter country name"
                                                            />
                                                            <p className="text-xs text-muted-foreground">Country</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SubSection>

                                            <div className="space-y-2">
                                                <Label htmlFor="additionalLocations">Additional Locations</Label>
                                                <LocationSelect
                                                    value={formData.additionalLocations}
                                                    onChange={(locations) => 
                                                        setFormData(prev => ({ ...prev, additionalLocations: locations }))
                                                    }
                                                />
                                                <p className="text-sm text-muted-foreground">
                                                    Add any additional office locations
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="services">Services *</Label>
                                                <ServiceSelect
                                                    value={selectedServices}
                                                    onChange={setSelectedServices}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="industries">Industries</Label>
                                                <IndustrySelect
                                                    value={formData.industries}
                                                    onChange={(industries) => 
                                                        setFormData(prev => ({ ...prev, industries }))
                                                    }
                                                />
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
                                                        placeholder="https://linkedin.com/company/your-agency"
                                                        type="url"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="twitter">Twitter</Label>
                                                    <Input
                                                        id="twitter"
                                                        name="socialMedia.twitter"
                                                        value={formData.socialMedia.twitter}
                                                        onChange={handleChange}
                                                        placeholder="https://twitter.com/your-agency"
                                                        type="url"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="facebook">Facebook</Label>
                                                    <Input
                                                        id="facebook"
                                                        name="socialMedia.facebook"
                                                        value={formData.socialMedia.facebook}
                                                        onChange={handleChange}
                                                        placeholder="https://facebook.com/your-agency"
                                                        type="url"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="instagram">Instagram</Label>
                                                    <Input
                                                        id="instagram"
                                                        name="socialMedia.instagram"
                                                        value={formData.socialMedia.instagram}
                                                        onChange={handleChange}
                                                        placeholder="https://instagram.com/your-agency"
                                                        type="url"
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                At least one social media link is required
                                            </p>
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

                                    <div className="pt-6">
                                        <Button 
                                            type="submit" 
                                            className="w-full" 
                                            disabled={loading || !isFormValid()}
                                        >
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
                                </form>
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
