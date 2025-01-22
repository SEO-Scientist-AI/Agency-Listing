import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// Helper function to safely parse JSON
const safeJsonParse = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export async function getAgencies() {
  try {
    // Use a transaction to ensure connection is properly managed
    const agencies = await prisma.$transaction(async (tx) => {
      return await tx.agency.findMany({
        orderBy: {
          created_at: 'desc'
        }
      })
    }, {
      maxWait: 5000, // 5s maximum wait time
      timeout: 10000  // 10s timeout
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
          // Parse array fields as JSON
          services: safeJsonParse(agency.services as string | null) || [],
          industries: safeJsonParse(agency.industries as string | null) || [],
          locations: safeJsonParse(agency.locations as string | null) || [],
          budget_ranges: safeJsonParse(agency.budget_ranges as string | null) || [],
          // Handle scalar fields directly
          team_size: agency.team_size || null,
          starting_price: agency.starting_price || null,
        }
      } catch (error) {
        console.error('Error parsing agency data:', error)
        return agency
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Known Prisma error:', error.message, error.code)
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('Unknown Prisma error:', error.message)
    } else {
      console.error('Unexpected error:', error)
    }
    throw error
  } finally {
    // Ensure connection is properly disconnected
    await prisma.$disconnect()
  }
}
