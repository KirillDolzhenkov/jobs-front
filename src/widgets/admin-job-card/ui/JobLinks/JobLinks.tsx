import { IconButton, Stack, Tooltip } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import { Job }              from '@/shared/lib/types/schema';

const linksContainerStyles = {
  direction: 'row',
  spacing:   1,
  mb:        2,
};

const buttonStyles = {
  bgcolor:   'success.main',
  color:     'white',
  '&:hover': { bgcolor: 'success.dark' },
};

const JobLinks: React.FC<{job: Job}> = ({ job }) => {
  if (!job.applyUrl) {
    return null;
  }

  return (
    <Stack sx={linksContainerStyles}>
      <Tooltip title="View Application Link">
        <IconButton
          size="small"
          component="a"
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={buttonStyles}
        >
          <LinkIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default JobLinks;