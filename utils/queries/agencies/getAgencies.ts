import { prisma } from '@/lib/prisma'

export async function getAgencies() {
  try {
    const agencies = await prisma.agency.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    // Return empty array if no agencies found
    if (!agencies || agencies.length === 0) {
      return []
    }

    // Parse JSON fields only if they exist
    return agencies.map(agency => {
      try {
        return {
          ...agency,
          services: agency.services ? JSON.parse(agency.services as string) : [],
          industries: agency.industries ? JSON.parse(agency.industries as string) : [],
          locations: agency.locations ? JSON.parse(agency.locations as string) : [],
          budget_ranges: agency.budget_ranges ? JSON.parse(agency.budget_ranges as string) : [],
          client_sizes: agency.client_sizes ? JSON.parse(agency.client_sizes as string) : [],
          project_durations: agency.project_durations ? JSON.parse(agency.project_durations as string) : [],
          languages: agency.languages ? JSON.parse(agency.languages as string) : [],
          expertise: agency.expertise ? JSON.parse(agency.expertise as string) : {
            seo: [],
            marketing: [],
            development: []
          }
        }
      } catch {
        return agency
      }
    })
  } catch (error) {
    console.error("Database Error:", error)
    return []
  }
}
