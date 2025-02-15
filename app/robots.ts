import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/agency',
          '/agency/list',
          '/agency/list/*'  // For city pages and service+city combinations
        ],
        disallow: [
          '/dashboard/',
          '/sign-in',
          '/sign-up',
          '/user-profile',
          '/*'  // Disallow all other routes
        ]
      }
    ],
    sitemap: 'https://agencyspot.seoscientist.ai/sitemap.xml',
  }
}