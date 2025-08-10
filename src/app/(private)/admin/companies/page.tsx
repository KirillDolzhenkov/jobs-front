'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  TrendingUp as TrendingIcon,
}                          from '@mui/icons-material';
import Button              from '@/shared/ui/Button/Button';
import { useGetCompanies } from '@/features/admin/lib/use-get-companies';

interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
  employeeCount?: number;
  industry?: string;
  foundedYear?: number;
  jobsCount?: number; // Assuming this comes from the API
  createdAt: string;
  updatedAt: string;
}

const CompaniesPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const limit = 12;

  const { data, isLoading, error } = useGetCompanies(page, limit);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, company: Company) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompany(company);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCompany(null);
  };

  const formatEmployeeCount = (count?: number) => {
    if (!count) return 'Not specified';
    if (count < 50) return '1-50';
    if (count < 200) return '51-200';
    if (count < 1000) return '201-1000';
    return '1000+';
  };

  const getCompanySize = (count?: number) => {
    if (!count) return { label: 'Unknown', color: 'default' as const };
    if (count < 50) return { label: 'Startup', color: 'success' as const };
    if (count < 200) return { label: 'Small', color: 'info' as const };
    if (count < 1000) return { label: 'Medium', color: 'warning' as const };
    return { label: 'Enterprise', color: 'error' as const };
  };

  const filteredCompanies = data?.data?.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (company.industry?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = data?.meta ? Math.ceil(data.meta.total / limit) : 1;

  // Loading skeleton
  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="70%" height={24} />
                  <Skeleton variant="text" width="50%" height={20} />
                </Box>
              </Box>
              <Skeleton variant="text" width="100%" height={60} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>
              <Skeleton variant="rectangular" width="100%" height={40} />
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
            Companies Management
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
          Error loading companies: {error.message}
        </Alert>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
              Companies Management
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', opacity: 0.9, mt: 0.5 }}>
              Manage company profiles, information, and job postings
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/companies/new')}
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Add New Company
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {data?.meta?.total || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Companies
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {filteredCompanies.filter(company => (company.jobsCount || 0) > 0).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Hiring
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main" fontWeight="bold">
              {filteredCompanies.filter(company => getCompanySize(company.employeeCount).label === 'Enterprise').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enterprise
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {filteredCompanies.filter(company => getCompanySize(company.employeeCount).label === 'Startup').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Startups
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search companies by name, location, or industry..."
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

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <BusinessIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No companies found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first company profile to get started'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/companies/new')}
          >
            Add New Company
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredCompanies.map((company) => {
              const sizeInfo = getCompanySize(company.employeeCount);
              return (
                <Grid item xs={12} sm={6} lg={4} key={company.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      {/* Header with Company Logo */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Badge
                          badgeContent={company.jobsCount || 0}
                          color="primary"
                          invisible={(company.jobsCount || 0) === 0}
                        >
                          <Avatar
                            src={company.logoUrl}
                            sx={{
                              mr: 2,
                              width: 56,
                              height: 56,
                              bgcolor: 'primary.main',
                              border: '2px solid',
                              borderColor: 'grey.100',
                            }}
                          >
                            <BusinessIcon />
                          </Avatar>
                        </Badge>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontWeight: 'bold',
                              lineHeight: 1.2,
                              mb: 0.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {company.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {company.industry || 'Industry not specified'}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, company)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      {/* Company Details */}
                      <Box sx={{ mb: 2 }}>
                        {company.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {company.location}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PeopleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatEmployeeCount(company.employeeCount)} employees
                          </Typography>
                        </Box>

                        {company.website && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LanguageIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography
                              variant="body2"
                              color="primary"
                              component="a"
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              noWrap
                            >
                              Website
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Description Preview */}
                      {company.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '3.6em'
                          }}
                        >
                          {company.description}
                        </Typography>
                      )}

                      {/* Tags and Stats */}
                      <Box sx={{ mb: 2 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                          <Chip
                            label={sizeInfo.label}
                            size="small"
                            color={sizeInfo.color}
                            variant="outlined"
                          />
                          {company.foundedYear && (
                            <Chip
                              label={`Est. ${company.foundedYear}`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                          {(company.jobsCount || 0) > 0 && (
                            <Chip
                              icon={<WorkIcon />}
                              label={`${company.jobsCount} jobs`}
                              size="small"
                              color="success"
                              variant="filled"
                            />
                          )}
                        </Stack>
                      </Box>

                      {/* Contact Info */}
                      {(company.email || company.phone) && (
                        <Box sx={{ mb: 2 }}>
                          <Divider sx={{ mb: 1 }} />
                          <Stack direction="row" spacing={2}>
                            {company.email && (
                              <Tooltip title={company.email}>
                                <IconButton size="small" color="primary">
                                  <EmailIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {company.phone && (
                              <Tooltip title={company.phone}>
                                <IconButton size="small" color="primary">
                                  <PhoneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                        </Box>
                      )}
                    </CardContent>

                    <Divider />

                    {/* Actions */}
                    <Box sx={{ p: 2, pt: 1.5 }}>
                      <Stack direction="row" spacing={1} justifyContent="space-between">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => router.push(`/admin/companies/${company.slug}`)}
                          sx={{ flexGrow: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => router.push(`/companies/${company.slug}`)}
                        >
                          View
                        </Button>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Action Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              if (selectedCompany) {
                router.push(`/admin/companies/${selectedCompany.slug}`);
              }
              handleMenuClose();
            }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit Company</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {
              if (selectedCompany) {
                router.push(`/companies/${selectedCompany.slug}`);
              }
              handleMenuClose();
            }}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Public Profile</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete Company</ListItemText>
            </MenuItem>
          </Menu>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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

export default CompaniesPage;