import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Job } from '@/shared/types/schema';

export const useUpdateJob = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, { title: string; description: string; location: string; slug: string; expireAt: string; companyId: string; tagIds?: string[] }>({
    mutationFn: async (data) => {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46cGFzc5dvcmQ=',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update job');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['jobs']);
      queryClient.invalidateQueries(['job', id]);
    },
  });
};