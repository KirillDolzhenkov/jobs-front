import { Typography } from '@mui/material';
import { Job }        from '@/shared/lib/types/schema';

const descriptionStyles = {
  mb:              2,
  display:         '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow:        'hidden',
  minHeight:       '3.6em',
};

const JobDescription: React.FC<{job: Job}> = ({ job }) => {
  return (
    <Typography variant="body2" color="text.secondary" sx={descriptionStyles}>
      {job.description}
    </Typography>
  );
};

export default JobDescription;