'use client';

import { useExtendJob } from '@/features/admin/lib/use-extend-job';
import CustomButton     from '@/shared/ui/CustomButton/CustomButton';
import { ButtonProps }  from '@mui/material';

interface ExtendButtonProps {
  jobId: string;
  sx?: ButtonProps['sx'];
}

export const ExtendButton = ({
  jobId,
  sx,
}: ExtendButtonProps) => {
  const {
          mutate,
          isPending,
        } = useExtendJob(jobId);

  const handleExtend = () => {
    mutate();
  };

  return (
    <CustomButton
      sx={sx}
      variant="contained"
      size="small"
      onClick={handleExtend}
      disabled={isPending}
    >
      {isPending ? 'Extending...' : 'Extend'}
    </CustomButton>
  );
};