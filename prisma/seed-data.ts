export const seedAgencies = [
  {
    name: "Digital Marketing Pro Agency",
    slug: "digital-marketing-pro-agency",
    tagline: "Full-Service Digital Marketing Solutions",
    description: "We are a full-service digital marketing agency specializing in SEO, PPC, and content marketing...",
    location: "New York, USA",
    founded_year: 2010,
    team_size: "50-100",
    starting_price: "$5,000",
    min_budget: 5000,
    max_budget: 100000,
    budget_ranges: JSON.stringify(["$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"]),
    services: JSON.stringify(["SEO", "Content Marketing", "PPC Advertising", "Social Media Marketing"]),
    industries: JSON.stringify(["E-commerce", "SaaS", "Healthcare", "Real Estate"]),
    client_sizes: JSON.stringify(["Small Business", "Mid-Market", "Enterprise"]),
    project_durations: JSON.stringify(["3-6 months", "6-12 months", "Ongoing"]),
    locations: JSON.stringify(["Los Angeles", "Chicago", "Miami"]),
    languages: JSON.stringify(["English", "Spanish"]),
    google_rating: 4.8,
    google_review_count: 156,
    expertise: JSON.stringify({
      seo: ["Technical SEO", "Local SEO", "E-commerce SEO"],
      marketing: ["Content Strategy", "Email Marketing"],
      development: ["WordPress", "Shopify"]
    })
  }
]
