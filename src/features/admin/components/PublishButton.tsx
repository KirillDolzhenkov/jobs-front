'use client';

import { usePublishJob } from '@/features/admin/lib/use-publish-job';
import Button            from '@/shared/ui/Button/Button';
import { ButtonProps }   from '@mui/material';

interface PublishButtonProps extends ButtonProps {
  jobId: string;
}


export const PublishButton = ({
  jobId,
  ...props
}: PublishButtonProps) => {
  const {
          mutate,
          isPending,
        } = usePublishJob(jobId);

  const handlePublish = () => {
    mutate();
  };

  return (
    <Button
      {...props}
      variant="contained"
      size="small"
      onClick={handlePublish}
      disabled={isPending}
    >
      {isPending ? 'Publishing...' : 'Publish'}
    </Button>
  );
};