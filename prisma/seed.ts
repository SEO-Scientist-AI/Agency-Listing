import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create agencies with their related data
  const agency1 = await prisma.agency.create({
    data: {
      name: "Digital Marketing Pro Agency",
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
          { title: "Top SEO Agency Award" },
        ],
      },
      impact: {
        create: {
          experience: "8+ years of experience",
          revenue: "$5.2+ million generated",
          businesses: "500+ businesses empowered",
        },
      },
    },
  })

  const agency2 = await prisma.agency.create({
    data: {
      name: "Creative Design Solutions",
      logo: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
      description: "Award-winning design agency specializing in brand identity, UI/UX design, and creative solutions for modern businesses.",
      category: "Design",
      rating: 4.9,
      reviews: 156,
      location: "San Francisco, CA",
      budgetRange: "$2,000 - $7,500 /month",
      tagline: "Innovative Design for Modern Brands",
      employees: "20-100",
      founded: 2018,
      expertise: "Cutting-edge design solutions for digital age",
      mission: "Creating memorable brand experiences",
      trackRecord: "Award-winning designs",
      services: {
        create: [
          { name: "UI/UX Design", color: "pink" },
          { name: "Brand Identity", color: "orange" },
          { name: "Web Design", color: "yellow" },
        ],
      },
      industries: {
        create: [
          { name: "Technology" },
          { name: "Retail" },
          { name: "Startups" },
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
          { platform: "Facebook", url: "https://facebook.com/creativedesign" },
          { platform: "Twitter", url: "https://twitter.com/creativedesign" },
        ],
      },
      awards: {
        create: [
          { title: "Best Design Agency 2023" },
          { title: "UX Excellence Award" },
        ],
      },
      impact: {
        create: {
          experience: "5+ years of excellence",
          revenue: "$3.8+ million in projects",
          businesses: "300+ brands transformed",
        },
      },
    },
  })

  console.log({ agency1, agency2 })
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