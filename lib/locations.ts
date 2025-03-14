import axiosInstance from "./axios-instance";

export async function getLocations() {
  try {
    const response = await axiosInstance.get('locations');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
} 