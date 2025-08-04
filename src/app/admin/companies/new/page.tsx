'use client';

import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button } from '@mui/material';

const NewCompanyPage: NextPage = () => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [logoUrl, setLogoUrl] = React.useState('');

    const handleSubmit = () => {
        const newCompany = { id: String(Date.now()), name, description, slug, logoUrl };
        const mockCompanies = JSON.parse(localStorage.getItem('mockCompanies') || '[]');
        mockCompanies.push(newCompany);
        localStorage.setItem('mockCompanies', JSON.stringify(mockCompanies));
        router.push('/admin/companies');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create New Company
            </Typography>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                label="Slug"
                fullWidth
                margin="normal"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
            />
            <TextField
                label="Logo URL"
                fullWidth
                margin="normal"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Create Company
            </Button>
        </Container>
    );
};

export default NewCompanyPage;