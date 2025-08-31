import { Alert, Container } from '@mui/material';
import React                from 'react';

interface JobsErrorProps {
  error: Error | null;
}

const containerStyles = { py: 4 };

const JobsError: React.FC<JobsErrorProps> = ({ error }) => {
  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading jobs: {error?.message}
      </Alert>
    </Container>
  );
};

export default JobsError;