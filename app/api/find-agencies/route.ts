//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { collection, getDocs, query, where ,orderBy, limit, startAfter, DocumentSnapshot} from "firebase/firestore";


export async function GET(req: NextRequest) {
    
    try {
      const { searchParams } = new URL(req.url);
      // Get query parameters
    const pageSize = Number(searchParams.get("limit")) || 2; // Number of docs per page (default: 10)
    const location = searchParams.get("location"); // Filter for array field
    const services = searchParams.get("services"); // Filter for normal field
    const lastDocId = searchParams.get("lastDocId"); // Used for skipping docs
    const sortBy = searchParams.get("sort") || "__name__"; // Used for sorting docs

    // Firestore collection reference
    let agencyQuery = query(collection(db, "agenciesList"));

    agencyQuery = query(agencyQuery, orderBy(sortBy as string), limit(pageSize));

      // Apply filters based on query params


      if(location){
        const keywords = location.split(" ").map(keyword => keyword.toLowerCase());
        agencyQuery = query(agencyQuery, where("location", "array-contains-any", keywords));
      }
      if(services){
        const keywords = services.split(" ").map(keyword => keyword.toLowerCase());
        agencyQuery = query(agencyQuery, where("slug", "array-contains-any", keywords));
      }
      // if it's not the first Page
      let lastVisible: DocumentSnapshot | null = null;
      if (lastDocId) {
        const lastDocSnap = await getDocs(query(agencyQuery, where("__name__", "==", lastDocId)));
        if (!lastDocSnap.empty) {
          lastVisible = lastDocSnap.docs[0];
          agencyQuery = query(agencyQuery, startAfter(lastVisible), limit(pageSize));
        }
      }


      const snapshot = await getDocs(agencyQuery);

      // Format response
    const agencies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
  
    return NextResponse.json({
      agencies,
      lastDocId: lastVisible ? lastVisible.id : null, // Sending lastDocId for next pagination request
    });
    } catch (error) {
      console.error("Error fetching agencies:", error);
      return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
  }