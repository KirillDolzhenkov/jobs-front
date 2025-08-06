'use client';

import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button } from '@mui/material';
import ClientProviders from '@/features/admin/components/ClientProviders';
import { useGetJobById } from '@/features/admin/lib/use-get-job-by-id';
import { useUpdateJob } from '@/features/admin/lib/use-update-job';

const JobEditPage: NextPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: job, isLoading, error } = useGetJobById(id as string);
  const updateJob = useUpdateJob(id as string);

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5">Error loading job: {error.message}</Typography>
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const slug = formData.get('slug') as string;
    const expireAt = formData.get('expireAt') as string;
    const companyId = formData.get('companyId') as string;

    updateJob.mutate(
      { title, description, location, slug, expireAt, companyId },
      {
        onSuccess: () => {
          router.push('/admin/jobs');
        },
        onError: (error) => {
          console.error('Update failed:', error);
        },
      }
    );
  };

  return (
    <ClientProviders>
      <Container>
        <Typography variant="h4" gutterBottom>
          Edit Job
        </Typography>
        {job && (
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              defaultValue={job.title}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="description"
              label="Description"
              defaultValue={job.description}
              fullWidth
              margin="normal"
              multiline
              required
            />
            <TextField
              name="location"
              label="Location"
              defaultValue={job.location}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="slug"
              label="Slug"
              defaultValue={job.slug}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="expireAt"
              label="Expire At"
              type="datetime-local"
              defaultValue={job.expireAt ? new Date(job.expireAt).toISOString().slice(0, 16) : ''}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="companyId"
              label="Company ID"
              defaultValue={job.companyId}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/admin/jobs')}
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </form>
        )}
      </Container>
    </ClientProviders>
  );
};

export default JobEditPage;