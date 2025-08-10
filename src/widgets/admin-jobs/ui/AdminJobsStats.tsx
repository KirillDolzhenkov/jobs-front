'use client'

import { useGetJobs }              from '@/features/admin/lib/use-get-jobs';
import { Job }                     from '@/shared/lib/types/schema';
import React, { useState }         from 'react';
import { Grid, Paper, Typography } from '@mui/material';
/* import { Job }                     from '@/entities/job/model/types'; */
import { getDaysUntilExpiration }  from '@/shared/lib/formatters/job-formatters';

interface AdminJobsStatsProps {
/*   total: number;
  filteredJobs: Job[]; */
}

const AdminJobsStats: React.FC<AdminJobsStatsProps> = () => {
  const [page, setPage]             = useState(1);
   const [searchTerm, setSearchTerm] = useState('');
   const limit                       = 12;
   const {
   data,
   isLoading,
   error,
   }                           = useGetJobs(page, limit);

  const filteredJobs = data?.data?.filter(()=>{}) || [];
  const total        = data?.meta?.total || 0;

  const active   = filteredJobs.filter(job => getDaysUntilExpiration(job.expireAt) > 7).length;
  const expiring = filteredJobs.filter(job => {
    const days = getDaysUntilExpiration(job.expireAt);
    return days > 0 && days <= 7;
  }).length;
  const remote   = filteredJobs.filter(job => job.isRemote).length;

  return (
    <Grid container spacing={3} sx={{ mb: 4 }} >
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p:         2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="primary" fontWeight="bold">{total}</Typography>
          <Typography variant="body2" color="text.secondary">Total Jobs</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p:         2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="success.main" fontWeight="bold">{active}</Typography>
          <Typography variant="body2" color="text.secondary">Active Jobs</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p:         2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="warning.main" fontWeight="bold">{expiring}</Typography>
          <Typography variant="body2" color="text.secondary">Expiring Soon</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p:         2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="info.main" fontWeight="bold">{remote}</Typography>
          <Typography variant="body2" color="text.secondary">Remote Jobs</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminJobsStats;