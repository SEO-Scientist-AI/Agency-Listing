import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AgencyModel from "@/lib/model/Agency";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        // Create a slug from the agency name
        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Create combined slug for filtering - ensure all items are lowercase
        const combinedSlug = [
            ...(data.services || []).map((s: string) => s.toLowerCase()),
            data.location?.toLowerCase(),
            ...(data.additionalLocations || []).map((l: string) => l.toLowerCase())
        ].filter(Boolean);

        // Prepare the agency data with additional fields
        const agencyData = {
            ...data,
            agencySlug: slug,
            combinedSlug,
            createdAt: new Date(),
            rating: parseFloat(data.google_rating) || 0,
            reviewCount: parseInt(data.google_review_count) || 0,
            socialLinks: {
                facebook: data.socialMedia?.facebook || "",
                linkedin: data.socialMedia?.linkedin || "",
                instagram: data.socialMedia?.instagram || "",
                twitter: data.socialMedia?.twitter || ""
            }
        };

        // Connect to MongoDB
        await dbConnect();
        
        // Create the agency in MongoDB
        const agency = new AgencyModel(agencyData);
        await agency.save();

        return NextResponse.json({
            success: true,
            message: "Agency created successfully",
            id: agency._id
        });
    } catch (error) {
        console.error("Error creating agency:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create agency" },
            { status: 500 }
        );
    }
} 