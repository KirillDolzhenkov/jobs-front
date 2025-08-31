import { Alert, Container } from '@mui/material';
import React                from 'react';

import Button from '@/shared/ui/Button/Button';

interface JobsErrorProps {
  error: Error | null; // Или unknown, в зависимости от типа
}

const JobsError: React.FC<JobsErrorProps> = ({ error }) => {
  return (
    <Container maxWidth="xl">
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading jobs: {error?.message}
      </Alert>
      <Button variant="outlined" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </Container>
  );
};

export default JobsError;