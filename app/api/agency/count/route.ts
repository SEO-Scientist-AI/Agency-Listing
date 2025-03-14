import { NextRequest, NextResponse } from "next/server";
import Agency from '@/lib/model/Agency'; 
import dbConnect from '@/lib/dbConnect'; 

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); 
    const { searchParams } = new URL(req.url);
    const services = searchParams.get("services");
    const location = searchParams.get("location");

    // Build the query
    let query = {};

    if (services || location) {
      const serviceFilters = services ? services.split(' ').map(s => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map(l => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        query = {
          combinedSlug: { $in: allFilters } // Use $in to match any value in the array
        };
      }
    }

    const count = await Agency.countDocuments(query);

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting agency count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}