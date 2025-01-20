import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  // Delete existing data
  await prisma.agencyImpact.deleteMany();
  await prisma.agencyAward.deleteMany();
  await prisma.agencySocialLink.deleteMany();
  await prisma.agencyLocation.deleteMany();
  await prisma.agencyIndustry.deleteMany();
  await prisma.agencyService.deleteMany();
  await prisma.agency.deleteMany();

  // Create agencies with their related data
  const agency1 = await prisma.agency.create({
    data: {
      name: "Digital Marketing Pro Agency",
      slug: slugify("Digital Marketing Pro Agency"),
      logo: "https://images.unsplash.com/photo-1612810806546-ebbf22b53496?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "We help businesses grow their online presence through data-driven SEO strategies and comprehensive digital marketing solutions.",
      category: "Digital Marketing",
      rating: 4.8,
      reviews: 128,
      location: "New York City, NY",
      budgetRange: "$1,000 - $5,000 /month",
      tagline: "Experts in SEO & Digital Marketing",
      employees: "10-50",
      founded: 2015,
      expertise: "Leading digital marketing solutions with proven ROI",
      mission: "Empowering businesses through digital excellence",
      trackRecord: "Proven track record",
      services: {
        create: [
          { name: "SEO", color: "indigo" },
          { name: "Content Marketing", color: "blue" },
          { name: "PPC", color: "green" },
        ],
      },
      industries: {
        create: [
          { name: "E-commerce" },
          { name: "Tech" },
          { name: "Healthcare" },
        ],
      },
      locations: {
        create: [
          { name: "New York City, NY" },
          { name: "Boston, MA" },
        ],
      },
      socialLinks: {
        create: [
          { platform: "Facebook", url: "https://facebook.com/digitalmarketingpro" },
          { platform: "Twitter", url: "https://twitter.com/digitalmarketingpro" },
        ],
      },
      awards: {
        create: [
          { title: "Best Digital Marketing Agency 2023" },
          { title: "Top SEO Agency" },
        ],
      },
      impact: {
        create: {
          projectsCompleted: 250,
          successRate: 95,
          clientSatisfaction: 98,
        },
      },
    },
  });

  const agency2 = await prisma.agency.create({
    data: {
      name: "Creative Design Solutions",
      slug: slugify("Creative Design Solutions"),
      logo: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
      description: "Award-winning design agency specializing in brand identity, UI/UX design, and creative solutions for modern businesses.",
      category: "Design",
      rating: 4.9,
      reviews: 85,
      location: "San Francisco, CA",
      budgetRange: "$5,000 - $25,000 /project",
      tagline: "Where Creativity Meets Strategy",
      employees: "25-100",
      founded: 2012,
      expertise: "Brand identity and UI/UX design",
      mission: "Creating impactful digital experiences",
      trackRecord: "Award-winning designs",
      services: {
        create: [
          { name: "UI/UX Design", color: "purple" },
          { name: "Brand Identity", color: "pink" },
          { name: "Web Design", color: "yellow" },
        ],
      },
      industries: {
        create: [
          { name: "Technology" },
          { name: "Startups" },
          { name: "Retail" },
        ],
      },
      locations: {
        create: [
          { name: "San Francisco, CA" },
          { name: "Los Angeles, CA" },
        ],
      },
      socialLinks: {
        create: [
          { platform: "Instagram", url: "https://instagram.com/creativedesignsolutions" },
          { platform: "Behance", url: "https://behance.net/creativedesignsolutions" },
        ],
      },
      awards: {
        create: [
          { title: "Best Design Agency 2023" },
          { title: "Innovation in Design" },
        ],
      },
      impact: {
        create: {
          projectsCompleted: 180,
          successRate: 97,
          clientSatisfaction: 99,
        },
      },
    },
  });

  console.log('Database has been seeded. 🌱');
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