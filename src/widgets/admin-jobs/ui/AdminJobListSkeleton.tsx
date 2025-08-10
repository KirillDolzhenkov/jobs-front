'use client'

import React from 'react';
import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';

const AdminJobListSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  gap:     1,
                  mt:      2,
                }}
              >
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminJobListSkeleton;