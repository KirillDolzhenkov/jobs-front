import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useArchiveJob = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async() => {
      const response = await fetch(`/api/admin/jobs/${id}/archive`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to archive job');
      }
      return response.json();
    },
    onSuccess:  () => {
      void queryClient.invalidateQueries({ queryKey: ['jobs'] });
      void queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
    onError:    (error) => {
      console.error('Archive failed:', error);
    },
  });
};