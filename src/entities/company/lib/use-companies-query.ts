import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { getCompaniesFromStorage } from '@/shared/lib/mock-data';

export function useCompaniesQuery() {
    return useQuery<ApiSchema.Company[]>({
        queryKey: ['companies'],
        queryFn: async () => {
            return getCompaniesFromStorage();
        },
        staleTime: Infinity,
    });
}