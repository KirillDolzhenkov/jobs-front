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

interface JobsResponse {
  meta: {
    total: number;
    page: number;
    size: number;
  };
  data: JobViewDto[];
}

export const useGetJobs = (page: number = 1, limit: number = 10) => {
  return useQuery<JobsResponse, Error>({
    queryKey: ['publicJobs', page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/jobs?page=${page}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return response.json();
    },
  });
};