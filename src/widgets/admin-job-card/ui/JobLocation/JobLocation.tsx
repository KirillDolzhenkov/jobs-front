import { Box, Chip, Typography }      from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import { Job }                        from '@/shared/lib/types/schema';

const locationContainerStyles = {
  display:    'flex',
  alignItems: 'center',
  gap:        1,
  mb:         2,
};

const JobLocation: React.FC<{job: Job}> = ({ job }) => {
  return (
    <Box sx={locationContainerStyles}>
      <LocationIcon fontSize="small" color="action" />
      <Typography variant="body2" color="text.secondary" noWrap>
        {job.location}
      </Typography>
      {job.isRemote && <Chip label="Remote" size="small" color="success" variant="outlined" />}
    </Box>
  );
};

export default JobLocation;