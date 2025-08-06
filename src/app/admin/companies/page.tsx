'use client';

import { useState }        from 'react';
import { useRouter }       from 'next/navigation';
import { NextPage }        from 'next';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
}                          from '@mui/material';

import ClientProviders     from '@/features/admin/components/ClientProviders';
import { useGetCompanies } from '@/features/admin/lib/use-get-companies';
import CustomButton        from '@/shared/ui/CustomButton/CustomButton';

const CompaniesPage: NextPage = () => {
  const router          = useRouter();
  const [page, setPage] = useState(1);
  const limit           = 10;
  const {
          data,
          isLoading,
          error,
        }               = useGetCompanies(page, limit);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

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
        <Typography variant="h5">Error loading companies: {error.message}</Typography>
      </Container>
    );
  }

  const companies  = data?.data || [];
  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;

  return (
    <ClientProviders>
      <Container>
        <Typography variant="h4" gutterBottom>
          Companies
        </Typography>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => router.push('/admin/companies/new')}
          sx={{ mb: 2 }}
        >
          Create New Company
        </CustomButton>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Slug</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Actions</Typography>
              </TableCell>
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
                    <CustomButton
                      variant="outlined"
                      size="small"
                      onClick={() => router.push(`/admin/companies/${company.slug}`)}
                    >
                      Edit
                    </CustomButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              mt:             2,
              display:        'flex',
              justifyContent: 'center',
            }}
          />
        )}
      </Container>
    </ClientProviders>
  );
};

export default CompaniesPage;