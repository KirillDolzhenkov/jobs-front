'use client';

import { Job }                      from '@/shared/lib/types/schema';
import React                        from 'react';
import Link    from 'next/link';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
}              from '@mui/material';
import {
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon, // Assuming you have this or replace
  Star as StarIcon,
  East as EastIcon,
}                                   from '@mui/icons-material';
import { formatSalary, formatDate } from '@/shared/lib/formatters/job-formatters';

// import styles from './JobCard.module.css'; // If needed

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  index,
}) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      component={Link}
      href={`/${job.slug}`}
      sx={{
        textDecoration: 'none',
        transition:     'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor:         'pointer',
        '&:hover':      {
          transform:         'translateY(-2px)',
          /* boxShadow:         theme.shadows[8], */
          /* '& .job-arrow':    { transform: 'translateX(4px)' }, */
          /* '& .company-logo': { transform: 'scale(1.05)' }, */
        },
      }}
    >
      <CardContent
        sx={{
          marginTop:    2,
          p:            3,
          borderRadius: '4px',
          boxShadow:    '0 1px 3px rgba(0, 0, 0, 0.1)',
          '&:hover':    { boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' },
        }}
      >
        <Box
          sx={{
            display:    'flex',
            gap:        2,
            alignItems: 'flex-start',
          }}
        >
          <Avatar
            src={job.logoUrl}
            className="company-logo"
            sx={{
              width:       56,
              height:      56,
              bgcolor:     'primary.main',
              transition:  'transform 0.3s ease',
              border:      '2px solid',
              borderColor: 'grey.100',
            }}
          >
            <BusinessIcon />
          </Avatar>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display:        'flex',
                alignItems:     'flex-start',
                justifyContent: 'space-between',
                mb:             1,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color:      'text.primary',
                  mr:         2,
                }}
              >
                {job.title}
              </Typography>
              {!isMobile && (
                <IconButton
                  className="job-arrow"
                  size="small"
                  sx={{
                    bgcolor:    'primary.main',
                    color:      'white',
                    transition: 'transform 0.3s ease',
                    '&:hover':  { bgcolor: 'primary.dark' },
                  }}
                >
                  <EastIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb:         2,
                fontWeight: 500,
              }}
            >
              {job.companyName || 'Company not specified'}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              <Chip
                icon={<LocationIcon />}
                label={job.location}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 1.5 }}
              />
              {job.isRemote && (
                <Chip label="Remote" size="small" color="success" variant="filled" sx={{ borderRadius: 1.5 }} />
              )}
              {formatSalary(job.salaryMin, job.salaryMax) && (
                <Chip
                  icon={<MoneyIcon />}
                  label={formatSalary(job.salaryMin, job.salaryMax)}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
              )}
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display:         '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow:        'hidden',
                lineHeight:      1.5,
                mb:              2,
              }}
            >
              {job.description}
            </Typography>
            <Box
              sx={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        2,
                }}
              >
                <Box
                  sx={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        0.5,
                  }}
                >
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(job.postedAt)}
                  </Typography>
                </Box>
                {Math.random() > 0.5 && (
                  <Chip
                    icon={<StarIcon />}
                    label="Hot"
                    size="small"
                    color="warning"
                    variant="filled"
                    sx={{
                      borderRadius: 1.5,
                      fontSize:     '0.7rem',
                      height:       20,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>View Details →</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;