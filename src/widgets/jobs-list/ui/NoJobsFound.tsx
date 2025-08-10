'use client';

import Button from '@/shared/ui/Button/Button';
import React  from 'react';
import { Paper, Typography } from '@mui/material';
import { Work as WorkIcon }  from '@mui/icons-material';

interface NoJobsFoundProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const NoJobsFound: React.FC<NoJobsFoundProps> = ({
  searchTerm,
  onClearSearch,
}) => {
  return (
    <Paper
      sx={{
        p:         6,
        textAlign: 'center',
      }}
    >
      <WorkIcon
        sx={{
          fontSize: 80,
          color:    'text.secondary',
          mb:       2,
        }}
      />
      <Typography variant="h5" color="text.secondary" gutterBottom>
        No jobs found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {searchTerm
          ? 'Try adjusting your search terms or browse all available positions'
          : 'Check back soon for new opportunities!'}
      </Typography>
      {searchTerm && (
        <Button variant="outlined" onClick={onClearSearch}>
          View All Jobs
        </Button>
      )}
    </Paper>
  );
};

export default NoJobsFound;