import { useQuery } from '@tanstack/react-query';
import { Company }  from '@/shared/lib/types/schema';

export const useGetCompanyById = (id: string) => {
    return useQuery<Company>({
        queryKey: ['company', id],
        queryFn: async () => {
            const response = await fetch(`/api/companies/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch company');
            return response.json();
        },
    });
};