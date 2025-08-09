'use client';

import { Container, TextField, Typography } from '@mui/material';
import { NextPage }                         from 'next';
import { useRouter }                        from 'next/navigation';
import { useState }                         from 'react';

import { useCreateCompany } from '@/features/admin/lib/use-create-company';
import CustomButton         from '@/shared/ui/CustomButton/CustomButton';

const CompanyNewPage: NextPage = () => {
  const router        = useRouter();
  const createCompany = useCreateCompany();

  const [formData, setFormData] = useState({
    name:        '',
    description: '',
    logoUrl:     '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
            name,
            value,
          } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      console.error('Please fill the name field');
      return;
    }
    createCompany.mutate(
      formData,
      {
        onSuccess: () => {
          router.push('/admin/companies');
        },
        onError:   (error) => {
          console.error('Create failed:', error);
        },
      },
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Company
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
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
        />
        <TextField
          name="logoUrl"
          label="Logo URL"
          value={formData.logoUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <CustomButton type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save
        </CustomButton>
        <CustomButton
          variant="outlined"
          onClick={() => router.push('/admin/companies')}
          sx={{
            mt: 2,
            ml: 2,
          }}
        >
          Cancel
        </CustomButton>
      </form>
    </Container>
  );
};

export default CompanyNewPage;