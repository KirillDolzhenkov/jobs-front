import { Fade, Grid, Theme } from '@mui/material';
import React                 from 'react';

import JobCard from '@/entities/job/ui/JobCard/JobCard';
import { Job } from '@/shared/lib/types/schema';

interface JobsGridProps {
  jobs: Job[];
  theme: Theme; // Для доступа к theme, если нужно; иначе убрать
}

const JobsGrid: React.FC<JobsGridProps> = ({ jobs }) => {
  return (
    <Fade in timeout={500}>
      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item xs={12} key={job.id}>
            <Fade in timeout={300 + index * 100}>
              <div>
                <JobCard job={job} index={index} />
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

export default JobsGrid;