import connectDB from '@/lib/mongodb'
import Agency from '@/models/Agency'
import type { Agency as AgencyType } from '@/types/agency'

export async function getAgencies(): Promise<AgencyType[]> {
  try {
    await connectDB()
    const agencies = await Agency.find().lean()

    if (!agencies || agencies.length === 0) {
      return []
    }

    return agencies.map(agency => {
      try {
        const { __v, ...agencyData } = agency
        return {
          ...agencyData,
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
        console.error(`Error parsing agency data for ${agency.slug}:`, parseError)
        return null
      }
    }).filter((agency): agency is AgencyType => agency !== null)
  } catch (error) {
    console.error("Database Error:", error)
    return []
  }
}