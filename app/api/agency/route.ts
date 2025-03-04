import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getCountFromServer
} from "firebase/firestore";

// Simple in-memory cache
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number; totalDocs?: number }>();

export async function GET(req: NextRequest) {
  try {
    const cacheKey = req.url;
    const now = Date.now();
    const cached = cache.get(cacheKey);

    // Return cached data if valid
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      console.log("Returning cached data");
      return NextResponse.json(cached.data);
    }

    const { searchParams } = new URL(req.url);
    let lastDocId = searchParams.get("lastDocId");
    let hasMore = false;
    const page = parseInt(searchParams.get("page") || "1", 10);
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
        // Use array-contains-any for OR condition
        baseQuery = query(
          baseQuery, 
          where("combinedSlug", "array-contains-any", allFilters)
        );
      }
    }

    // Get total count from cache or fetch
    const cacheKeyBase = `${services || ''}-${location || ''}-${page || ''}-${lastDocId || ''}`;
    const cachedCount = cache.get(cacheKeyBase)?.totalDocs;

    let totalDocuments: number;
    if (cachedCount !== undefined) {
      totalDocuments = cachedCount;
    } else {
      const countSnapshot = await getCountFromServer(baseQuery);
      totalDocuments = countSnapshot.data().count;
      cache.set(cacheKeyBase, { 
        timestamp: now,
        totalDocs: totalDocuments,
        data: null 
      });
    }
     // Apply initial sorting
     let paginatedQuery = query(baseQuery, orderBy('name'), limit(10));
    //  check is more data available
    if(page * 10 < totalDocuments){
      console.log(page * 10, totalDocuments)
      hasMore = true;
    }
   // Add validation
    // if lastDocId => next 10 lists

    if (lastDocId) {
      paginatedQuery = query(
            paginatedQuery,
            startAfter(lastDocId),
          );
    }
    const snapshot = await getDocs(paginatedQuery);
    const agencies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    lastDocId = agencies[agencies.length - 1]?.id;

    const responseData = {
      success: true,
      agencies,
      lastDocId,
      totalAgencies: totalDocuments,
      hasMore
    };

    // Cache the response
    cache.set(cacheKey, {
      data: responseData,
      timestamp: now
    });

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: "Internal server error", message: "Please try again later" },
      { status: 500 }
    );
  }
}


