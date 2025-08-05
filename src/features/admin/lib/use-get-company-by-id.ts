import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { getCompaniesFromStorage } from '@/shared/lib/mock-data';

export const useGetCompanyById = (id: string) => {
    return useQuery<ApiSchema.Company>({
        queryKey: ['companies', id],
        queryFn: async () => {
            const companies = getCompaniesFromStorage();
            const company = companies.find(c => c.id === id);
            
            if (!company) {
                throw new Error(`Company with id ${id} not found`);
            }
            
            return company;
        },
        staleTime: Infinity,
    });
};