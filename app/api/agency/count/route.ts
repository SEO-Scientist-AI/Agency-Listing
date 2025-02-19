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
    
    // Apply filters
    const filters = [];
    if (location) {
      filters.push(...location.split(" ").map(loc => loc.toLowerCase()));
    }
    if (services) {
      filters.push(...services.split(" ").map(service => service.toLowerCase()));
    }
    
    if (filters.length > 0) {
      baseQuery = query(baseQuery, where("combinedSlug", "array-contains-any", filters));
    }

    const snapshot = await getCountFromServer(baseQuery);
    const count = snapshot.data().count;

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting agency count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
} 