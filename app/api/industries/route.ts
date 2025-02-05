//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { collection, getDocs, query} from "firebase/firestore";


export async function GET(req: NextRequest) {
    
    try {
      
    let industryQuery = query(collection(db, "industries"));
      const snapshot = await getDocs(industryQuery);
    const industries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return NextResponse.json(industries);
    } catch (error) {
      console.error("Error fetching industries:", error);
      return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
  }