import { useQuery } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { fetchJobs } from '@/shared/lib/mock-data';

export function useGetJobById(id: string) {
    return useQuery<ApiSchema.Job>({
        queryKey: ['job', id],
        queryFn: () => fetchJobs().then((jobs) => jobs.find((j) => j.id === id)),
        enabled: !!id,
    });
}