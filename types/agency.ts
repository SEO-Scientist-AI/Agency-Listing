export interface Agency {
    _id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    location: string;
    founded_year: number;
    team_size: string;
    starting_price: string;
    min_budget: number;
    max_budget: number;
    budget_ranges: string[];
    services: string[];
    industries: string[];
    client_sizes: string[];
    project_durations: string[];
    locations: string[];
    languages: string[];
    google_rating: number;
    google_review_count: number;
    expertise: {
        seo: string[];
        marketing: string[];
        development: string[];
    };
    created_at: Date;
}
