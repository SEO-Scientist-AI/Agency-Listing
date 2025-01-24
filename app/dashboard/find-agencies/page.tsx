import { AgencyList } from './agency-list'
import { getAgencies } from '@/utils/queries/agencies/getAgencies'

export default async function FindAgencies() {
    const agencies = await getAgencies();
    
    // Transform agencies to match AgencyCardProps interface
    const serializedAgencies = agencies.map(agency => ({
        id: agency._id.toString(),
        slug: agency.slug,
        name: agency.name,
        tagline: agency.tagline,
        description: agency.description,
        location: agency.location,
        founded_year: agency.founded_year,
        team_size: agency.team_size,
        starting_price: agency.starting_price,
        min_budget: agency.min_budget,
        max_budget: agency.max_budget,
        services: Array.isArray(agency.services) ? agency.services : [],
        industries: Array.isArray(agency.industries) ? agency.industries : [],
        client_sizes: Array.isArray(agency.client_sizes) ? agency.client_sizes : [],
        budget_ranges: Array.isArray(agency.budget_ranges) ? agency.budget_ranges : [],
        project_durations: Array.isArray(agency.project_durations) ? agency.project_durations : [],
        locations: Array.isArray(agency.locations) ? agency.locations : [],
        languages: Array.isArray(agency.languages) ? agency.languages : [],
        google_rating: agency.google_rating || 0,
        google_review_count: agency.google_review_count || 0,
        expertise: {
            seo: Array.isArray(agency.expertise?.seo) ? agency.expertise.seo : [],
            marketing: Array.isArray(agency.expertise?.marketing) ? agency.expertise.marketing : [],
            development: Array.isArray(agency.expertise?.development) ? agency.expertise.development : []
        }
    }));

    return (
        <div className="container mx-auto max-w-7xl py-8">
            <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    TOP Professional APP Store Optimization Services
                </h1>
                <p className="text-base text-muted-foreground">
                    Discover the top APP Store Optimization Companies
                    worldwide. Connect with skilled marketing agencies from
                    our curated community to elevate your marketing
                    strategy.
                </p>
            </div>
            <AgencyList initialAgencies={serializedAgencies} />
        </div>
    );
}
