import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { fetchCompanies } from '@/shared/lib/mock-data';

export function useGetCompanyById(id: string) {
    return useQuery<ApiSchema.Company>({
        queryKey: ['company', id],
        queryFn: () => fetchCompanies().then((companies) => companies.find((c) => c.id === id)),
        enabled: !!id,
    });
}