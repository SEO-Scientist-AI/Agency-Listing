//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import dbConnect from '@/lib/dbConnect'; 

// Mongoose model import
import Industry from '@/lib/model/Industry'; 

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); 

    const industries = await Industry.find({});
    

    return NextResponse.json(industries);
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
  }
}