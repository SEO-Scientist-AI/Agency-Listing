import { prisma } from '@/lib/prisma'

export async function getAgencyBySlug(slug: string) {
  try {
    const agency = await prisma.agency.findUnique({
      where: { slug }
    })

    if (!agency) return null

    return {
      ...agency,
      services: JSON.parse(agency.services as string),
      industries: JSON.parse(agency.industries as string),
      locations: JSON.parse(agency.locations as string),
      budget_ranges: JSON.parse(agency.budget_ranges as string),
      client_sizes: JSON.parse(agency.client_sizes as string),
      project_durations: JSON.parse(agency.project_durations as string),
      languages: JSON.parse(agency.languages as string),
      expertise: JSON.parse(agency.expertise as string)
    }
  } catch (error) {
    console.error('Error fetching agency:', error)
    return null
  }
}
