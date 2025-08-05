'use client';

import { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useGetCompanies } from '@/features/admin/lib/use-get-companies-list';
import ClientProviders from '@/features/admin/components/ClientProviders';

const CompaniesPage: NextPage = () => {
    const router = useRouter();
    const { data: companies, isLoading, error } = useGetCompanies();

    console.log('Companies data:', companies, 'Loading:', isLoading, 'Error:', error);

    const handleCreate = () => {
        router.push('/admin/companies/new');
    };

    if (isLoading) {
        return (
            <Container>
                <Typography variant="h5">Loading...</Typography>
            </Container>
        );
    }

    if (error || !companies) {
        return (
            <Container>
                <Typography variant="h5">Error or no data: {error?.message || 'No companies found'}</Typography>
            </Container>
        );
    }

    return (
        <ClientProviders>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Companies
                </Typography>
                <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mb: 2 }}>
                    Create New Company
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3}>No companies available</TableCell>
                            </TableRow>
                        ) : (
                            companies.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.slug}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => router.push(`/admin/companies/${company.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Container>
        </ClientProviders>
    );
};

export default CompaniesPage;