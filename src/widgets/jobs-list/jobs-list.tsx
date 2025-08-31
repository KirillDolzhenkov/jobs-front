'use client';

import React, { useMemo, useState } from 'react';
import { Container, useTheme }      from '@mui/material';

import { useGetJobs } from '@/features/admin/lib/use-get-jobs'; // Или из job-list
import JobSearchBar   from '@/features/job-search/ui/JobSearchBar/JobSearchBar';
import { Job }        from '@/shared/lib/types/schema';

import { JobsError, JobsGrid, JobsLoading, JobsPagination, NoJobsFound, ResultsHeader } from './ui';

const LIMIT = 10;

const containerStyles = { py: 4 };

const JobList = () => {
  const theme                       = useTheme();
  const [page, setPage]             = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const {
          data,
          isLoading,
          error,
        } = useGetJobs(page, LIMIT);

  const filteredJobs = useMemo(() => {
    return data?.data?.filter((job: Job) =>
      job.title.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (job.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (job.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
    ) || [];
  }, [data, searchTerm]);

  const totalPages = data?.meta ? Math.ceil(data.meta.total / LIMIT) : 1;
  const totalJobs  = data?.meta?.total || 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (isLoading) {
    return <JobsLoading />;
  }

  if (error) {
    return <JobsError error={error} />;
  }

  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <JobSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <ResultsHeader searchTerm={searchTerm} filteredJobs={filteredJobs} totalJobs={totalJobs} />
      {
        filteredJobs.length === 0
          ? (
            <NoJobsFound searchTerm={searchTerm} onClearSearch={handleClearSearch} />
          )
          : (
            <>
              <JobsGrid jobs={filteredJobs} theme={theme} />
              {totalPages > 1 && (
                <JobsPagination
                  totalPages={totalPages}
                  page={page}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )
      }
    </Container>
  );
};

export default JobList;