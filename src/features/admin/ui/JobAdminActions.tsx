import { FC } from 'react';

import { ArchiveButton } from '@/features/admin/ui/ArchiveButton';
import { ExtendButton }  from '@/features/admin/ui/ExtendButton';
import { PublishButton } from '@/features/admin/ui/PublishButton';

interface JobAdminActionsProps {
  jobId: string;
}

const JobAdminActions: FC<JobAdminActionsProps> = ({ jobId }) => {
  return (
    <>
      <PublishButton jobId={jobId} size="small" variant="outlined" fullWidth />
      <ArchiveButton jobId={jobId} size="small" />
      <ExtendButton jobId={jobId} size="small" />
    </>
  );
};

export default JobAdminActions;