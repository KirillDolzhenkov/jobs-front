'use client';

import { useArchiveJob } from '@/features/admin/lib/use-archive-job';
import Button            from '@/shared/ui/Button/Button';
import { ButtonProps }   from '@mui/material';

interface ArchiveButtonProps extends ButtonProps {
  jobId: string;
}


export const ArchiveButton = ({
  jobId,
  ...props
}: ArchiveButtonProps) => {
  const {
          mutate,
          isPending,
        } = useArchiveJob(jobId);

  const handleArchive = () => {
    mutate();
  };

  return (
    <Button
      {...props}
      variant="contained"
      size="small"
      onClick={handleArchive}
      disabled={isPending}
    >
      {isPending ? 'Archiving...' : 'Archive'}
    </Button>
  );
};