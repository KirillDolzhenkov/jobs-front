'use client';

import { Button } from '@mui/material';
import { useArchiveJob } from '@/features/admin/lib/use-archive-job';

interface ArchiveButtonProps {
  jobId: string;
}

export const ArchiveButton = ({ jobId }: ArchiveButtonProps) => {
  const archiveJob = useArchiveJob(jobId);

  const handleArchive = () => {
    archiveJob.mutate();
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleArchive}
      color="warning"
      disabled={archiveJob.isLoading}
    >
      {archiveJob.isLoading ? 'Archiving...' : 'Archive'}
    </Button>
  );
};