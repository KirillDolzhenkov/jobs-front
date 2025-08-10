'use client';

import JobList  from '@/features/job-list/ui/JobList';
import JobsHero from '@/widgets/jobs-hero/ui/JobsHero';
import React    from 'react';
import { Box, useTheme } from '@mui/material';


export default function JobsPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <JobsHero />
      <JobList />
    </Box>
  );
}