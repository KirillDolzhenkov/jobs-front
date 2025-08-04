import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { fetchJobs } from '@/shared/lib/mock-data';

export function useGetJobsList() {
    return useQuery<ApiSchema.Job[]>({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
    });
}