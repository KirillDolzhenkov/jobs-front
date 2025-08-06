'use client';

import { Button } from '@mui/material';
import { useExtendJob } from '@/features/admin/lib/use-extend-job';

interface ExtendButtonProps {
  jobId: string;
}

export const ExtendButton = ({ jobId }: ExtendButtonProps) => {
  const extendJob = useExtendJob(jobId);

  const handleExtend = () => {
    extendJob.mutate();
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleExtend}
      color="info"
      disabled={extendJob.isLoading}
    >
      {extendJob.isLoading ? 'Extending...' : 'Extend'}
    </Button>
  );
};