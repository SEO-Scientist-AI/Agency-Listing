import dbConnect from "@/lib/dbConnect";
import ServiceModel from "@/lib/model/Service";
import LocationModel from "@/lib/model/Location";
import AgencyModel from "@/lib/model/Agency";
import IndustryModel from "@/lib/model/Industry";

/**
 * Server-side data fetching functions for static site generation
 * These bypass API routes and directly access MongoDB
 */

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function withRetry<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    await dbConnect();
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation, ${retries} attempts remaining`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}

export async function getServicesServer() {
  try {
    return await withRetry(async () => {
      const services = await ServiceModel.find({})
        .select('-__v')  // Exclude version field
        .lean()
        .exec();
      return services;
    });
  } catch (error) {
    console.error("Error fetching services from server:", error);
    return [];
  }
}

export async function getLocationsServer() {
  try {
    return await withRetry(async () => {
      const locations = await LocationModel.find({})
        .select('-__v')
        .lean()
        .exec();
      return locations;
    });
  } catch (error) {
    console.error("Error fetching locations from server:", error);
    return [];
  }
}

export async function getIndustriesServer() {
  try {
    await dbConnect();
    const industries = await IndustryModel.find({})
      .select('-__v')
      .lean()
      .exec();
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
    
    let queryConditions: any = {};

    if (services || location) {
      const serviceFilters = services ? services.split(' ').map((s: string) => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map((l: string) => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        queryConditions.combinedSlug = { $in: allFilters };
      }
    }
    
    const [totalDocuments, agencies] = await Promise.all([
      AgencyModel.countDocuments(queryConditions).exec(),
      AgencyModel.find(queryConditions)
        .select('-__v')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);
      
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
    const agency = await AgencyModel.findOne({ agencySlug: slug })
      .select('-__v')
      .lean()
      .exec();
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
    let query = {};

    if (services || location) {
      const serviceFilters = services ? services.split(' ').map((s: string) => s.toLowerCase()) : [];
      const locationFilters = location ? location.split(' ').map((l: string) => l.toLowerCase()) : [];
      const allFilters = [...serviceFilters, ...locationFilters];

      if (allFilters.length > 0) {
        query = { combinedSlug: { $in: allFilters } };
      }
    }

    const count = await AgencyModel.countDocuments(query).exec();
    return { count };
  } catch (error) {
    console.error('Error getting agency count from server:', error);
    return { count: 0 };
  }
}

export async function getAllAgencySlugServer() {
  try {
    await dbConnect();
    const agencies = await AgencyModel.find({})
      .select('agencySlug')
      .lean()
      .exec();
    
    return agencies.map(agency => agency.agencySlug);
  } catch (error) {
    console.error("Error fetching agency slugs from server:", error);
    return [];
  }
} 