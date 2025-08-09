import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateJobData {
  title: string;
  description: string;
  location: string;
  slug: string;
  expireAt: string;
  companyId: string;
  logoUrl?: string;
  tagIds?: string[];
}

interface Job {
  id: string;
  title: string;
  description: string;
  slug: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  isRemote?: boolean;
  postedAt: string;
  expireAt: string;
  companyId: string;
  companyName?: string;
  applyUrl?: string;
  logoUrl?: string;
  tagIds?: string[];
}

export const useUpdateJob = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, UpdateJobData>({
    mutationFn: async (data) => {
      const formattedData = {
        ...data,
        expireAt: new Date(data.expireAt).toISOString(),
        tagIds: data.tagIds ?? [],
      };

      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update job: ${response.status} ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
  });
};
