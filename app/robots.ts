import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',  // Specific rule for Google
        allow: '/',  // Explicitly allow root
      },
      {
        userAgent: '*',  // Rule for all other bots
        allow: [
          '/',
          '/agency/list',
          '/agency/list/*',
          '/sitemap.xml',
          '/robots.txt',
          '/static/*'
        ],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/sign-in',
          '/sign-up',
          '/user-profile',
          '/marketing',
          '/marketing/*',
          '/api/*',
          '/_next/*'
        ]
      }
    ],
    sitemap: 'https://agencyspot.seoscientist.ai/sitemap.xml'
  }
}