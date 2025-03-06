//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { collection, getDocs, query} from "firebase/firestore";

// Cache configuration
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const cache = new Map<string, { data: any; timestamp: number }>();

export async function GET() {
    try {
      const cacheKey = 'services';
      const now = Date.now();
      const cached = cache.get(cacheKey);

      // Return cached data if valid
      if (cached && now - cached.timestamp < CACHE_DURATION) {
        return NextResponse.json(cached.data);
      }
      
      let serviceQuery = query(collection(db, "services"));
      const snapshot = await getDocs(serviceQuery);
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Cache the response
      cache.set(cacheKey, {
        data: services,
        timestamp: now
      });
    
      return NextResponse.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
}