'use client';

import { useQuery } from '@tanstack/react-query';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { ApiSchema } from '@/shared/types/schema';
import { getCompaniesFromStorage, addCompanyToStorage, deleteCompanyFromStorage } from '@/shared/lib/mock-data';

export default function TestPage() {
    const { data: companies, isLoading, error, refetch } = useQuery<ApiSchema.Company[]>({
        queryKey: ['companies'],
        queryFn: async () => {
            return getCompaniesFromStorage();
        },
        staleTime: Infinity,
    });

    const handleClearCache = () => {
        localStorage.removeItem('mockCompanies');
        refetch();
    };

    const handleAddCompany = () => {
        const newCompany: ApiSchema.Company = {
            id: Date.now().toString(),
            name: `New Company ${Date.now()}`,
            description: 'A new test company',
            slug: `new-company-${Date.now()}`,
        };

        addCompanyToStorage(newCompany);
        refetch();
    };

    const handleDeleteCompany = (id: string) => {
        deleteCompanyFromStorage(id);
        refetch();
    };

    const handleRefresh = () => {
        refetch();
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Test Page - Companies Data
            </Typography>
            
            <Box sx={{ mb: 3 }}>
                <Button variant="contained" onClick={handleRefresh} sx={{ mr: 2 }}>
                    Refresh Data
                </Button>
                <Button variant="outlined" onClick={handleClearCache} sx={{ mr: 2 }}>
                    Clear Cache
                </Button>
                <Button variant="outlined" onClick={handleAddCompany}>
                    Add Test Company
                </Button>
            </Box>

            {isLoading && (
                <Typography>Loading companies...</Typography>
            )}

            {error && (
                <Typography color="error">
                    Error: {error instanceof Error ? error.message : 'Unknown error'}
                </Typography>
            )}

            {companies && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Companies ({companies.length}):
                    </Typography>
                    {companies.map((company) => (
                        <Card key={company.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography variant="h6">{company.name}</Typography>
                                        <Typography color="text.secondary">
                                            {company.description}
                                        </Typography>
                                        <Typography variant="body2">
                                            Slug: {company.slug}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteCompany(company.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Debug Info:
                </Typography>
                <Typography variant="body2">
                    LocalStorage data: {localStorage.getItem('mockCompanies') || 'No data'}
                </Typography>
            </Box>
        </Container>
    );
}