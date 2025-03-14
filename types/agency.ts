export interface Agency {
    _id: string;
    agencySlug:string;
    name: string;
    description: string;
    location: string;
    additionalLocations: string[];
    tagline: string;
    rating: number;
    reviewCount: number;
    budgetRange: string;
    services: string[];
    industries: string[];
    websiteUrl: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    imageUrl: string;
    founded: string;
    teamSize: string;
    hourlyRate: string;
    socialLinks:{
        facebook:string;
        linkedin:string;
        instagram:string;
        youtube:string;
    }
    slug:string[];
    slugLocation:string[];
    combinedSlug:string[];
    email:string;
    gmbLink:string;
    projectDuration?: string;
}
