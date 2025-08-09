import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Job }                         from '@/shared/lib/types/schema';

export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation<Job, Error, { title: string; description: string; location: string; slug: string; expireAt: string; companyId: string; tagIds?: string[] }>({
        mutationFn: async (data) => {
            const response = await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create job');
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['jobs']);
        },
    });
};