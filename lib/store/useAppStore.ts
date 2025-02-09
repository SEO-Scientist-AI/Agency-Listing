import { create } from 'zustand';
import {ServicesSlice,createServicesSlice} from './slices/services-slice';
import {CitiesSlice,createCitiesSlice} from './slices/cities-slice';
import {IndustriesSlice,createIndustriesSlice} from './slices/industries-slice';
import {AgenciesSlice,createAgenciesSlice} from './slices/agency-slice';



export type AppStoreState = ServicesSlice & CitiesSlice & IndustriesSlice & AgenciesSlice;

  const useAppStore = create<AppStoreState>()((...args) => ({
    ...createServicesSlice(...args),
    ...createCitiesSlice(...args),
    ...createIndustriesSlice(...args),
    ...createAgenciesSlice(...args)
    
  }))

// Fetch initial data when the store is created
useAppStore.getState().fetchServices();
useAppStore.getState().fetchCities();
useAppStore.getState().fetchIndustries();
// useAppStore.getState().fetchAgencies();


export default useAppStore;