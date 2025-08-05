'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useGetCompanyById } from '@/features/admin/lib/use-get-company-by-id';
import { useUpdateCompany } from '@/features/admin/lib/use-get-jobs-list';
import { ApiSchema } from '@/shared/types/schema';

const EditCompanyPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter();

    const { data: company, isLoading, isError } = useGetCompanyById(id);
    const updateCompanyMutation = useUpdateCompany();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        if (company) {
            setName(company.name);
            setDescription(company.description || '');
            setSlug(company.slug);
            setLogoUrl(company.logoUrl || '');
        }
    }, [company]);

    const handleSubmit = async () => {
        if (!id || !name || !slug) {
            alert('Name and Slug are required');
            return;
        }

        try {
            const updatedCompany: ApiSchema.Company = { 
                id, 
                name, 
                description, 
                slug, 
                logoUrl 
            };
            
            await updateCompanyMutation.mutateAsync(updatedCompany);
            router.push('/admin/companies');
        } catch (error) {
            console.error('Error updating company:', error);
            alert('Error updating company');
        }
    };

    if (isLoading) {
        return (
            <Container>
                <Typography variant="h5">Loading...</Typography>
            </Container>
        );
    }

    if (isError || !company) {
        return (
            <Container>
                <Typography variant="h5">Company not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Company
            </Typography>
            <TextField
                label="Name *"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                label="Slug *"
                fullWidth
                margin="normal"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
            />
            <TextField
                label="Logo URL"
                fullWidth
                margin="normal"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={updateCompanyMutation.isPending}
                >
                    {updateCompanyMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => router.push('/admin/companies')}
                >
                    Cancel
                </Button>
            </Box>
        </Container>
    );
};

export default EditCompanyPage;