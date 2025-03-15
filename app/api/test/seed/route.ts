import {NextRequest,NextResponse } from "next/server";

import AgencyModel from "@/lib/model/Agency";
import LocationModel from "@/lib/model/Location";
import IndustryModel from "@/lib/model/Industry";
import ServiceModel from "@/lib/model/Service";
import dbConnect from "@/lib/dbConnect";
import agencies from "@/lib/data/agencies.json";
import locations from "@/lib/data/locations.json";
import industries from "@/lib/data/industries.json";
import services from "@/lib/data/services.json";

// Add this interface near the top of the file
interface AgencyData {
    name: string;
    description: string;
    services: string[];
    industries: string[];
    imageUrl: string;
    tagline: string;
    rating: number;
    reviewCount: number;
    location: string;
    additionalLocations: string[];
    websiteUrl: string;
    budgetRange: string;
    founded: string;
    teamSize: string;
    hourlyRate: string;
    socialLinks: {
        facebook?: string;
        linkedin?: string;
        instagram?: string;
        youtube?: string;
    };
    slug: string[];
    slugLocation: string[];
    combinedSlug: string[];
    email: string;
    gmbLink: string;
    projectDuration: string;
    agencySlug: string;
}

export async function GET(req:NextRequest){
    try {
        // Connect to the database
        await dbConnect();
        console.log("seeding started");

        // Seed Agencies with better error handling
        await AgencyModel.deleteMany({});
        
        const agencyArray = (Array.isArray(agencies) ? agencies : [agencies]) as AgencyData[];
        
        const usedSlugs = new Set();
        let index = 0;
        
        for (let i = 0; i < agencyArray.length; i += 50) {
            const batch = agencyArray.slice(i, i + 50)
                .map((agency: AgencyData) => {
                    let agencySlug = agency.agencySlug || 
                                   agency.name.toLowerCase()
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/^-+|-+$/g, '');
                    
                    if (usedSlugs.has(agencySlug)) {
                        let counter = 1;
                        while (usedSlugs.has(`${agencySlug}-${counter}`)) {
                            counter++;
                        }
                        agencySlug = `${agencySlug}-${counter}`;
                    }
                    usedSlugs.add(agencySlug);
                    
                    return {
                        ...agency,
                        agencySlug,
                        email: agency.email || `agency${index++}@example.com`,
                        additionalLocations: agency.additionalLocations || []
                    };
                });

            try {
                await AgencyModel.insertMany(batch, { ordered: false });
                console.log(`Processed agencies ${i} to ${i + batch.length}`);
            } catch (err) {
                console.error(`Error in batch ${i}:`, err);
            }
        }
        console.log("agencies seeding completed");
     
        // Seed other collections with better error handling
        try {
            await LocationModel.deleteMany({});
            await LocationModel.insertMany(locations.locations);
            console.log("locations seeding completed");
        } catch (err) {
            console.error("Error seeding locations:", err);
        }

        try {
            await IndustryModel.deleteMany({});
            await IndustryModel.insertMany(industries.industries);
            console.log("industries seeding completed");
        } catch (err) {
            console.error("Error seeding industries:", err);
        }

        try {
            await ServiceModel.deleteMany({});
            await ServiceModel.insertMany(services.services);
            console.log("services seeding completed");
        } catch (err) {
            console.error("Error seeding services:", err);
        }

        return NextResponse.json({ 
            message: "Database Seeding Success",
            counts: {
                agencies: await AgencyModel.countDocuments(),
                locations: await LocationModel.countDocuments(),
                industries: await IndustryModel.countDocuments(),
                services: await ServiceModel.countDocuments()
            }
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Seeding error:', error);
        return NextResponse.json({ 
            error: "Error Seeding database",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

