'use client';

import {useState, useEffect, use} from 'react';
import {Container, Typography, Button} from '@mui/material';
import {useGetCompanyById} from '@/features/admin/lib/use-get-company-by-id';
import {ApiSchema} from '@/shared/types/schema';
import {useRouter} from 'next/navigation';


const CompanyDetailsPage = ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = use(params);
    const router = useRouter();

    const {data: company, isLoading, isError} = useGetCompanyById(id);

    const [companyData, setCompanyData] = useState<ApiSchema.Company | null>(null);

    useEffect(() => {
        if (company) {
            setCompanyData(company);
        } else {
            const storedCompanies = JSON.parse(localStorage.getItem('mockCompanies') || '[]');
            const storedCompany = storedCompanies.find((c: ApiSchema.Company) => c.id === id);
            if (storedCompany) {
                setCompanyData(storedCompany);
            }
        }
    }, [company, id]);

    const handleEdit = () => {
        router.push(`/admin/companies/${id}/edit`);
    };

    if (isLoading) {
        return (
            <Container>
                <Typography variant="h5">Loading...</Typography>
            </Container>
        );
    }

    if (isError || !companyData) {
        return (
            <Container>
                <Typography variant="h5">Company not found</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {companyData.name}
            </Typography>
            <Typography variant="body1">Slug: {companyData.slug}</Typography>
            <Typography variant="body1">Description: {companyData.description || 'No description'}</Typography>
            {companyData.logoUrl && (
                <img
                    src={companyData.logoUrl}
                    alt={`${companyData.name} Logo`}
                    style={{maxWidth: '200px', marginTop: '16px'}}
                />
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                sx={{mt: 2}}
            >
                Edit Company
            </Button>
        </Container>
    );
};

export default CompanyDetailsPage;