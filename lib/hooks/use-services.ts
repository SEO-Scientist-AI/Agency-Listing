import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios-instance';
import { Service } from '../model/Service';

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await axiosInstance.get('services');
      return response.data || [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
} 