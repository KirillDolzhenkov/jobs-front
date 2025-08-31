'use client';

import { Job }                                    from '@/shared/lib/types/schema';
import { Box, Card, CardContent, Divider, Stack } from '@mui/material';
import { useRouter }                              from 'next/navigation';
import React, { useState }                        from 'react';

import JobHeader       from '@/widgets/admin-job-card/ui/JobHeader/JobHeader';
import JobAdminActions from '@/features/admin/ui/JobAdminActions';
import JobAdminMenu    from '@/features/admin/ui/JobAdminMenu';

import { JobDates, JobDescription, JobLinks, JobLocation, JobSalary } from './ui';

interface AdminJobCardProps {
  job: Job;
}

const cardStyles = {
  height:        '100%',
  display:       'flex',
  flexDirection: 'column',
  transition:    'all 0.3s ease-in-out',
  '&:hover':     {
    transform: 'translateY(-4px)',
    boxShadow: 4,
  },
};

const contentStyles = {
  flexGrow: 1,
  pb:       1,
};

const actionsContainerStyles = {
  p:  2,
  pt: 1.5,
};

const AdminJobCard: React.FC<AdminJobCardProps> = ({ job }) => {
  const router                  = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push(`/admin/jobs/edit/${job.slug}`);
    handleMenuClose();
  };

  const handleView = () => {
    router.push(`/${job.slug}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Implement delete logic here
    handleMenuClose();
  };

  return (
    <>
      <Card sx={cardStyles}>
        <CardContent sx={contentStyles}>
          <JobHeader
            job={job}
            onMenuOpen={handleMenuOpen}
          />
          <JobLocation job={job} />
          <JobSalary job={job} />
          <JobDescription job={job} />
          <JobDates job={job} />
        </CardContent>
        <Divider />
        <Box sx={actionsContainerStyles}>
          <JobLinks job={job} />
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
          >
            <JobAdminActions jobId={job.id} />
          </Stack>
        </Box>
      </Card>
      <JobAdminMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </>
  );
};

export default AdminJobCard;