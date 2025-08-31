/*
'use client';

import JobCard                                                     from '@/entities/job/ui/JobCard/JobCard';
import JobSearchBar
                                                                   from '@/features/job-search/ui/JobSearchBar/JobSearchBar';
import { Job }                                                     from '@/shared/lib/types/schema';
import JobListSkeleton
                                                                   from '@/widgets/jobs-list/ui/JobListSkeleton/JobListSkeleton';
import NoJobsFound
                                                                   from '@/widgets/jobs-list/ui/NoJobsFound/NoJobsFound';
import ResultsHeader
                                                                   from '@/widgets/jobs-list/ui/ResultsHeader/ResultsHeader';
import React, { useState }                                         from 'react';
import { Container, Grid, Box, Alert, Pagination, Fade, useTheme } from '@mui/material';
import { useGetJobs }                                              from '@/features/admin/lib/use-get-jobs';

const JobList = () => {
  const theme                       = useTheme();
  const [page, setPage]             = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit                       = 10;

  const {
          data,
          isLoading,
          error,
        } = useGetJobs(page, limit) /!* as {data?: JobsResponse; isLoading: boolean; error?: Error} *!/;

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
    (job.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (job.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
  ) || [];

  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;
  const totalJobs  = data?.meta?.total || 0;

  if (isLoading) {
    return <Container maxWidth="lg" sx={{ py: 4 }}><JobListSkeleton /></Container>;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>Error loading jobs: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <JobSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <ResultsHeader searchTerm={searchTerm} filteredJobs={filteredJobs} totalJobs={totalJobs} />
      {filteredJobs.length === 0 ? (
        <NoJobsFound searchTerm={searchTerm} onClearSearch={() => setSearchTerm('')} />
      ) : (
        <Fade in timeout={500}>
          <Grid container spacing={2}>
            {filteredJobs.map((job: Job, index: number) => (
              <Grid item xs={12} key={job.id}>
                <Fade in timeout={300 + index * 100}>
                  <div><JobCard job={job} index={index} /></div>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}
      {totalPages > 1 && (
        <Box
          sx={{
            display:        'flex',
            justifyContent: 'center',
            mt:             6,
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
            sx={{ '& .MuiPaginationItem-root': { borderRadius: 2 } }}
          />
        </Box>
      )}
    </Container>
  );
};

export default JobList;*/
