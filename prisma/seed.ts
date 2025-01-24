import { PrismaClient } from '@prisma/client'
import { agencies } from '../app/find-agencies/agency-data'

const prisma = new PrismaClient()

async function main() {
  for (const agency of agencies) {
    await prisma.agency.upsert({
      where: { slug: agency.id },
      update: {
        ...agency,
        slug: agency.id,
        googleReview: agency.googleReview as any,
        expertise: agency.expertise as any,
      },
      create: {
        ...agency,
        slug: agency.id,
        googleReview: agency.googleReview as any,
        expertise: agency.expertise as any,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
