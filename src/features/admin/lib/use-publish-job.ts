import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePublishJob = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/admin/jobs/${id}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      });
      if (!response.ok) throw new Error('Failed to publish job');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs']);
      queryClient.invalidateQueries(['job', id]);
    },
    onError: (error) => {
      console.error('Publish failed:', error);
    },
  });
};