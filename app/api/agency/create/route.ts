import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Agency } from "@/types/agency";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        // Create a slug from the agency name
        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Create combined slug for filtering - ensure all items are lowercase
        const combinedSlug = [
            ...data.services.map((s: string) => s.toLowerCase()),
            data.location.toLowerCase(),
            ...(data.additionalLocations || []).map((l: string) => l.toLowerCase())
        ];

        const agencyData = {
            ...data,
            slug,
            combinedSlug,
            createdAt: new Date().toISOString(),
            rating: 0,
            reviewCount: 0,
        };

        const docRef = await addDoc(collection(db, "agencies"), agencyData);

        return NextResponse.json({
            success: true,
            message: "Agency created successfully",
            id: docRef.id
        });
    } catch (error) {
        console.error("Error creating agency:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create agency" },
            { status: 500 }
        );
    }
} 