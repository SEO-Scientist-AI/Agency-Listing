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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const ITEMS_PER_PAGE = Number(searchParams.get("limit")) || 10;
    const services = searchParams.get("services");
    const location = searchParams.get("location");
    const sortBy = searchParams.get("sort") ?? "name"; // Default sorting field

    // console.log("Received Query Params:", { page, services, location, sortBy });

    let agencyQuery = query(collection(db, "agencies"), orderBy(sortBy));

    // Apply Filters (services/location)
    const keywords: string[] = [];
    if (location) {
      keywords.push(...location.split(" ").map(keyword => keyword.toLowerCase()));
    }
    if (services) {
      keywords.push(...services.split(" ").map(keyword => keyword.toLowerCase()));
    }
    if (keywords.length > 0) {
      agencyQuery = query(agencyQuery, where("combinedSlug", "array-contains-any", keywords));
    }

    // Fetch total count for pagination
    const totalSnapshot = await getDocs(agencyQuery);
    const totalDocuments = totalSnapshot.size;
    const totalPages = Math.ceil(totalDocuments / ITEMS_PER_PAGE);

    // Handle Page Jumping
    let lastVisible: DocumentSnapshot | null = null;

    if (page > 1) {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const offsetQuery = query(agencyQuery, limit(offset));
      const offsetSnapshot = await getDocs(offsetQuery);

      if (!offsetSnapshot.empty) {
        lastVisible = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
      }
    }

    // Apply Pagination
    if (lastVisible) {
      agencyQuery = query(agencyQuery, startAfter(lastVisible), limit(ITEMS_PER_PAGE));
    } else {
      agencyQuery = query(agencyQuery, limit(ITEMS_PER_PAGE));
    }

    // Fetch the current page data
    const snapshot = await getDocs(agencyQuery);
    const agencies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({
      success: true,
      agencies,
      currentPage: page,
      totalPages,
      totalAgencies: totalDocuments,
    });
  } catch (error) {
    console.error("Error fetching agencies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}


