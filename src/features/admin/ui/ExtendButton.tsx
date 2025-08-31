'use client';

import { useExtendJob } from '@/features/admin/lib/use-extend-job';
import Button           from '@/shared/ui/Button/Button';
import { ButtonProps }  from '@mui/material';

interface ExtendButtonProps extends ButtonProps {
  jobId: string;
}

export const ExtendButton = ({
  jobId,
  ...props
}: ExtendButtonProps) => {
  const {
          mutate,
          isPending,
        } = useExtendJob(jobId);

  const handleExtend = () => {
    mutate();
  };

  return (
    <Button
      {...props}
      onClick={handleExtend}
      disabled={isPending}
    >
      {isPending ? 'Extending...' : 'Extend'}
    </Button>
  );
};