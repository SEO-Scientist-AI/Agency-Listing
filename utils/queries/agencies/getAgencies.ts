import { prisma } from '@/lib/prisma'

export async function getAgencies() {
  try {
    const agencies = await prisma.agency.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    if (!agencies || agencies.length === 0) {
      return []
    }

    return agencies.map(agency => {
      try {
        return {
          ...agency,
          services: typeof agency.services === 'string' ? JSON.parse(agency.services) : agency.services,
          industries: typeof agency.industries === 'string' ? JSON.parse(agency.industries) : agency.industries,
          locations: typeof agency.locations === 'string' ? JSON.parse(agency.locations) : agency.locations,
          budget_ranges: typeof agency.budget_ranges === 'string' ? JSON.parse(agency.budget_ranges) : agency.budget_ranges,
          client_sizes: typeof agency.client_sizes === 'string' ? JSON.parse(agency.client_sizes) : agency.client_sizes,
          project_durations: typeof agency.project_durations === 'string' ? JSON.parse(agency.project_durations) : agency.project_durations,
          languages: typeof agency.languages === 'string' ? JSON.parse(agency.languages) : agency.languages,
          expertise: typeof agency.expertise === 'string' ? JSON.parse(agency.expertise) : agency.expertise
        }
      } catch (parseError) {
        console.error('Error parsing agency data:', parseError)
        return agency
      }
    })
  } catch (error) {
    console.error("Database Error:", error instanceof Error ? error.message : String(error))
    return []
  }
}
