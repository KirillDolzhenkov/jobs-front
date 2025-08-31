/*
'use client';


import React, { useState }                         from 'react';
import { Container, Grid, Box, Alert, Pagination } from '@mui/material';
import { useGetJobs }                              from '@/features/admin/lib/use-get-jobs';

import AdminJobSearchBar    from '@/features/job-search/ui/AdminJobSearchBar/AdminJobSearchBar';
import { Job }              from '@/shared/lib/types/schema';
import AdminJobListSkeleton from '@/widgets/admin-jobs/ui/AdminJobListSkeleton';
import AdminNoJobsFound     from '@/widgets/admin-jobs/ui/AdminNoJobsFound';
import Button               from '@/shared/ui/Button/Button';
import AdminJobCard         from '@/widgets/admin-job-card';

const AdminJobsList = () => {
  const [page, setPage]             = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit                       = 12;

  const {
          data,
          isLoading,
          error,
        } = useGetJobs(page, limit); /!* as {data?: JobsResponse; isLoading: boolean; error?: Error}; *!/

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = data?.data?.filter((job: Job) =>
    job.title.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (job.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
  ) || [];

  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;
  const total      = data?.meta?.total || 0;

  if (isLoading) {
    return <Container maxWidth="xl"><AdminJobListSkeleton /></Container>;
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Alert severity="error" sx={{ mb: 3 }}>Error loading jobs: {error.message}</Alert>
        <Button variant="outlined" onClick={() => window.location.reload()}>Retry</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <AdminJobSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {filteredJobs.length === 0 ? (
        <AdminNoJobsFound searchTerm={searchTerm} />
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredJobs.map((job: Job) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={job.id}
              >
                <AdminJobCard job={job} />
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box
              sx={{
                display:        'flex',
                justifyContent: 'center',
                mt:             4,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminJobsList;*/
