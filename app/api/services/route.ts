//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { collection, getDocs, query} from "firebase/firestore";


export async function GET() {
    
    try {
      
    let serviceQuery = query(collection(db, "services"));
      const snapshot = await getDocs(serviceQuery);
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return NextResponse.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
  }