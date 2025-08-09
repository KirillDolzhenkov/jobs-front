'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Paper,
  Skeleton,
  Alert,
  Stack,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Fab,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  /* RemoteWork as RemoteIcon, */
  Work as WorkIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Launch as LaunchIcon,
  AccessTime as TimeIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  HomeWork as HomeWorkIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { useGetJobBySlug } from '@/features/public/lib/use-get-job-by-slug';

export default function JobDetailPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: job, isLoading, error } = useGetJobBySlug(String(slug));

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
    return 'Salary not disclosed';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getDaysUntilExpiration = (expireAt: string) => {
    const today = new Date();
    const expirationDate = new Date(expireAt);
    const diffTime = expirationDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleShare = async () => {
    if (navigator.share && job) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.companyName}`,
          url: window.location.href,
        });
      } catch (error) {
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Parse description into sections (simple implementation)
  const parseJobDescription = (description: string) => {
    const sections = description.split('\n\n');
    return {
      overview: sections[0] || description,
      responsibilities: sections.find(s => s.toLowerCase().includes('responsibilities') || s.toLowerCase().includes('duties')) || '',
      requirements: sections.find(s => s.toLowerCase().includes('requirements') || s.toLowerCase().includes('qualifications')) || '',
      benefits: sections.find(s => s.toLowerCase().includes('benefits') || s.toLowerCase().includes('perks')) || ''
    };
  };

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Skeleton variant="circular" width={80} height={80} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="60%" height={40} />
                  <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Skeleton variant="rounded" width={80} height={32} />
                    <Skeleton variant="rounded" width={100} height={32} />
                    <Skeleton variant="rounded" width={120} height={32} />
                  </Box>
                </Box>
                <Skeleton variant="rectangular" width={120} height={48} />
              </Box>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  if (error || !job) {
    return (
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message || 'Job not found'}
          </Alert>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <CustomButton variant="outlined" startIcon={<ArrowBackIcon />}>
              Back to Jobs
            </CustomButton>
          </Link>
        </Container>
      </Box>
    );
  }

  const jobSections = parseJobDescription(job.description);
  const daysUntilExpiration = getDaysUntilExpiration(job.expireAt);

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WorkIcon fontSize="small" />
              Jobs
            </Typography>
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            {job.title}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            {/* Main Job Card */}
            <Card sx={{ mb: 4, overflow: 'visible' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {/* Header */}
                <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
                  <Avatar
                    src={job.logoUrl}
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      border: '3px solid',
                      borderColor: 'primary.light',
                      boxShadow: theme.shadows[3],
                    }}
                  >
                    <BusinessIcon sx={{ fontSize: 40 }} />
                  </Avatar>

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: 'text.primary',
                        lineHeight: 1.2,
                        fontSize: { xs: '1.75rem', md: '2.125rem' },
                      }}
                    >
                      {job.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ mb: 2, fontWeight: 500 }}
                    >
                      {job.companyName || 'Company not specified'}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      <Chip
                        icon={<LocationIcon />}
                        label={job.location}
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                      {job.isRemote && (
                        <Chip
                          /* icon={<RemoteIcon />} */
                          label="Remote Work"
                          color="success"
                          sx={{ borderRadius: 2 }}
                        />
                      )}
                      <Chip
                        icon={<CalendarIcon />}
                        label={`Posted ${getDaysAgo(job.postedAt)}`}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                      {daysUntilExpiration > 0 && daysUntilExpiration <= 30 && (
                        <Chip
                          icon={<ScheduleIcon />}
                          label={`${daysUntilExpiration} days left`}
                          color={daysUntilExpiration <= 7 ? 'error' : 'warning'}
                          size="small"
                          sx={{ borderRadius: 2 }}
                        />
                      )}
                    </Stack>
                  </Box>

                  {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title={isBookmarked ? 'Remove from bookmarks' : 'Bookmark this job'}>
                        <IconButton
                          onClick={toggleBookmark}
                          sx={{
                            bgcolor: isBookmarked ? 'warning.light' : 'grey.100',
                            '&:hover': {
                              bgcolor: isBookmarked ? 'warning.main' : 'grey.200',
                            },
                          }}
                        >
                          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share job">
                        <IconButton
                          onClick={handleShare}
                          sx={{
                            bgcolor: 'grey.100',
                            '&:hover': { bgcolor: 'grey.200' },
                          }}
                        >
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>

                {/* Quick Info Cards */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'success.50',
                        border: '1px solid',
                        borderColor: 'success.200',
                      }}
                    >
                      <MoneyIcon color="success" sx={{ mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Annual Salary
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'info.50',
                        border: '1px solid',
                        borderColor: 'info.200',
                      }}
                    >
                      <HomeWorkIcon color="info" sx={{ mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="info.main">
                        {job.isRemote ? 'Remote' : 'On-site'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Work Type
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'primary.50',
                        border: '1px solid',
                        borderColor: 'primary.200',
                      }}
                    >
                      <TrendingUpIcon color="primary" sx={{ mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="primary.main">
                        Full-time
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Employment Type
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Job Description */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Job Description
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {job.description}
                  </Typography>
                </Box>

                {/* Requirements & Responsibilities (if parsed) */}
                {jobSections.responsibilities && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Key Responsibilities
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                      {jobSections.responsibilities}
                    </Typography>
                  </Box>
                )}

                {jobSections.requirements && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Requirements
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                      {jobSections.requirements}
                    </Typography>
                  </Box>
                )}

                {jobSections.benefits && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Benefits & Perks
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                      {jobSections.benefits}
                    </Typography>
                  </Box>
                )}

                {/* Apply Section */}
                <Paper
                  sx={{
                    p: 3,
                    mt: 4,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Ready to Apply?
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                    Take the next step in your career with {job.companyName}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<LaunchIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Apply Now
                  </Button>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            {/* Job Summary Sidebar */}
            <Card sx={{ mb: 3, position: 'sticky', top: 24 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Job Summary
                </Typography>

                <List sx={{ py: 0 }}>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Posted Date"
                      secondary={formatDate(job.postedAt)}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Application Deadline"
                      secondary={formatDate(job.expireAt)}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={job.location}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <MoneyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Salary Range"
                      secondary={formatSalary(job.salaryMin, job.salaryMax)}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <BusinessIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Company"
                      secondary={job.companyName || 'Not specified'}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <CustomButton
                    variant="contained"
                    fullWidth
                    size="large"
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<LaunchIcon />}
                    sx={{ mb: 1 }}
                  >
                    Apply Now
                  </CustomButton>

                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      onClick={toggleBookmark}
                      sx={{ flex: 1 }}
                    >
                      {isBookmarked ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ShareIcon />}
                      onClick={handleShare}
                      sx={{ flex: 1 }}
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            {/* <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Similar Jobs
                </Typography>

                <Stack spacing={2}>
                  {[1, 2, 3].map((item) => (
                    <Paper
                      key={item}
                      component={Link}
                      href="/"
                      sx={{
                        p: 2,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: 2,
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                          <BusinessIcon />
                        </Avatar>
                        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold" noWrap>
                            Frontend Developer
                          </Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            Tech Company Inc.
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            <Chip label="Remote" size="small" color="success" variant="outlined" />
                            <Chip label="$80k" size="small" variant="outlined" />
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card> */}
          </Grid>
        </Grid>

        {/* Back to Jobs Button */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <CustomButton variant="outlined" startIcon={<ArrowBackIcon />} size="large">
              Back to All Jobs
            </CustomButton>
          </Link>
        </Box>
      </Container>

      {/* Mobile FAB for Apply */}
      {isMobile && (
        <Fab
          color="primary"
          variant="extended"
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            left: 16,
            mx: 2,
            zIndex: 1000,
          }}
        >
          <LaunchIcon sx={{ mr: 1 }} />
          Apply Now
        </Fab>
      )}
    </Box>
  );
}