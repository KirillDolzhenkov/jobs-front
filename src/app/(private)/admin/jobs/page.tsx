'use client';

import React, { useState } from 'react';
import Link                from 'next/link';
import { useRouter }       from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Alert,
  Pagination,
  Stack,
  Divider,
  Tooltip,
  Badge,
}                          from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Link as LinkIcon,

  Work as WorkIcon,
}                          from '@mui/icons-material';
import CustomButton        from '@/shared/ui/CustomButton/CustomButton';
import { useGetJobs }      from '@/features/admin/lib/use-get-jobs';
import { PublishButton }   from '@/features/admin/components/PublishButton';
import { ArchiveButton }   from '@/features/admin/components/ArchiveButton';
import { ExtendButton }    from '@/features/admin/components/ExtendButton';

const JobsPage = () => {
  const router                      = useRouter();
  const [page, setPage]             = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit                       = 12;

  const {
          data,
          isLoading,
          error,
        } = useGetJobs(page, limit);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) {
      return 'Salary not specified';
    }
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    }
    if (min) {
      return `From $${min.toLocaleString()}`;
    }
    if (max) {
      return `Up to $${max.toLocaleString()}`;
    }
    return 'Salary not specified';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year:  'numeric',
      month: 'short',
      day:   'numeric',
    });
  };

  const getDaysUntilExpiration = (expireAt: string) => {
    const today          = new Date();
    const expirationDate = new Date(expireAt);
    const diffTime       = expirationDate.getTime() - today.getTime();
    const diffDays       = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpirationChipColor = (expireAt: string) => {
    const days = getDaysUntilExpiration(expireAt);
    if (days <= 0) {
      return 'error';
    }
    if (days <= 7) {
      return 'warning';
    }
    if (days <= 30) {
      return 'info';
    }
    return 'success';
  };

  const filteredJobs = data?.data?.filter((job) =>
    job.title.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (job.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
  ) || [];

  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;

  // Loading skeleton
  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  gap:     1,
                  mt:      2,
                }}
              >
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Jobs Management
          </Typography>
          <Skeleton variant="rectangular" width={200} height={36} />
        </Box>
        {renderSkeleton()}
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading jobs: {error.message}
        </Alert>
        <CustomButton
          variant="outlined"
          onClick={() => window.location.reload()}
        >
          Retry
        </CustomButton>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={1}
        sx={{
          p:          3,
          mb:         4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Box
          sx={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            flexWrap:       'wrap',
            gap:            2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color:      'white',
                fontWeight: 'bold',
              }}
            >
              Jobs Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:   'white',
                opacity: 0.9,
                mt:      0.5,
              }}
            >
              Manage your job postings, track performance, and update listings
            </Typography>
          </Box>
          <CustomButton
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/jobs/new')}
            sx={{
              bgcolor:   'white',
              color:     '#667eea',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Create New Job
          </CustomButton>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p:         2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" color="primary" fontWeight="bold">
              {data?.meta?.total || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Jobs
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p:         2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {filteredJobs.filter(job => getDaysUntilExpiration(job.expireAt) > 7).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Jobs
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p:         2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {filteredJobs.filter(job => {
                const days = getDaysUntilExpiration(job.expireAt);
                return days > 0 && days <= 7;
              }).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Expiring Soon
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p:         2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" color="info.main" fontWeight="bold">
              {filteredJobs.filter(job => job.isRemote).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Remote Jobs
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Paper
        elevation={1}
        sx={{
          p:  2,
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search jobs by title, location, or company..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
          }}
        />
      </Paper>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <Paper
          sx={{
            p:         4,
            textAlign: 'center',
          }}
        >
          <WorkIcon
            sx={{
              fontSize: 64,
              color:    'text.secondary',
              mb:       2,
            }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No jobs found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first job posting to get started'}
          </Typography>
          <CustomButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/jobs/new')}
          >
            Create New Job
          </CustomButton>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} lg={4} key={job.id}>
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
                    {/* Header with Company Logo */}
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

                    {/* Location and Remote Badge */}
                    <Box
                      sx={{
                        display:    'flex',
                        alignItems: 'center',
                        gap:        1,
                        mb:         2,
                      }}
                    >
                      <LocationIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {job.location}
                      </Typography>
                      {job.isRemote && (
                        <Chip
                          /* icon={<RemoteIcon />} */
                          label="Remote"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    {/* Salary */}
                    <Box
                      sx={{
                        display:    'flex',
                        alignItems: 'center',
                        mb:         2,
                      }}
                    >
                      <MoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </Typography>
                    </Box>

                    {/* Description Preview */}
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

                    {/* Dates and Status */}
                    <Box sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
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
                  </CardContent>

                  <Divider />

                  {/* Actions */}
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

                    <Stack direction="row" spacing={1} justifyContent="flex-start">
                      <PublishButton jobId={job.id} size="small" />
                      <ArchiveButton jobId={job.id} size="small" />
                      <ExtendButton jobId={job.id} size="small" />
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{
                display:        'flex',
                justifyContent: 'center',
                mt:             4,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default JobsPage;