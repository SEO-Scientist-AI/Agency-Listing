import { NextRequest, NextResponse } from "next/server";
import Agency from "@/lib/model/Agency"; 
import dbConnect from "@/lib/dbConnect";

// Simple in-memory cache
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number; totalDocs?: number }>();

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); 

    const cacheKey = req.url;
    const now = Date.now();
    // const cached = cache.get(cacheKey);

    // // Return cached data if valid
    // if (cached && now - cached.timestamp < CACHE_DURATION) {
    //   return NextResponse.json(cached.data);
    // }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const ITEMS_PER_PAGE = 10;
    const services = searchParams.get("services");
    const location = searchParams.get("location");

    // Add validation
    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
    }

    // Add error boundary
    if (page > 100) { // Reasonable limit
      return NextResponse.json({ error: "Page number too high" }, { status: 400 });
    }

    // Create base query
    let queryConditions: any = {};

    // Handle multiple filters with OR condition
    if (services || location) {
      const serviceFilters = services ? services.split(' ').map(s => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map(l => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        queryConditions.combinedSlug = { $in: allFilters }; // Use $in for OR condition
      }
    }

    // Get total count from cache or fetch
    const cacheKeyBase = `${services || ''}-${location || ''}`;
    const cachedCount = cache.get(cacheKeyBase)?.totalDocs;

    let totalDocuments: number;
    if (cachedCount !== undefined) {
      totalDocuments = cachedCount;
    } else {
      totalDocuments = await Agency.countDocuments(queryConditions);
      cache.set(cacheKeyBase, {
        timestamp: now,
        totalDocs: totalDocuments,
        data: null
      });
    }

    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    // Apply pagination
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const agencies = await Agency.find(queryConditions)
      .sort({ name: 1 }) // Sort by name
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .lean(); // Convert to plain JavaScript objects

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
    console.error('API Error:', error);
    return NextResponse.json(
      { error: "Internal server error", message: "Please try again later" },
      { status: 500 }
    );
  }
}