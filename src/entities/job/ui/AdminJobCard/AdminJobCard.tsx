'use client';

import { Job } from '@/shared/lib/types/schema';
import React   from 'react';
import Link    from 'next/link';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Stack,
  Divider,
  Tooltip,
  IconButton,
}              from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon, Link as LinkIcon,
}              from '@mui/icons-material';
import {
  formatSalary,
  formatDate,
  getDaysUntilExpiration,
  getExpirationChipColor,
}              from '@/shared/lib/formatters/job-formatters';
import {
  PublishButton,
}              from '@/features/admin/components/PublishButton';
import {
  ArchiveButton,
}              from '@/features/admin/components/ArchiveButton';
import {
  ExtendButton,
}              from '@/features/admin/components/ExtendButton';

interface AdminJobCardProps {
  job: Job;
}

const AdminJobCard: React.FC<AdminJobCardProps> = ({ job }) => {
  return (
    <Card
      sx={{
        height:        '100%',
        display:       'flex',
        flexDirection: 'column',
        transition:    'all 0.3s ease-in-out',
        '&:hover':     {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          pb:       1,
        }}
      >
        <Box
          sx={{
            display:    'flex',
            alignItems: 'flex-start',
            mb:         2,
          }}
        >
          <Avatar
            src={job.logoUrl}
            sx={{
              mr:      2,
              width:   48,
              height:  48,
              bgcolor: 'primary.main',
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
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight:      'bold',
                lineHeight:      1.2,
                mb:              0.5,
                display:         '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow:        'hidden',
              }}
            >
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {job.companyName || 'Company not specified'}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display:    'flex',
            alignItems: 'center',
            gap:        1,
            mb:         2,
          }}
        >
          <LocationIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" noWrap>{job.location}</Typography>
          {job.isRemote && <Chip label="Remote" size="small" color="success" variant="outlined" />}
        </Box>
        <Box
          sx={{
            display:    'flex',
            alignItems: 'center',
            mb:         2,
          }}
        >
          <MoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">{formatSalary(job.salaryMin, job.salaryMax)}</Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb:              2,
            display:         '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow:        'hidden',
            minHeight:       '3.6em',
          }}
        >
          {job.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <CalendarIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">Posted: {formatDate(job.postedAt)}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <TimeIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">Expires: {formatDate(job.expireAt)}</Typography>
            <Chip
              label={`${getDaysUntilExpiration(job.expireAt)} days left`}
              size="small"
              color={getExpirationChipColor(job.expireAt)}
              variant="outlined"
            />
          </Stack>
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          p:  2,
          pt: 1.5,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Link href={`/admin/jobs/${job.slug}`} style={{ textDecoration: 'none' }}>
            <Tooltip title="Edit Job">
              <IconButton
                size="small"
                sx={{
                  bgcolor:   'primary.main',
                  color:     'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Link>
          {job.applyUrl && (
            <Tooltip title="View Application Link">
              <IconButton
                size="small"
                component="a"
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor:   'success.main',
                  color:     'white',
                  '&:hover': { bgcolor: 'success.dark' },
                }}
              >
                <LinkIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        {/* <Stack direction="row" spacing={1} justifyContent="flex-start">
          <PublishButton jobId={job.id} size="small" />
          <ArchiveButton jobId={job.id} size="small" />
          <ExtendButton jobId={job.id} size="small" />
        </Stack> */}
      </Box>
    </Card>
  );
};

export default AdminJobCard;