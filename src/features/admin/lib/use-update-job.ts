import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateJobData {
  title: string;
  description: string;
  location: string;
  slug: string;
  expireAt: string;
  companyId: string;
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
}

export const useUpdateJob = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, UpdateJobData>({
    mutationFn: async (data) => {
      console.log('Updating job - ID:', id, 'Full data:', JSON.stringify(data, null, 2));

      const formattedData = {
        ...data,
        expireAt: new Date(data.expireAt).toISOString(), // Убеждаемся в формате ISO
      };

      console.log('Formatted data sent:', JSON.stringify(formattedData, null, 2));

      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=', // Проверь этот заголовок
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Попробуем получить JSON ошибки
        console.error('Update failed - Status:', response.status, 'Error details:', errorData);
        throw new Error(`Failed to update job: ${response.status} ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log('Update response:', result);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      console.log('Job updated successfully:', data);
    },
    onError: (error) => {
      console.error('Update job error:', error.message);
    },
  });
};