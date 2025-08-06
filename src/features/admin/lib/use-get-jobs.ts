import { useQuery } from '@tanstack/react-query';
import { Job, PaginatedResponse } from '@/shared/types/schema';

export const useGetJobs = (page: number = 1, limit: number = 10) => {
    return useQuery<PaginatedResponse<Job>>({
        queryKey: ['jobs', page, limit],
        queryFn: async () => {
            const response = await fetch(`/api/jobs?page=${page}&limit=${limit}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch jobs');
            return response.json();
        },
    });
};