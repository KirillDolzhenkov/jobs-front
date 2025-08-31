'use client';

import { Box } from '@mui/material';
import React   from 'react';

import { JobsList, JobsHero } from '@/widgets';

export default function JobsPage() {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor:   'grey.50',
      }}
    >
      <JobsHero />
      <JobsList />
    </Box>
  );
}