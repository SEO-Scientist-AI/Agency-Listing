import { StateCreator } from 'zustand';
import {City} from "@/types/filtering-data";
import axiosInstance from '@/lib/axios-instance';

export interface CitiesSlice {
  cities: City[] | [];
  citiesLoading: boolean;
  error: string | null;
  fetchCities: () => Promise<void>;
  checkIfLocation:(slug:string)=>boolean;
}

export const createCitiesSlice: StateCreator<CitiesSlice> = (set,get) => ({
    cities: [],
    citiesLoading: false,
    error: null,
    fetchCities: async () => {
      set({ citiesLoading: true});
      try {
        // Fetch cities data from the server

        const response = await axiosInstance.get('/locations');
        const cities = await response.data;
       
        set({ cities, citiesLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch cities data', citiesLoading: false });
      }
    },
    checkIfLocation: (slug:string) => {
      const {cities} = get();
      return cities.some(city => city.citySlug === slug);
    }
});