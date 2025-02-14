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
    const ITEMS_PER_PAGE = Number(searchParams.get("limit")) || 10;
    const services = searchParams.get("services");
    const location = searchParams.get("location");

    // Get cached or fetch new agencies
    const allAgencies = await fetchAndCacheAgencies();

    // Apply filters to cached data
    let filteredAgencies = [...allAgencies];

    // Apply service and location filters
    if (services || location) {
      const keywords: string[] = [];
      if (location) {
        keywords.push(...location.split(" ").map(keyword => keyword.toLowerCase()));
      }
      if (services) {
        keywords.push(...services.split(" ").map(keyword => keyword.toLowerCase()));
      }

      filteredAgencies = filteredAgencies.filter(agency => {
        const combinedSlug = agency.combinedSlug || [];
        return keywords.some(keyword => combinedSlug.includes(keyword));
      });
    }

    // Calculate pagination
    const totalDocuments = filteredAgencies.length;
    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Get current page data
    const paginatedAgencies = filteredAgencies.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      agencies: paginatedAgencies,
      currentPage: page,
      totalPages,
      totalAgencies: totalDocuments,
    });

  } catch (error) {
    console.error("Error processing agencies request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}


