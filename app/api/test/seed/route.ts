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


export async function GET(req:NextRequest){
    try {
        // Connect to the database
        await dbConnect();
        console.log("seeding started");
        //Seed Agencies 
        await AgencyModel.deleteMany({});
        
        
        let index = 0;
        
        for (const agency of agencies.agencies){
          const Agency = new AgencyModel({...agency,email:`${index++}@example.com`,additionalLocations:agency.additionalLocations ? agency.additionalLocations : []});
          // console.log("Agency",agency.name)
          // Save the document to the database
          await Agency.save();
        }
        console.log("agencies is done")
     
        // // Seed Locations 
        // await LocationModel.deleteMany({});
        // await LocationModel.insertMany(locations.locations)
        // console.log("locations is done")

        // // Seed Industries
        // await IndustryModel.deleteMany({});
        // await IndustryModel.insertMany(industries.industries);
        // console.log("industries is done")

        // // Seed Services
        // await ServiceModel.deleteMany({});
        // await ServiceModel.insertMany(services.services);
        // console.log("services is done")

    
        return NextResponse.json({ message: "Database Seeding Success" }, { status: 200 });
      } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: "Error Seeding database" }, { status: 500 });
      }
}

