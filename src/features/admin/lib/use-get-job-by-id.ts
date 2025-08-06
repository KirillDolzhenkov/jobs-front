import { useQuery } from '@tanstack/react-query';
import { Job } from '@/shared/types/schema';

export const useGetJobById = (id: string) => {
    return useQuery<Job>({
        queryKey: ['job', id],
        queryFn: async () => {
            const response = await fetch(`/api/jobs/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch job');
            return response.json();
        },
    });
};