'use client';

import { useArchiveJob } from '@/features/admin/lib/use-archive-job';
import CustomButton      from '@/shared/ui/CustomButton/CustomButton';
import { ButtonProps }   from '@mui/material';

interface ArchiveButtonProps {
  jobId: string;
  sx?: ButtonProps['sx'];
}

export const ArchiveButton = ({
  jobId,
  sx,
}: ArchiveButtonProps) => {
  const {
          mutate,
          isPending,
        } = useArchiveJob(jobId);

  const handleArchive = () => {
    mutate();
  };

  return (
    <CustomButton
      sx={sx}
      variant="contained"
      size="small"
      onClick={handleArchive}
      disabled={isPending}
    >
      {isPending ? 'Archiving...' : 'Archive'}
    </CustomButton>
  );
};