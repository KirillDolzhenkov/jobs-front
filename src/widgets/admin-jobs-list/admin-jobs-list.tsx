'use client';

import { Container }                      from '@mui/material';
import { ChangeEvent, useMemo, useState } from 'react';

import { useGetJobs }    from '@/features/admin/lib/use-get-jobs';
import AdminJobSearchBar from '@/features/job-search/ui/AdminJobSearchBar/AdminJobSearchBar';
import { Job }           from '@/shared/lib/types/schema';

import { AdminNoJobsFound, JobsError, JobsGrid, JobsLoading, JobsPagination } from './ui';

const LIMIT = 12;

const AdminJobsList = () => {
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
      (job.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
    ) || [];
  }, [data, searchTerm]);

  const totalPages = data?.meta ? Math.ceil(data.meta.total / LIMIT) : 1;

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <JobsLoading />;
  }

  if (error) {
    return <JobsError error={error} />;
  }

  return (
    <Container maxWidth="xl">
      <AdminJobSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {
        filteredJobs.length === 0
          ? (
            <AdminNoJobsFound searchTerm={searchTerm} />
          )
          : (
            <>
              <JobsGrid jobs={filteredJobs} />
              {totalPages > 1 && (
                <JobsPagination
                  totalPages={totalPages}
                  page={page}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
    </Container>
  );
};

export default AdminJobsList;