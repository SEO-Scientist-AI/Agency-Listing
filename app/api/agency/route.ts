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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const ITEMS_PER_PAGE = 10; // Fixed page size for better performance
    const services = searchParams.get("services");
    const location = searchParams.get("location");
    const sortBy = searchParams.get("sort") ?? "name";

    // Base query
    let baseQuery = query(collection(db, "agencies"));

    // Apply Filters
    const keywords: string[] = [];
    if (location) {
      keywords.push(...location.split(" ").map(keyword => keyword.toLowerCase()));
    }
    if (services) {
      keywords.push(...services.split(" ").map(keyword => keyword.toLowerCase()));
    }
    if (keywords.length > 0) {
      baseQuery = query(baseQuery, where("combinedSlug", "array-contains-any", keywords));
    }

    // Get total count efficiently
    const countSnapshot = await getCountFromServer(baseQuery);
    const totalDocuments = countSnapshot.data().count;
    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    // Apply sorting and pagination
    let paginatedQuery = query(
      baseQuery,
      orderBy(sortBy),
      limit(ITEMS_PER_PAGE)
    );

    // Handle pagination
    if (page > 1) {
      const previousPageQuery = query(
        baseQuery,
        orderBy(sortBy),
        limit((page - 1) * ITEMS_PER_PAGE)
      );
      const previousPageSnapshot = await getDocs(previousPageQuery);
      const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
      
      if (lastVisible) {
        paginatedQuery = query(
          baseQuery,
          orderBy(sortBy),
          startAfter(lastVisible),
          limit(ITEMS_PER_PAGE)
        );
      }
    }

    // Fetch the current page data
    const snapshot = await getDocs(paginatedQuery);
    const agencies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(
      {
        success: true,
        agencies,
        currentPage: page,
        totalPages,
        totalAgencies: totalDocuments,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching agencies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}


