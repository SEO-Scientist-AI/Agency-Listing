import { StateCreator } from 'zustand';
import {Industry} from "@/types/filtering-data";
import axiosInstance from '@/lib/axios-instance';

export interface IndustriesSlice {
  industries: Industry[] | [];
  IndLoading: boolean;
  error: string | null;
  fetchIndustries: () => Promise<void>;
}

export const createIndustriesSlice: StateCreator<IndustriesSlice> = (set) => ({
    industries: [],
    IndLoading: false,
    error: null,
    fetchIndustries: async () => {
      set({ IndLoading: true});
      try {
        // Fetch industry data from the server

        const response = await axiosInstance.get('/industries');
        const industries = await response.data;
       
        set({ industries, IndLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch industries data', IndLoading: false });
      }
    },
});