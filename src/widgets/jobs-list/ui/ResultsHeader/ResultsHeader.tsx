'use client';

import React                          from 'react';
import { Box, Typography, Chip }      from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';

import { Job } from '@/shared/lib/types/schema';

interface ResultsHeaderProps {
  searchTerm: string;
  filteredJobs: Job[];
  totalJobs: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  searchTerm,
  filteredJobs,
  totalJobs,
}) => {
  return (
    <Box
      sx={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        mb:             3,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {
          searchTerm
            ? <>Found {filteredJobs.length} jobs matching "{searchTerm}"</>
            : <>{totalJobs} remote tech jobs available</>
        }
      </Typography>
      {!searchTerm && (
        <Chip
          icon={<TrendingIcon />}
          label="Latest"
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 'medium' }}
        />
      )}
    </Box>
  );
};

export default ResultsHeader;