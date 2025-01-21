export interface Agency {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  services: {
    [key: string]: string[];
  };
  industries: string[];
  startingPrice: string;
  googleReview: {
    rating: number;
    count: number;
  };
  foundedYear: number;
  employeeCount: string;
  clientSize: string[];
  projectDuration: string;
  geographicFocus: string[];
  languages: string[];
}

export const agencies: Agency[] = [
  {
    id: "mimvi",
    name: "Mimvi",
    tagline: "#1 SEO Agency NYC - Dominate The Search ✅",
    description:
      "At Mimvi, we have over a decade of experience in developing and executing highly successful digital marketing and search engine optimization (SEO) campaigns for our valued clients across the country. We understand the importance of effective SEO in today's digital landscape, and we have honed our skills and knowledge to ensure that we can deliver outstanding outcomes for our clients. Our dedicated SEO experts are based in New York, and they possess the expertise and insights necessary to optimize your website for increased visibility and higher rankings on search engine result pages.",
    location: "New York, New York, United States",
    services: {
      Advertising: ["Display Ads", "PPC", "Retargeting and Remarketing"],
      "Content Marketing": ["Copywriting", "Marketing Advice"],
      "Lead Generation": [],
      SEO: [
        "APP Store Optimization",
        "Backlink Management",
        "International SEO",
        "Link Building",
        "Local SEO",
        "Mobile SEO",
        "SEO Consulting",
        "Search Engine Marketing",
        "Shopify SEO",
        "Technical SEO",
        "Wordpress SEO",
        "Youtube SEO",
      ],
      "Social Media Marketing": ["Content Creation", "Facebook Advertising", "Instagram Marketing"],
      "Web Development": ["Web Design"],
    },
    industries: ["B2B Services", "Health & Wellness", "Home Services", "IT", "Legal Services"],
    startingPrice: "$0 - $5,000",
    googleReview: { rating: 5, count: 63 },
    foundedYear: 2015,
    employeeCount: "50-249",
    clientSize: ["Small Business", "Mid Business", "Enterprise Business"],
    projectDuration: "Starting from 1-3 months",
    geographicFocus: ["Canada", "United Kingdom", "United States"],
    languages: ["English"],
  },
];
