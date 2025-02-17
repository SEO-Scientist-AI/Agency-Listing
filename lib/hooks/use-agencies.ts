import useSWR from 'swr';
import axiosInstance from '@/lib/axios-instance';

export function useAgencies(params: URLSearchParams) {
  const key = params.toString() ? `/agency?${params.toString()}` : '/agency';
  
  const { data, error, isLoading, mutate } = useSWR(
    key,
    async () => {
      const response = await axiosInstance.get(key);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
      keepPreviousData: true,
      revalidateOnReconnect: false,
      revalidateIfStale: false
    }
  );

  return {
    agencies: data?.agencies || [],
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 1,
    isLoading,
    error,
    mutate
  };
} 