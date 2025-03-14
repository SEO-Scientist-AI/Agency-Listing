"use server";

import { Agency } from "@/types/agency";
import dbConnect from "@/lib/dbConnect";
import AgencyModel from "@/lib/model/Agency";

export async function createAgency(agencyData: any) {
  try {
    await dbConnect();
    
    // Create a slug from the agency name
    const slug = agencyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Create combined slug for filtering - ensure all items are lowercase
    const combinedSlug = [
      ...(agencyData.services || []).map((s: string) => s.toLowerCase()),
      agencyData.location?.toLowerCase(),
      ...(agencyData.additionalLocations || []).map((l: string) => l.toLowerCase())
    ].filter(Boolean);

    // Prepare the agency data with additional fields
    const newAgencyData = {
      ...agencyData,
      agencySlug: slug,
      combinedSlug,
      createdAt: new Date(),
      rating: parseFloat(agencyData.google_rating) || 0,
      reviewCount: parseInt(agencyData.google_review_count) || 0,
      socialLinks: {
        facebook: agencyData.socialMedia?.facebook || "",
        linkedin: agencyData.socialMedia?.linkedin || "",
        instagram: agencyData.socialMedia?.instagram || "",
        twitter: agencyData.socialMedia?.twitter || ""
      }
    };

    // Create the agency in MongoDB
    const agency = new AgencyModel(newAgencyData);
    await agency.save();

    return {
      success: true,
      message: "Agency created successfully",
      id: agency._id
    };
  } catch (error) {
    console.error("Error creating agency:", error);
    return {
      success: false,
      error: "Failed to create agency"
    };
  }
} 