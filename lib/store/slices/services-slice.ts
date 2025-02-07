import { StateCreator } from 'zustand';
import {Service} from "@/types/filtering-data";
import axiosInstance from '@/lib/axios-instance';

export interface ServicesSlice {
  services: Service[] | [];
  serviceLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
}

export const createServicesSlice: StateCreator<ServicesSlice> = (set) => ({
    services: [],
    serviceLoading: false,
    error: null,
    fetchServices: async () => {
      set({ serviceLoading: true});
      try {
        // Fetch services data from the server

        const response = await axiosInstance.get('/services');
        const services = await response.data;
        // console.log("services",services)
        set({ services, serviceLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch services data', serviceLoading: false });
      }
    },
});





