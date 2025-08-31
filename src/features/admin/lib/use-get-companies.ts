import { useQuery }                   from '@tanstack/react-query';
import { Company, PaginatedResponse } from '@/shared/lib/types/schema';

export const useGetCompanies = (page: number = 1, limit: number = 10) => {
  return useQuery<PaginatedResponse<Company>>({
    queryKey: ['companies', page, limit],
    queryFn:  async() => {
      const response = await fetch(`/api/companies?page=${page}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:  'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      return response.json();
    },
  });
};