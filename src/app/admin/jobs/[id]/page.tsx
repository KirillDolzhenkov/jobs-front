'use client';

import { useGetJobById } from '@/features/admin/lib/use-get-job-by-id';
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, TextField, MenuItem } from '@mui/material';
import { useGetCompanies } from '@/features/admin/lib/use-get-companies';
import { useUpdateJob } from '@/features/admin/lib/use-update-job';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material'; // Используем стандартный Button с темой

const JobEditPage: NextPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: job, isLoading, error } = useGetJobById(id);
  const { data: companiesData, isLoading: isCompaniesLoading } = useGetCompanies(1, 10);
  const updateJob = useUpdateJob(job?.companyId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    slug: '',
    expireAt: '',
    companyId: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        slug: job.slug,
        expireAt: job.expireAt ? new Date(job.expireAt).toISOString().slice(0, 16) : '',
        companyId: job.companyId,
      });
    }
  }, [job]);

  if (isLoading || isCompaniesLoading) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyId || !formData.title || !formData.description || !formData.location || !formData.expireAt) {
      console.error('Please fill all required fields');
      return;
    }

    updateJob.mutate(
      formData,
      {
        onSuccess: () => {
          router.push('/admin/jobs');
        },
        onError: (error) => {
          console.error('Update failed:', error.message);
        },
      },
    );
  };

  const companies = companiesData?.data || [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          required
        />
        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="slug"
          label="Slug"
          value={formData.slug}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="expireAt"
          label="Expire At"
          type="datetime-local"
          value={formData.expireAt}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          name="companyId"
          label="Select Company"
          value={formData.companyId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
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
    </Container>
  );
};

export default JobEditPage;