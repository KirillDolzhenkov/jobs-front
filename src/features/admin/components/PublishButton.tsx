'use client';

import { Button } from '@mui/material';
import { usePublishJob } from '@/features/admin/lib/use-publish-job';
import { useRouter } from 'next/navigation';

interface PublishButtonProps {
  jobId: string;
}

export const PublishButton = ({ jobId }: PublishButtonProps) => {
  const router = useRouter();
  const publishJob = usePublishJob(jobId);

  const handlePublish = () => {
    publishJob.mutate();
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handlePublish}
      color="success"
      disabled={publishJob.isLoading}
    >
      {publishJob.isLoading ? 'Publishing...' : 'Publish'}
    </Button>
  );
};