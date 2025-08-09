'use client';

import React, { useState } from 'react';
import Link                from 'next/link';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Alert,
  Pagination,
  Stack,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
}                          from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  /* RemoteWork as RemoteIcon, */
  Work as WorkIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  East as EastIcon,
}                          from '@mui/icons-material';
import CustomButton        from '@/shared/ui/CustomButton/CustomButton';
import { useGetJobs }      from '@/features/admin/lib/use-get-jobs';
import styles from './page.module.css'

const JobList = () => {
  const theme                       = useTheme();
  const isMobile                    = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage]             = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit                       = 10;

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
      return null;
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
    return null;
  };

  const formatDate = (dateString: string) => {
    const now      = new Date();
    const postDate = new Date(dateString);
    const diffTime = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    }
    if (diffDays === 1) {
      return 'Yesterday';
    }
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    }
    return postDate.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day:   'numeric',
      },
    );
  };

  const filteredJobs = data?.data?.filter((job) =>
    job.title.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (job.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (job.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
  ) || [];

  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;

  // Loading skeleton
  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                gap:     2,
              }}
            >
              <Skeleton variant="circular" width={56} height={56} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={28} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mt: 0.5 }} />
                <Box
                  sx={{
                    display: 'flex',
                    gap:     1,
                    mt:      2,
                  }}
                >
                  <Skeleton variant="rounded" width={80} height={24} />
                  <Skeleton variant="rounded" width={100} height={24} />
                </Box>
                <Skeleton variant="text" width="80%" height={16} sx={{ mt: 1 }} />
              </Box>
              <Skeleton variant="rectangular" width={100} height={36} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {renderSkeleton()}
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading jobs: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Section */}
      <Paper
        elevation={0}
        sx={{
          p:            3,
          mb:           4,
          /* background:   'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)', */
          background:   'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          border:       '1px solid',
          borderColor:  'primary.light',
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search for jobs, companies, or locations..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="large"
          InputProps={{
            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon color="primary" />
                              </InputAdornment>
                            ),
            sx:             {
              bgcolor:                                          'white',
              borderRadius:                                     2,
              '& .MuiOutlinedInput-notchedOutline':             {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline':       {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      </Paper>

      {/* Results Header */}
      <Box
        sx={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          mb:             3,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {searchTerm ? (
            <>Found {filteredJobs.length} jobs matching "{searchTerm}"</>
          ) : (
            <>{data?.meta?.total || 0} remote tech jobs available</>
          )}
        </Typography>
        {!searchTerm && (
          <Chip
            icon={<TrendingIcon />}
            label="Latest"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 'medium' }}
          />
        )}
      </Box>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <Paper
          sx={{
            p:         6,
            textAlign: 'center',
          }}
        >
          <WorkIcon
            sx={{
              fontSize: 80,
              color:    'text.secondary',
              mb:       2,
            }}
          />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No jobs found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm
              ? 'Try adjusting your search terms or browse all available positions'
              : 'Check back soon for new opportunities!'}
          </Typography>
          {searchTerm && (
            <CustomButton
              variant="outlined"
              onClick={() => setSearchTerm('')}
            >
              View All Jobs
            </CustomButton>
          )}
        </Paper>
      ) : (
        <Fade in timeout={500}>
          <Grid container spacing={2}>
            {filteredJobs.map((job, index) => (
              <Grid item xs={12} key={job.id}>
                <Fade in timeout={300 + index * 100}>
                  <Card
                    component={Link}
                    href={`/${job.slug}`}
                    sx={{
                      textDecoration: 'none',
                      transition:     'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor:         'pointer',
                      '&:hover':      {
                        transform:         'translateY(-2px)',
                        boxShadow:         theme.shadows[8],
                        '& .job-arrow':    {
                          transform: 'translateX(4px)',
                        },
                        '& .company-logo': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        marginTop: 2,
                        p:            3,
                        borderRadius: '4px',
                        boxShadow:    '0 1px 3px rgba(0, 0, 0, 0.1)',
                        '&:hover':    {
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display:    'flex',
                          gap:        2,
                          alignItems: 'flex-start',
                        }}
                      >
                        {/* Company Logo */}
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

                        {/* Job Info */}
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
                                  '&:hover':  {
                                    bgcolor: 'primary.dark',
                                  },
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

                          {/* Tags */}
                          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                            <Chip
                              icon={<LocationIcon />}
                              label={job.location}
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 1.5 }}
                            />
                            {job.isRemote && (
                              <Chip
                                /* icon={<RemoteIcon />} */
                                label="Remote"
                                size="small"
                                color="success"
                                variant="filled"
                                sx={{ borderRadius: 1.5 }}
                              />
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

                          {/* Description Preview */}
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

                          {/* Footer */}
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
                              {Math.random() > 0.5 && ( // Random "hot" indicator for demo
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
                            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                              View Details →
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            display:        'flex',
            justifyContent: 'center',
            mt:             6,
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
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default function JobsPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor:   'grey.50',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color:      'white',
          py:         {
            xs: 6,
            md: 8,
          },
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              position:  'relative',
              zIndex:    1,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight:           700,
                mb:                   2,
                fontSize:             {
                  xs: '2.5rem',
                  md: '3.5rem',
                },
                background:           'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                backgroundClip:       'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                textShadow:           '2px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Remote Tech Jobs
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb:         4,
                opacity:    0.95,
                fontWeight: 400,
                maxWidth:   600,
                mx:         'auto',
                lineHeight: 1.4,
              }}
            >
              Discover top-tier remote tech opportunities from leading companies worldwide
            </Typography>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <CustomButton
                variant="contained"
                size="large"
                sx={{
                  bgcolor:      'white',
                  color:        'primary.main',
                  px:           4,
                  py:           1.5,
                  fontSize:     '1.1rem',
                  fontWeight:   600,
                  borderRadius: 2,
                  '&:hover':    {
                    bgcolor:   'grey.100',
                    transform: 'translateY(-2px)',
                  },
                  transition:   'all 0.3s ease',
                }}
              >
                Post a Job
              </CustomButton>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Starting at $99
              </Typography>
            </Stack>
          </Box>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position:     'absolute',
            top:          '10%',
            left:         '5%',
            width:        100,
            height:       100,
            borderRadius: '50%',
            background:   'rgba(255, 255, 255, 0.1)',
            animation:    'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position:     'absolute',
            bottom:       '20%',
            right:        '10%',
            width:        60,
            height:       60,
            borderRadius: '50%',
            background:   'rgba(255, 255, 255, 0.1)',
            animation:    'float 4s ease-in-out infinite reverse',
          }}
        />
      </Box>

      {/* Jobs List */}
      <JobList />

      {/* Global animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
}