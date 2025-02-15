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
          '/agency/*'
        ],
        disallow: [
          '/dashboard/',
          '/sign-in',
          '/sign-up',
          '/user-profile'
        ]
      }
    ],
    sitemap: 'https://agencyspot.seoscientist.ai/sitemap.xml',
  }
}