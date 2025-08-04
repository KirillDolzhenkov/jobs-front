import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { fetchCompanies } from '@/shared/lib/mock-data';

export function useGetCompaniesList() {
    return useQuery<ApiSchema.Company[]>({
        queryKey: ['companies'],
        queryFn: fetchCompanies,
    });
}