import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios-instance';
import { Location } from '../model/Location';

export function useLocations() {
  return useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await axiosInstance.get('locations');
      return response.data || [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
} 