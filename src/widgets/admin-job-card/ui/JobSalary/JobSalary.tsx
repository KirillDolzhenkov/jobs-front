import { Box, Typography }          from '@mui/material';
import { AttachMoney as MoneyIcon } from '@mui/icons-material';
import { formatSalary }             from '@/shared/lib/formatters/job-formatters';
import { Job }                      from '@/shared/lib/types/schema';

const salaryContainerStyles = {
  display:    'flex',
  alignItems: 'center',
  mb:         2,
};

const JobSalary: React.FC<{job: Job}> = ({ job }) => {
  return (
    <Box sx={salaryContainerStyles}>
      <MoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {formatSalary(job.salaryMin, job.salaryMax)}
      </Typography>
    </Box>
  );
};

export default JobSalary;