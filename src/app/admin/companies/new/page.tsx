'use client';

import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useCreateCompany } from '@/features/admin/lib/use-create-job';

const NewCompanyPage: NextPage = () => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [logoUrl, setLogoUrl] = React.useState('');

    const createCompanyMutation = useCreateCompany();

    const handleSubmit = async () => {
        if (!name || !slug) {
            alert('Name and Slug are required');
            return;
        }

        try {
            await createCompanyMutation.mutateAsync({
                name,
                description,
                slug,
                logoUrl,
            });
            router.push('/admin/companies');
        } catch (error) {
            console.error('Error creating company:', error);
            alert('Error creating company');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create New Company
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
                    disabled={createCompanyMutation.isPending}
                >
                    {createCompanyMutation.isPending ? 'Creating...' : 'Create Company'}
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

export default NewCompanyPage;