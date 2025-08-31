import { Box, Chip, Stack, Typography }                               from '@mui/material';
import { CalendarToday as CalendarIcon, AccessTime as TimeIcon }      from '@mui/icons-material';
import { formatDate, getDaysUntilExpiration, getExpirationChipColor } from '@/shared/lib/formatters/job-formatters';
import { Job }                                                        from '@/shared/lib/types/schema';
import React                                                          from 'react';

const JobDates: React.FC<{job: Job}> = ({ job }) => {
  return (
    <Box mb={2}>
      <Stack direction="row" spacing={1} alignItems="center" mb="1">
        <CalendarIcon fontSize="small" color="action" />
        <Typography variant="caption" color="text.secondary">
          Posted: {formatDate(job.postedAt)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <TimeIcon fontSize="small" color="action" />
        <Typography variant="caption" color="text.secondary">
          Expires: {formatDate(job.expireAt)}
        </Typography>
        <Chip
          label={`${getDaysUntilExpiration(job.expireAt)} days left`}
          size="small"
          color={getExpirationChipColor(job.expireAt)}
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default JobDates;