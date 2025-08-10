'use client';

import React from 'react';
import { Paper, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface AdminJobSearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminJobSearchBar: React.FC<AdminJobSearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
      <TextField
        fullWidth
        placeholder="Search jobs by title, location, or company..."
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />
    </Paper>
  );
};

export default AdminJobSearchBar;