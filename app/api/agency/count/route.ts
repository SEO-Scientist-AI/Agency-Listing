import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getCountFromServer } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const services = searchParams.get("services");
    const location = searchParams.get("location");
    
    // Create base query
    let baseQuery = query(collection(db, "agencies"));
    
    // Handle multiple filters with OR condition
    if (services || location) {
      const serviceFilters = services ? services.split(' ').map(s => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map(l => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        baseQuery = query(
          baseQuery, 
          where("combinedSlug", "array-contains-any", allFilters)
        );
      }
    }

    const snapshot = await getCountFromServer(baseQuery);
    const count = snapshot.data().count;

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting agency count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
} 