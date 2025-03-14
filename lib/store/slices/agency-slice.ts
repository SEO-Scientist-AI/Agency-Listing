import { StateCreator } from 'zustand';
import {Agency} from "@/types/agency";
import axiosInstance from '@/lib/axios-instance';

interface APIResponse {
        success:boolean;
        currentPage: string;
        totalPages: number;
        totalAgencies: string;
        agencies: Agency[] | [];
}
export interface AgenciesSlice {
  agencies: Agency[] | [];
  agencyLoading: boolean;
  error: string | null;
  totalPages:number ,
  currentPage:number,
  fetchAgencies: () => Promise<void>;
  setAgencies:(data: APIResponse)=>void;
}

export const createAgenciesSlice: StateCreator<AgenciesSlice> = (set) => ({
    agencies: [],
    agencyLoading: false,
    error: null,
    totalPages:1,
    currentPage:1,
    fetchAgencies: async () => {
      set({ agencyLoading: true});
      try {
        // Fetch agencies data from the server

        const response = await axiosInstance.get('/agency');
        // console.log("response in agencies ",await response.data)
        const data = await response.data;
        const agencies = data.agencies;
        const totalPages = data.totalPages;
        const currentPage = data.currentPage;
        
       
        set({ agencies,totalPages,currentPage, agencyLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch agencies data', agencyLoading: false });
      }
    },
   
    setAgencies: (data)=>{
        const agencies = data.agencies
      const totalPages = data.totalPages;
      const currentPage = Number(data.currentPage);
        set({agencies,totalPages,currentPage});
    }
    
});