import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { mockJobs, fetchJobs } from '@/shared/lib/mock-data';

export function useCreateJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newJob: Omit<ApiSchema.Job, 'id' | 'postedAt' | 'isPublished'>) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const id = String(mockJobs.length + 1);
            const postedAt = new Date().toISOString();
            const job = { ...newJob, id, postedAt, isPublished: true } as ApiSchema.Job;
            mockJobs.push(job);
            return job;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs']);
        },
    });
}