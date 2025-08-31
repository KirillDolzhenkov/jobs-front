import { Box, Pagination } from '@mui/material';
import React               from 'react';

interface JobsPaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const paginationContainerStyles = {
  display:        'flex',
  justifyContent: 'center',
  mt:             4,
};

const JobsPagination: React.FC<JobsPaginationProps> = ({
  totalPages,
  page,
  onPageChange,
}) => {
  return (
    <Box sx={paginationContainerStyles}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default JobsPagination;