import { useQuery } from '@tanstack/react-query';
import { fetchCompanies, Company } from '@/shared/lib/mock-data';

export function useCompaniesQuery() {
    return useQuery<Company[]>({
        queryKey: ['companies'],
        queryFn: fetchCompanies,
    });
}