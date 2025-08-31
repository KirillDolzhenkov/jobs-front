'use client';

import React                                from 'react';
import { useRouter }                        from 'next/navigation';
import { Paper, Typography, Button }        from '@mui/material';
import { Work as WorkIcon, Add as AddIcon } from '@mui/icons-material';

interface AdminNoJobsFoundProps {
  searchTerm: string;
}

const AdminNoJobsFound: React.FC<AdminNoJobsFoundProps> = ({ searchTerm }) => {
  const router = useRouter();
  return (
    <Paper
      sx={{
        p:         4,
        textAlign: 'center',
      }}
    >
      <WorkIcon
        sx={{
          fontSize: 64,
          color:    'text.secondary',
          mb:       2,
        }}
      />
      <Typography variant="h6" color="text.secondary" gutterBottom>No jobs found</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {
          searchTerm
            ? 'Try adjusting your search terms'
            : 'Create your first job posting to get started'
        }
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => router.push('/admin/jobs/new')}
      >
        Create New Job
      </Button>
    </Paper>
  );
};

export default AdminNoJobsFound;