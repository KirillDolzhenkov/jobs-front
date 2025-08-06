import { useQuery } from '@tanstack/react-query';

interface JobViewDto {
  id: string;
  title: string;
  description: string;
  slug: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  isRemote: boolean;
  postedAt: string;
  expireAt: string;
  companyId: string;
  companyName: string;
  applyUrl: string;
}

export const useGetJobBySlug = (slug: string) => {
  return useQuery<JobViewDto, Error>({
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