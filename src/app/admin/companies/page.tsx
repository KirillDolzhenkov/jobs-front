'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useGetCompaniesList } from '@/features/admin/lib/use-get-companies-list';
import { ApiSchema } from '@/shared/types/schema'; // Добавляем типизацию

const CompaniesPage: NextPage = () => {
    const router = useRouter();
    const { data: companies, isLoading, error } = useGetCompaniesList();
    const [storedCompanies, setStoredCompanies] = useState<ApiSchema.Company[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('mockCompanies') || '[]');
        setStoredCompanies(stored);
    }, []);

    const handleCreate = () => {
        router.push('/admin/companies/new');
    };

    const allCompanies = [...(companies || []), ...storedCompanies].filter(
        (company: ApiSchema.Company, index, self) =>
            index === self.findIndex((c: ApiSchema.Company) => c.id === company.id)
    );

    if (isLoading) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Companies
                </Typography>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Companies
                </Typography>
                <Typography color="error">Error loading companies</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Companies
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mb: 2 }}>
                Create New Company
            </Button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Slug</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {allCompanies.map((company: ApiSchema.Company) => (
                    <tr key={company.id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.slug}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => router.push(`/admin/companies/${company.id}/edit`)} // Исправленный маршрут
                            >
                                Edit
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
};

export default CompaniesPage;