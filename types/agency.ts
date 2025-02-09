export interface Agency {
    id: string;
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
    logoUrl: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string;
    founded: string;
    teamSize: string;
    hourlyRate: string;
    countryName: string;
    expertise?: string;
    clientSize: string;
    projectDuration?: string;
    
}
