// internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import { db } from "@/lib/firebase/config";
import data from "@/lib/agencies.json";
// libraries imports
import { collection, getDocs, query, where, orderBy, limit, startAfter, DocumentSnapshot, addDoc } from "firebase/firestore";


export async function GET(req: NextRequest) {
  try {
    const agenciesRef = collection(db, 'agencies');
    console.log('Starting agencies seeding process...');

    let successCount = 0;
    // for (const agency of data.agencies) {
    //   try {
    //     await addDoc(agenciesRef, agency);
    //     successCount++;
    //     console.log(`Added agency: ${agency.name || 'Unknown'}`);
    //   } catch (error) {
    //     console.error(`Failed to add agency: ${agency.name || 'Unknown'}`, error);
    //   }
    // }

    console.log(`Seeding complete! Successfully added ${successCount} agencies`);
    return NextResponse.json({ 
      message: `Seeding complete! Added ${successCount} agencies`,
      success: true
    });

  } catch (error) {
    console.error('Failed to seed agencies:', error);
    return NextResponse.json({ 
      message: 'Failed to seed agencies',
      error: error instanceof Error ? error.message : String(error),
      success: false 
    }, { status: 500 });
  }
}