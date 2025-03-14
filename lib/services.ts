import axiosInstance from "./axios-instance";

export async function getServices() {
  try {
    const response = await axiosInstance.get('services');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
} 