import { Container }   from '@mui/material';
import JobListSkeleton from '@/widgets/jobs-list/ui/JobListSkeleton/JobListSkeleton';

const containerStyles = { py: 4 };

const JobsLoading = () => {
  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <JobListSkeleton />
    </Container>
  );
};

export default JobsLoading;