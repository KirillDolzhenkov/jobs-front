import { Container }        from '@mui/material';
import AdminJobListSkeleton from '@/widgets/admin-jobs-list/ui/AdminJobListSkeleton/AdminJobListSkeleton';

const JobsLoading = () => {
  return (
    <Container maxWidth="xl">
      <AdminJobListSkeleton />
    </Container>
  );
};

export default JobsLoading;