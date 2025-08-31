import { useQuery } from '@tanstack/react-query';
import { Job }      from '@/shared/lib/types/schema';

export const useGetJobBySlug = (slug: string) => {
  return useQuery<Job>({
    queryKey: ['job', slug],
    queryFn:  async() => {
      const response = await fetch(`/api/jobs/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:  'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      return response.json();
    },
  });
};