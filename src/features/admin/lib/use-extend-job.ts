import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useExtendJob = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/admin/jobs/${id}/extend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      });
      if (!response.ok) throw new Error('Failed to extend job');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs']);
      queryClient.invalidateQueries(['job', id]);
    },
    onError: (error) => {
      console.error('Extend failed:', error);
    },
  });
};