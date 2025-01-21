import { PrismaClient } from '@prisma/client'
import { seedAgencies } from './seed-data'

const prisma = new PrismaClient()

async function main() {
  for (const agency of seedAgencies) {
    await prisma.agency.create({
      data: agency
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
