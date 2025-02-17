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
  DocumentSnapshot,
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
      return NextResponse.json(cached.data);
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const ITEMS_PER_PAGE = 10;
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

    // Get total count from cache or fetch
    const cacheKeyBase = `${services || ''}-${location || ''}`;
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

    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    // Apply initial sorting
    let paginatedQuery = query(baseQuery, orderBy('name'));

    // Handle pagination using cursor
    if (page > 1) {
      // Get the last document of the previous page
      const prevPageQuery = query(
        paginatedQuery,
        limit((page - 1) * ITEMS_PER_PAGE)
      );
      const prevPageDocs = await getDocs(prevPageQuery);
      const lastDoc = prevPageDocs.docs[prevPageDocs.docs.length - 1];

      // Start after the last document
      paginatedQuery = query(
        paginatedQuery,
        startAfter(lastDoc),
        limit(ITEMS_PER_PAGE)
      );
    } else {
      // First page
      paginatedQuery = query(
        paginatedQuery,
        limit(ITEMS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(paginatedQuery);
    const agencies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const responseData = {
      success: true,
      agencies,
      currentPage: page,
      totalPages,
      totalAgencies: totalDocuments,
    };

    // Cache the response
    cache.set(cacheKey, {
      data: responseData,
      timestamp: now
    });

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching agencies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}


