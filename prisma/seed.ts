import { PrismaClient } from '@prisma/client'
import { seedAgencies } from './seed-data'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.agency.deleteMany({})

  // Insert new data
  for (const agency of seedAgencies) {
    await prisma.agency.upsert({
      where: { slug: agency.slug },
      update: agency,
      create: agency
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
