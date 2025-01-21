import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data
  await prisma.agency_impact.deleteMany();
  await prisma.agency_award.deleteMany();
  await prisma.agency_social_link.deleteMany();
  await prisma.agency_location.deleteMany();
  await prisma.agency_industry.deleteMany();
  await prisma.agency_service.deleteMany();
  await prisma.agency.deleteMany();

  // Create agencies
  const agency1 = await prisma.agency.create({
    data: {
      name: "Digital Growth Partners",
      slug: "digital-growth-partners",
      logo: "https://placehold.co/600x400.svg",
      description: "A full-service digital marketing agency specializing in growth strategies",
      category: "Digital Marketing",
      rating: 4.8,
      reviews: 127,
      location: "New York, USA",
      budgetRange: "$10,000 - $50,000",
      tagline: "Driving Digital Success Through Innovation",
      employees: "50-100",
      founded: 2015,
      expertise: "SEO, PPC, Content Marketing",
      mission: "To help businesses achieve sustainable growth through digital excellence",
      trackRecord: "Over 500 successful projects completed",
      services: {
        create: [
          { name: "Search Engine Optimization", color: "#FF5733" },
          { name: "Pay-Per-Click Advertising", color: "#33FF57" },
          { name: "Content Marketing", color: "#3357FF" }
        ]
      },
      industries: {
        create: [
          { name: "E-commerce" },
          { name: "SaaS" },
          { name: "Healthcare" }
        ]
      },
      locations: {
        create: [
          { name: "New York" },
          { name: "Los Angeles" }
        ]
      },
      socialLinks: {
        create: [
          { platform: "LinkedIn", url: "https://linkedin.com/company/dgp" },
          { platform: "Twitter", url: "https://twitter.com/dgp" }
        ]
      },
      awards: {
        create: [
          { title: "Best Digital Marketing Agency 2024" },
          { title: "Top SEO Agency Award" }
        ]
      },
      impact: {
        create: {
          projectsCompleted: 500,
          successRate: 95,
          clientSatisfaction: 98
        }
      }
    }
  });

  const agency2 = await prisma.agency.create({
    data: {
      name: "Tech Marketing Solutions",
      slug: "tech-marketing-solutions",
      logo: "https://placehold.co/600x400.svg",
      description: "Specialized in B2B tech marketing and lead generation",
      category: "B2B Marketing",
      rating: 4.7,
      reviews: 89,
      location: "San Francisco, USA",
      budgetRange: "$25,000 - $100,000",
      tagline: "Transforming Tech Marketing",
      employees: "25-50",
      founded: 2018,
      expertise: "B2B Marketing, Lead Generation, Marketing Automation",
      mission: "To accelerate growth for technology companies through strategic marketing",
      trackRecord: "250+ tech companies served",
      services: {
        create: [
          { name: "B2B Marketing Strategy", color: "#4287f5" },
          { name: "Lead Generation", color: "#42f5a7" },
          { name: "Marketing Automation", color: "#f542a7" }
        ]
      },
      industries: {
        create: [
          { name: "Technology" },
          { name: "Software" },
          { name: "IT Services" }
        ]
      },
      locations: {
        create: [
          { name: "San Francisco" },
          { name: "Austin" }
        ]
      },
      socialLinks: {
        create: [
          { platform: "LinkedIn", url: "https://linkedin.com/company/tms" },
          { platform: "Twitter", url: "https://twitter.com/tms" }
        ]
      },
      awards: {
        create: [
          { title: "Best B2B Marketing Agency 2024" },
          { title: "MarTech Innovation Award" }
        ]
      },
      impact: {
        create: {
          projectsCompleted: 250,
          successRate: 92,
          clientSatisfaction: 96
        }
      }
    }
  });

  console.log('Seeding completed successfully');
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