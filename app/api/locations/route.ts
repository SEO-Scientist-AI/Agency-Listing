//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { collection, getDocs, query} from "firebase/firestore";


export async function GET() {
    
    try {
      
    let locationQuery = query(collection(db, "locations"));
      const snapshot = await getDocs(locationQuery);
    const locations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return NextResponse.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
  }