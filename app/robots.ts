import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/agency',
          '/agency/list',
          '/agency/list/*',
          '/sitemap.xml'
        ],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/sign-in',
          '/sign-up',
          '/user-profile',
          '/marketing',
          '/marketing/*',
          '/*'  // Disallow all other routes
        ]
      }
    ],
    sitemap: 'https://agencyspot.seoscientist.ai/sitemap.xml',
  }
}