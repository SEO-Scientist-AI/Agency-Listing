//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";

// libraries imports
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { agencies } from "@/app/find-agencies/agency-data";

export async function GET(req: NextRequest) {
    
    try {
      const { searchParams } = new URL(req.url);
      console.log("searchParams",searchParams);
      let agencyQuery = query(collection(db, "agenciesList"));

      // Apply filters based on query params
      searchParams.forEach((value, key) => {
        const keywords = value.split(" ").map(keyword => keyword.toLowerCase());
        agencyQuery = query(agencyQuery, where(key, "array-contains-any", keywords));
      });
      const snapshot = await getDocs(agencyQuery);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
  }