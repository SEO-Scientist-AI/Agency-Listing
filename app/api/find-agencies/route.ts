//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";

import { Agency } from "@/types/agency";

const ITEMS_PER_PAGE = 10;

// Normalize string for comparison (lowercase and remove extra spaces)
function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

export async function GET(req: NextRequest) {
    
    try {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const services = url.searchParams.get('services')?.split(' ').map(s => s.replace(/-/g, ' ')) || [];
      const locations = url.searchParams.get('location')?.split(' ').map(l => l.replace(/-/g, ' ')) || [];
      
      console.log('Requested services:', services);
      console.log('Requested locations:', locations);
      
      const agenciesRef = collection(db, 'agencies');

      // Get all agencies first to debug
      const allAgenciesQuery = query(agenciesRef);
      const allAgenciesSnapshot = await getDocs(allAgenciesQuery);
      
      console.log('Total agencies in DB:', allAgenciesSnapshot.size);
      
      // Log the first agency's data to see its structure
      if (allAgenciesSnapshot.docs.length > 0) {
        const sampleData = allAgenciesSnapshot.docs[0].data();
        console.log('Sample agency data - services:', sampleData.services);
        console.log('Sample agency data - location:', sampleData.location);
      }

      let agencies: Agency[] = allAgenciesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Agency));

      // Filter services in memory for case-insensitive matching
      if (services.length > 0) {
        const normalizedSearchServices = services.map(normalizeString);
        agencies = agencies.filter(agency => {
          const agencyServices = (agency.services || []).map(normalizeString);
          return normalizedSearchServices.some(searchService => 
            agencyServices.some((agencyService: string) => agencyService.includes(searchService))
          );
        });
        console.log('Agencies after service filter:', agencies.length);
      }

      // Filter locations
      if (locations.length > 0) {
        const normalizedSearchLocations = locations.map(normalizeString);
        agencies = agencies.filter(agency => {
          const agencyLocation = normalizeString(agency.location || '');
          const additionalLocations = (agency.additionalLocations || []).map(normalizeString);
          return normalizedSearchLocations.some(searchLocation => 
            agencyLocation.includes(searchLocation) || 
            additionalLocations.some((loc: string) => loc.includes(searchLocation))
          );
        });
        console.log('Agencies after location filter:', agencies.length);
      }

      // Sort by name
      agencies.sort((a: Agency, b: Agency) => (a.name || '').localeCompare(b.name || ''));

      const total = agencies.length;
      console.log('Final filtered agencies count:', total);

      // Apply pagination
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      agencies = agencies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      return NextResponse.json({
        success: true,
        data: {
          agencies,
          currentPage: page,
          totalPages: Math.ceil(total / ITEMS_PER_PAGE),
          totalAgencies: total
        }
      });

    } catch (error) {
      console.error('Error fetching agencies:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch agencies'
      }, { status: 500 });
    }
}