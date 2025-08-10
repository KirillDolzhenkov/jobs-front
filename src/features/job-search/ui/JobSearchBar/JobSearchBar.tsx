'use client';

import React                                from 'react';
import { Paper, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon }             from '@mui/icons-material';

interface JobSearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p:            3,
        mb:           4,
        background:   'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
        border:       '1px solid',
        borderColor:  'primary.light',
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search for jobs, companies, or locations..."
        value={searchTerm}
        onChange={onSearchChange}
        variant="outlined"
        size="large"
        InputProps={{
          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon color="primary" />
                            </InputAdornment>
                          ),
          sx:             {
            bgcolor:                                          'white',
            borderRadius:                                     2,
            '& .MuiOutlinedInput-notchedOutline':             { borderColor: 'transparent' },
            '&:hover .MuiOutlinedInput-notchedOutline':       { borderColor: 'primary.main' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
          },
        }}
      />
    </Paper>
  );
};

export default JobSearchBar;