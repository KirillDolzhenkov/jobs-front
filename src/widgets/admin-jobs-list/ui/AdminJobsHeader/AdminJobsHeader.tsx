'use client';

import CustomButton                                 from '@/shared/ui/Button';
import React                                        from 'react';
import { useRouter }                                from 'next/navigation';
import { Paper, Box, Typography, Button, useTheme } from '@mui/material';
import { Add as AddIcon }                           from '@mui/icons-material';

const AdminJobsHeader = () => {
  const router = useRouter();
  const theme  = useTheme();
  return (
    <Paper
      elevation={1}
      sx={{
        p:          3,
        mb:         4,
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
      }}
    >
      <Box
        sx={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          flexWrap:       'wrap',
          gap:            2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color:      'white',
              fontWeight: 'bold',
            }}
          >Jobs Management</Typography>
          <Typography
            variant="body1"
            sx={{
              color:   'white',
              opacity: 0.9,
              mt:      0.5,
            }}
          >Manage your job postings, track performance, and update listings</Typography>
        </Box>
        <CustomButton
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/jobs/new')}
          /* sx={{
           bgcolor:   'white',
           color:     '#667eea',
           '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
           }} */
        >
          Create New Job
        </CustomButton>
      </Box>
    </Paper>
  );
};

export default AdminJobsHeader;