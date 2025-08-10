import { Job }      from '@/shared/lib/types/schema';
import { useQuery } from '@tanstack/react-query';

export const useGetJobBySlug = (slug: string) => {
  return useQuery<Job, Error>({
    queryKey: ['publicJob', slug],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 404) throw new Error('Job not found');
        if (response.status === 400) throw new Error('Invalid job identifier');
        throw new Error('Failed to fetch job');
      }
      return response.json();
    },
    enabled: !!slug,
  });
};