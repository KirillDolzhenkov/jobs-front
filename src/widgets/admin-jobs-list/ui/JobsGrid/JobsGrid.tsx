import { Grid } from '@mui/material';
import React    from 'react';

import AdminJobCard from '@/widgets/admin-job-card';
import { Job }      from '@/shared/lib/types/schema';

interface JobsGridProps {
  jobs: Job[];
}

const JobsGrid: React.FC<JobsGridProps> = ({ jobs }) => {
  return (
    <Grid container spacing={3}>
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} lg={4} key={job.id}>
          <AdminJobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobsGrid;