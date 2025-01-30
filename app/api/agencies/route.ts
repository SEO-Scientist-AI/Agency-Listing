import { NextResponse } from 'next/server';
import { getAllAgencies } from '@/lib/firebase/agencies';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const services = searchParams.get('services')?.split(',').filter(Boolean) || [];
    const industries = searchParams.get('industries')?.split(',').filter(Boolean) || [];
    const locations = searchParams.get('locations')?.split(',').filter(Boolean) || [];
    const budgetMin = Number(searchParams.get('budgetMin')) || 0;
    const budgetMax = Number(searchParams.get('budgetMax')) || Infinity;

    const agencies = await getAllAgencies();
    
    const filteredAgencies = agencies.filter(agency => {
      // Search filter
      if (search && !Object.values(agency).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(search)
      )) {
        return false;
      }

      // Services filter
      if (services.length > 0 && !services.some(service => 
        agency.services?.includes(service)
      )) {
        return false;
      }

      // Industries filter
      if (industries.length > 0 && !industries.some(industry => 
        agency.industries?.includes(industry)
      )) {
        return false;
      }

      // Locations filter
      if (locations.length > 0 && agency.location && !locations.includes(agency.location)) {
        return false;
      }

      // Budget filter
      if (
        (agency.minBudget !== undefined && agency.minBudget > budgetMax) || 
        (agency.maxBudget !== undefined && agency.maxBudget < budgetMin)
      ) {
        return false;
      }

      return true;
    });

    return NextResponse.json(filteredAgencies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agencies' },
      { status: 500 }
    );
  }
}
