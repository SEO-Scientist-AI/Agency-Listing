interface FilterState {
  search?: string;
  services?: string[];
  industries?: string[];
  locations?: string[];
  budgetRanges?: { min: number; max: number }[];
}

export async function fetchAllAgencies(filters?: FilterState) {
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
  const url = `/api/agencies${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch agencies');
  }
  return response.json();
}

export async function fetchAgencyById(id: string) {
  // Use URL constructor to ensure proper URL formation
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = new URL(`/api/agencies/${id}`, baseUrl || 'http://localhost:3000');
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch agency');
  }
  return response.json();
}
