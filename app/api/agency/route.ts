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
} from "firebase/firestore";

// Move cache-related code outside exports
const agenciesCache = {
  data: {} as Record<string, any>,
  timestamp: {} as Record<string, number>,
  CACHE_DURATION: 5 * 60 * 1000,
};

function clearAgenciesCache() {
  agenciesCache.data = {};
  agenciesCache.timestamp = {};
}

const FETCH_LIMIT = 1000; // Maximum number of agencies to fetch from Firestore

async function fetchAndCacheAgencies() {
  try {
    const now = Date.now();
    const cacheKey = 'all'; // Single key for all agencies
    if (
      agenciesCache.data[cacheKey] && 
      agenciesCache.timestamp[cacheKey] && 
      (now - agenciesCache.timestamp[cacheKey]) < agenciesCache.CACHE_DURATION
    ) {
      return agenciesCache.data[cacheKey];
    }

    const agenciesRef = collection(db, "agencies");
    const baseQuery = query(agenciesRef, limit(FETCH_LIMIT));
    const snapshot = await getDocs(baseQuery);
    
    agenciesCache.data[cacheKey] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    agenciesCache.timestamp[cacheKey] = now;

    return agenciesCache.data[cacheKey];
  } catch (error) {
    console.error("Error fetching agencies:", error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const ITEMS_PER_PAGE = Number(searchParams.get("limit")) || 12; // Changed to 12 items per page
    const services = searchParams.get("services");
    const location = searchParams.get("location");

    // Create a cache key that includes filter parameters
    const cacheKey = `${services || ''}-${location || ''}`;
    const now = Date.now();

    // Check if we have filtered data cached
    if (
      agenciesCache.data[cacheKey] && 
      agenciesCache.timestamp[cacheKey] && 
      (now - agenciesCache.timestamp[cacheKey]) < agenciesCache.CACHE_DURATION
    ) {
      const cachedData = agenciesCache.data[cacheKey];
      // Apply pagination to cached filtered data
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return NextResponse.json({
        success: true,
        agencies: cachedData.slice(startIndex, endIndex),
        currentPage: page,
        totalPages: Math.ceil(cachedData.length / ITEMS_PER_PAGE),
        totalAgencies: cachedData.length,
      });
    }

    // Fetch and filter data
    const agenciesRef = collection(db, "agencies");
    let baseQuery = query(agenciesRef, limit(FETCH_LIMIT));

    // Apply filters at query level if provided
    if (services || location) {
      const keywords: string[] = [];
      if (location) keywords.push(...location.split(" ").map(k => k.toLowerCase()));
      if (services) keywords.push(...services.split(" ").map(k => k.toLowerCase()));
      
      baseQuery = query(baseQuery, where("combinedSlug", "array-contains-any", keywords));
    }

    const snapshot = await getDocs(baseQuery);
    const allAgencies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Calculate pagination
    const totalAgencies = allAgencies.length;
    const totalPages = Math.ceil(totalAgencies / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedAgencies = allAgencies.slice(startIndex, endIndex);

    // Cache the filtered results
    agenciesCache.data[cacheKey] = allAgencies;
    agenciesCache.timestamp[cacheKey] = now;

    return NextResponse.json({
      success: true,
      agencies: paginatedAgencies,
      currentPage: page,
      totalPages,
      totalAgencies,
    });

  } catch (error) {
    console.error("Error processing agencies request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}


