'use client';

import React                         from 'react';
import { Grid, Card, Box, Skeleton } from '@mui/material';

const JobListSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                gap:     2,
              }}
            >
              <Skeleton variant="circular" width={56} height={56} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={28} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mt: 0.5 }} />
                <Box
                  sx={{
                    display: 'flex',
                    gap:     1,
                    mt:      2,
                  }}
                >
                  <Skeleton variant="rounded" width={80} height={24} />
                  <Skeleton variant="rounded" width={100} height={24} />
                </Box>
                <Skeleton variant="text" width="80%" height={16} sx={{ mt: 1 }} />
              </Box>
              <Skeleton variant="rectangular" width={100} height={36} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobListSkeleton;