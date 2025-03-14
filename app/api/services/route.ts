//internal imports 
import { NextRequest, NextResponse } from "next/server";

// db connection import
import dbConnect from '@/lib/dbConnect'; 

// Mongoose model import
import Service from '@/lib/model/Service'; 

export async function GET() {
  try {
    await dbConnect(); // Ensure the database connection is established

    const services = await Service.find({});


    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
  }
}