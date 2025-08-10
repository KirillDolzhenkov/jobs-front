'use client';

import { NextPage }                         from 'next';
import { useParams, useRouter }             from 'next/navigation';
import { Container, Typography, TextField } from '@mui/material';

import React                 from 'react';
import { useGetCompanyById } from '@/features/admin/lib/use-get-company-by-id';
import { useUpdateCompany }  from '@/features/admin/lib/use-update-company';
import Button                from '@/shared/ui/Button/Button';

const CompanyEditPage: NextPage = () => {
  const { slug }        = useParams() as {slug: string};
  const router        = useRouter();
  const {
          data: company,
          isLoading,
          error,
        }             = useGetCompanyById(slug);
  const updateCompany = useUpdateCompany(company?.id);

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
        <Typography variant="h5">Error loading company: {error.message}</Typography>
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData    = new FormData(e.target as HTMLFormElement);
    const name        = formData.get('name') as string;
    const description = formData.get('description') as string;
    const logoUrl     = formData.get('logoUrl') as string;

    updateCompany.mutate(
      {
        name,
        description,
        logoUrl,
      },
      {
        onSuccess: () => {
          router.push('/admin/companies');
        },
        onError:   (error) => {
          console.error('Update failed:', error);
        },
      },
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Company
      </Typography>
      {company && (
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            defaultValue={company.name}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="description"
            label="Description"
            defaultValue={company.description}
            fullWidth
            margin="normal"
            multiline
          />
          <TextField
            name="logoUrl"
            label="Logo URL"
            defaultValue={company.logoUrl}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/admin/companies')}
            sx={{
              mt: 2,
              ml: 2,
            }}
          >
            Cancel
          </Button>
        </form>
      )}
    </Container>
  );
};

export default CompanyEditPage;