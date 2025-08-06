'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import ClientProviders from '@/features/admin/components/ClientProviders';
import { useGetCompanies } from '@/features/admin/lib/use-get-companies';
import { useCreateJob } from '@/features/admin/lib/use-create-job';

const JobNewPage: NextPage = () => {
  const router = useRouter();
  const { data: companiesData, isLoading: isCompaniesLoading } = useGetCompanies(1, 10);
  const createJob = useCreateJob();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    slug: '',
    expireAt: '',
    companyId: '',
    tagIds: [] as string[],
  });

  useEffect(() => {
    // Генерируем уникальный slug на основе текущей даты
    setFormData((prev) => ({
      ...prev,
      slug: `new-job-${Date.now()}`,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    createJob.mutate(
      formData,
      {
        onSuccess: () => {
          router.push('/admin/jobs');
        },
        onError: (error) => {
          console.error('Create failed:', error);
        },
      }
    );
  };

  if (isCompaniesLoading) {
    return (
      <Container>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  const companies = companiesData?.data || [];

  return (
    <ClientProviders>
      <Container>
        <Typography variant="h4" gutterBottom>
          Create New Job
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
      </Container>
    </ClientProviders>
  );
};

export default JobNewPage;