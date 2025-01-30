interface FilterState {
  search?: string;
  services?: string[];
  industries?: string[];
  locations?: string[];
  budgetRanges?: { min: number; max: number }[];
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }
  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    // reference for custom domain
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // assume localhost
  return `http://localhost:3000`;
}

export async function fetchAgencyById(id: string) {
  const baseUrl = getBaseUrl();
  const url = new URL(`/api/agencies/${id}`, baseUrl);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch agency');
  }
  return response.json();
}

export async function fetchAllAgencies(filters?: FilterState) {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.search) {
      params.set('search', filters.search);
    }
    if (filters.services?.length) {
      params.set('services', filters.services.join(','));
    }
    if (filters.industries?.length) {
      params.set('industries', filters.industries.join(','));
    }
    if (filters.locations?.length) {
      params.set('locations', filters.locations.join(','));
    }
    if (filters.budgetRanges?.length) {
      const minBudget = Math.min(...filters.budgetRanges.map(r => r.min));
      const maxBudget = Math.max(...filters.budgetRanges.map(r => r.max));
      params.set('budgetMin', minBudget.toString());
      params.set('budgetMax', maxBudget.toString());
    }
  }

  const queryString = params.toString();
  const url = new URL(`/api/agencies${queryString ? `?${queryString}` : ''}`, baseUrl);
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch agencies');
  }
  return response.json();
}
