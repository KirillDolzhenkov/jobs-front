'use client';

import { useRouter, useParams } from 'next/navigation';
import {useState, useEffect, use} from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useGetCompanyById } from '@/features/admin/lib/use-get-company-by-id';
import { ApiSchema } from '@/shared/types/schema';

const EditCompanyPage = ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = use(params);
    const router = useRouter();

    const { data: company, isLoading, isError } = useGetCompanyById(id);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        console.log('Mounting EditCompanyPage, ID:', id);
        if (company) {
            setName(company.name);
            setDescription(company.description || '');
            setSlug(company.slug);
            setLogoUrl(company.logoUrl || '');
        } else if (id) {
            const storedCompanies = JSON.parse(localStorage.getItem('mockCompanies') || '[]');
            const storedCompany = storedCompanies.find((c: ApiSchema.Company) => c.id === id);
            console.log('Stored companies:', storedCompanies, 'Found:', storedCompany);
            if (storedCompany) {
                setName(storedCompany.name);
                setDescription(storedCompany.description || '');
                setSlug(storedCompany.slug);
                setLogoUrl(storedCompany.logoUrl || '');
            }
        }
    }, [company, id]);

    const handleSubmit = () => {
        if (!id) return;
        const updatedCompany: ApiSchema.Company = { id, name, description, slug, logoUrl };
        const mockCompanies = JSON.parse(localStorage.getItem('mockCompanies') || '[]');
        const updatedCompanies = mockCompanies.map((c: ApiSchema.Company) =>
            c.id === id ? updatedCompany : c
        );
        localStorage.setItem('mockCompanies', JSON.stringify(updatedCompanies));
        router.push('/admin/companies');
    };

    if (isLoading) {
        return (
            <Container>
                <Typography variant="h5">Loading...</Typography>
            </Container>
        );
    }

    if (isError || (!company && !JSON.parse(localStorage.getItem('mockCompanies') || '[]').find((c: ApiSchema.Company) => c.id === id))) {
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
                Save Changes
            </Button>
        </Container>
    );
};

export default EditCompanyPage;