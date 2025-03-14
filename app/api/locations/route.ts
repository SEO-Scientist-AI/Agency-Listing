//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import dbConnect from '@/lib/dbConnect'; 

// Mongoose model import
import Location from '@/lib/model/Location'; // Adjust the import path as necessary

export async function GET() {
  try {
    await dbConnect(); // Ensure the database connection is established

    const locations = await Location.find({});


    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
  }
}