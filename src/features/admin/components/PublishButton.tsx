'use client';

import { usePublishJob } from '@/features/admin/lib/use-publish-job';
import CustomButton      from '@/shared/ui/CustomButton/CustomButton';
import { ButtonProps }   from '@mui/material';

interface PublishButtonProps {
  jobId: string;
  sx?: ButtonProps['sx'];
}

export const PublishButton = ({
  jobId,
  sx,
}: PublishButtonProps) => {
  const {
          mutate,
          isPending,
        } = usePublishJob(jobId);

  const handlePublish = () => {
    mutate();
  };

  return (
    <CustomButton
      sx={sx}
      variant="contained"
      size="small"
      onClick={handlePublish}
      disabled={isPending}
    >
      {isPending ? 'Publishing...' : 'Publish'}
    </CustomButton>
  );
};