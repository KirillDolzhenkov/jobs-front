'use client';

import { JobList } from '@/features/public/components/JobList';
import { Typography, Box, Button } from '@mui/material';
import styles from './page.module.css';

export default function JobsPage() {
  return (
    <main className={styles.main}>
      <Box className={styles.header}>
        <Typography variant="h3" component="h1" className={styles.title}>
          Remote Tech Jobs
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Discover top-tier remote tech jobs from leading industries worldwide.
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '1rem' }}>
          <Button variant="contained" color="primary" className={styles.postJobButton}>
            Post a Job
          </Button>
        </Box>
      </Box>
      <JobList />
    </main>
  );
}