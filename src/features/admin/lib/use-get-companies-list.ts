import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { getCompaniesFromStorage } from '@/shared/lib/mock-data';

export const useGetCompanies = () => {
    return useQuery<ApiSchema.Company[]>({
        queryKey: ['companies'],
        queryFn: async () => {
            return getCompaniesFromStorage();
        },
        staleTime: Infinity,
    });
};