import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// Helper function to safely parse JSON
const safeJsonParse = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export async function getAgencyBySlug(slug: string) {
  try {
    const agency = await prisma.agency.findUnique({
      where: { slug }
    });

    if (!agency) {
      console.log('Agency not found:', slug);
      return null;
    }

    // Parse JSON fields safely
    const parsedAgency = {
      ...agency,
      // Parse array fields as JSON with fallback to empty arrays
      services: safeJsonParse(agency.services as string | null) || [],
      industries: safeJsonParse(agency.industries as string | null) || [],
      locations: safeJsonParse(agency.locations as string | null) || [],
      budget_ranges: safeJsonParse(agency.budget_ranges as string | null) || [],
      client_sizes: safeJsonParse(agency.client_sizes as string | null) || [],
      project_durations: safeJsonParse(agency.project_durations as string | null) || [],
      languages: safeJsonParse(agency.languages as string | null) || [],
      // Parse object field with fallback to empty object
      expertise: safeJsonParse(agency.expertise as string | null) || {
        seo: [],
        marketing: [],
        development: []
      },
      // Handle scalar fields directly
      team_size: agency.team_size || null,
      starting_price: agency.starting_price || null,
    };

    return parsedAgency;
  } catch (error) {
    console.error('Error in getAgencyBySlug:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Known Prisma error:', error.message, error.code);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('Unknown Prisma error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}
