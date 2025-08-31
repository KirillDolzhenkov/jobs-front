import { Avatar, Box, IconButton, Typography }                from '@mui/material';
import { Business as BusinessIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Job }                                                from '@/shared/lib/types/schema';

interface JobHeaderProps {
  job: Job;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const headerContainerStyles = {
  display:    'flex',
  alignItems: 'flex-start',
  mb:         2,
};

const avatarStyles = {
  mr:      2,
  width:   48,
  height:  48,
  bgcolor: 'primary.main',
};

const titleStyles = {
  fontWeight:      'bold',
  lineHeight:      1.2,
  mb:              0.5,
  display:         '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow:        'hidden',
};

const JobHeader: React.FC<JobHeaderProps> = ({
  job,
  onMenuOpen,
}) => {
  return (
    <Box sx={headerContainerStyles}>
      <Avatar src={job.logoUrl} sx={avatarStyles}>
        <BusinessIcon />
      </Avatar>
      <Box flexGrow={1} minWidth={0}>
        <Typography variant="h6" component="h3" sx={titleStyles}>
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {job.companyName || 'Company not specified'}
        </Typography>
      </Box>
      <IconButton size="small" onClick={onMenuOpen}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

export default JobHeader;