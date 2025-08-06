import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Company } from '@/shared/types/schema';

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<Company, Error, { name: string; description?: string; logoUrl?: string }>({
    mutationFn: async (data) => {
      const response = await fetch('/api/admin/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create company');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['companies']);
    },
  });
};