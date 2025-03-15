// Priority locations that should be included in more combinations
export const PRIORITY_LOCATIONS = [
  'london', 'paris', 'berlin', 'madrid', 'amsterdam',
  'sydney', 'toronto', 'dublin', 'miami', 'denver'
];

// Secondary locations for fewer combinations
export const SECONDARY_LOCATIONS = [
  'munich', 'milan', 'zurich', 'barcelona', 'stockholm',
  'melbourne', 'vancouver', 'atlanta', 'montreal', 'hamburg'
];

// Remaining locations for basic coverage
export const BASIC_LOCATIONS = [
  'frankfurt', 'cologne', 'stuttgart', 'dusseldorf', 'leipzig',
  'dortmund', 'essen', 'brisbane', 'perth', 'adelaide',
  'gold-coast', 'canberra', 'newcastle', 'hobart', 'darwin',
  'calgary', 'ottawa', 'edmonton', 'quebec-city', 'winnipeg',
  'halifax', 'victoria'
];

// Combined locations array
export const STATIC_LOCATIONS = [
  ...PRIORITY_LOCATIONS,
  ...SECONDARY_LOCATIONS,
  ...BASIC_LOCATIONS
];

// High-priority services that should have more combinations
export const PRIORITY_SERVICES = [
  'seo', 'ppc', 'web-design', 'web-development',
  'social-media-marketing', 'digital-strategy', 'ecommerce'
];

// Secondary priority services
export const SECONDARY_SERVICES = [
  'content-marketing', 'branding', 'advertising',
  'mobile-app-development', 'ui-ux-design',
  'software-development', 'video-production'
];

// Basic coverage services
export const BASIC_SERVICES = [
  'logo-design', 'ecommerce-development',
  'public-relations', 'media-buying', 'copywriting',
  'video-marketing'
];

// Combined services array
export const STATIC_SERVICES = [
  ...PRIORITY_SERVICES,
  ...SECONDARY_SERVICES,
  ...BASIC_SERVICES
];

// Maximum combinations per service tier
export const COMBINATION_LIMITS = {
  PRIORITY: 30,    // Priority services get more combinations
  SECONDARY: 25,   // Secondary services get medium coverage
  BASIC: 20        // Basic services get minimal coverage
}; 