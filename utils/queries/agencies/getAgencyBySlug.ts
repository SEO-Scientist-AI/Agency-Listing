import connectDB from '@/lib/mongodb';
import Agency from '@/models/Agency';
import type { Agency as AgencyType } from '@/types/agency';

export async function getAgencyBySlug(slug: string): Promise<AgencyType | null> {
  await connectDB();

  try {
    const agency = await Agency.findOne({ slug }).lean();

    if (!agency) return null;

    // Type guard to ensure agency is of type AgencyType
    if (!isAgency(agency)) {
      console.error('Fetched agency does not match AgencyType');
      return null;
    }

    // Convert ObjectId to string and include all properties
    return {
      _id: agency._id.toString(),
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
      services: parseField(agency.services),
      industries: parseField(agency.industries),
      locations: parseField(agency.locations),
      budget_ranges: parseField(agency.budget_ranges),
      client_sizes: parseField(agency.client_sizes),
      project_durations: parseField(agency.project_durations),
      languages: parseField(agency.languages),
      expertise: parseField(agency.expertise),
      google_rating: agency.google_rating,
      google_review_count: agency.google_review_count,
      created_at: agency.created_at
    };
  } catch (error) {
    console.error('Error fetching agency:', error);
    return null;
  }
}

function parseField(field: any): any {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      console.error('Error parsing field:', field);
      return field; // Return original if parsing fails
    }
  }
  return field; // Return as is if not a string
}

function isAgency(agency: any): agency is AgencyType {
  return agency && typeof agency.slug === 'string' && typeof agency.name === 'string'; // Add other property checks as necessary
}
