'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import ClientProviders from '@/features/admin/components/ClientProviders';
import { useGetJobs } from '@/features/admin/lib/use-get-jobs';
import { PublishButton } from '@/features/admin/components/PublishButton';
import { ArchiveButton } from '@/features/admin/components/ArchiveButton';
import { ExtendButton } from '@/features/admin/components/ExtendButton';

const JobsPage: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useGetJobs(page, limit);

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
        <Typography variant="h5">Error loading jobs: {error.message}</Typography>
      </Container>
    );
  }

  const jobs = data?.data || [];
  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;

  return (
    <ClientProviders>
      <Container>
        <Typography variant="h4" gutterBottom>
          Jobs
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/admin/jobs/new')} sx={{ mb: 2 }}>
          Create New Job
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No jobs available</TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.slug}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => router.push(`/admin/jobs/${job.id}`)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <PublishButton jobId={job.id} />
                    <ArchiveButton jobId={job.id} sx={{ ml: 1 }} />
                    <ExtendButton jobId={job.id} sx={{ ml: 1 }} />
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
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        )}
      </Container>
    </ClientProviders>
  );
};

export default JobsPage;