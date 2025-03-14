import dbConnect from "@/lib/dbConnect";
import ServiceModel from "@/lib/model/Service";
import LocationModel from "@/lib/model/Location";
import AgencyModel from "@/lib/model/Agency";
import IndustryModel from "@/lib/model/Industry";

/**
 * Server-side data fetching functions for static site generation
 * These bypass API routes and directly access MongoDB
 */

export async function getServicesServer() {
  try {
    await dbConnect();
    const services = await ServiceModel.find({}).lean();
    return services;
  } catch (error) {
    console.error("Error fetching services from server:", error);
    return [];
  }
}

export async function getLocationsServer() {
  try {
    await dbConnect();
    const locations = await LocationModel.find({}).lean();
    return locations;
  } catch (error) {
    console.error("Error fetching locations from server:", error);
    return [];
  }
}

export async function getIndustriesServer() {
  try {
    await dbConnect();
    const industries = await IndustryModel.find({}).lean();
    return industries;
  } catch (error) {
    console.error("Error fetching industries from server:", error);
    return [];
  }
}

export async function getAgenciesServer(params: any = {}) {
  try {
    await dbConnect();
    
    const { services, location, page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;
    
    // Create base query
    let queryConditions: any = {};

    // Handle multiple filters with OR condition
    if (services || location) {
      const serviceFilters = services ? services.split(' ').map((s: string) => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map((l: string) => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        queryConditions.combinedSlug = { $in: allFilters }; // Use $in for OR condition
      }
    }
    
    const totalDocuments = await AgencyModel.countDocuments(queryConditions);
    const totalPages = Math.ceil(totalDocuments / limit);
    
    const agencies = await AgencyModel.find(queryConditions)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
      
    return {
      agencies,
      currentPage: page,
      totalPages,
      totalAgencies: totalDocuments,
    };
  } catch (error) {
    console.error("Error fetching agencies from server:", error);
    return {
      agencies: [],
      currentPage: 1,
      totalPages: 1,
      totalAgencies: 0,
    };
  }
}

export async function getAgencyBySlugServer(slug: string) {
  try {
    await dbConnect();
    const agency = await AgencyModel.findOne({ agencySlug: slug }).lean();
    return agency;
  } catch (error) {
    console.error("Error fetching agency by slug from server:", error);
    return null;
  }
}

export async function getAgencyCountServer(params: any = {}) {
  try {
    await dbConnect();
    
    const { services, location } = params;
    
    // Build the query
    let query = {};

    if (services || location) {
      const serviceFilters = services ? services.split(' ').map((s: string) => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map((l: string) => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        query = {
          combinedSlug: { $in: allFilters }
        };
      }
    }

    const count = await AgencyModel.countDocuments(query);
    return { count };
  } catch (error) {
    console.error('Error getting agency count from server:', error);
    return { count: 0 };
  }
} 