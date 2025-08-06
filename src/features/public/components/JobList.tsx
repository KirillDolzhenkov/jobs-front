'use client';

import { useGetJobs }                                                      from '@/features/admin/lib/use-get-jobs';
import { useState }                                                        from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, TextField } from '@mui/material';

import Link from 'next/link';
import styles from './job-list.module.css';

export function JobList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useGetJobs(page, limit);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = data?.data.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress size={40} />
        <Typography variant="body1" className={styles.loadingText}>
          Loading jobs...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" className={styles.errorText}>
        Error loading jobs
      </Typography>
    );
  }

  return (
    <Box>
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Search jobs..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box className={styles.jobList}>
        {filteredJobs?.map((job) => (
          <Link href={`/${job.slug}`} key={job.id} style={{ textDecoration: 'none' }}>
            <Card className={styles.card}>
              <CardContent>
                <Box className={styles.jobHeader}>
                  <Typography variant="h6" className={styles.cardTitle}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className={styles.location}>
                    {job.location || 'No location'}
                  </Typography>
                </Box>
                <Box className={styles.tags}>
                  {job.isRemote && (
                    <Typography variant="caption" className={styles.tag}>
                      remote
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}