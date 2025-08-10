'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  CalendarToday as CalendarIcon,
}                          from '@mui/icons-material';
import Button              from '@/shared/ui/Button/Button';
import { useGetJobBySlug } from '@/features/job-list/lib/use-get-job-by-slug';

interface EditJobFormData {
  title: string;
  description: string;
  logoUrl: string;
  location: string;
  slug: string;
  expireAt: string;
  tagIds: string[];
  companyId: string;
}

export default function EditJobPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: job, isLoading, error } = useGetJobBySlug(String(slug));

  const [formData, setFormData] = useState<EditJobFormData>({
    title: '',
    description: '',
    logoUrl: '',
    location: '',
    slug: '',
    expireAt: '',
    tagIds: [],
    companyId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize form data when job loads
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        logoUrl: job.logoUrl || '',
        location: job.location || '',
        slug: job.slug || '',
        expireAt: job.expireAt ? new Date(job.expireAt).toISOString().split('T')[0] : '',
        tagIds: job.tagIds || [],
        companyId: job.companyId || '',
      });
    }
  }, [job]);

  const handleInputChange = (field: keyof EditJobFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Convert expireAt to ISO string with time
      const expireAtISO = new Date(formData.expireAt + 'T23:59:59.999Z').toISOString();

      const updateData = {
        ...formData,
        expireAt: expireAtISO,
      };

      const response = await fetch(`/api/admin/jobs/${job?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update job');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        router.push('/admin/jobs');
      }, 1500);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Box textAlign="center">
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Loading job details...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.message || 'Job not found'}
        </Alert>
        <Link href="/admin/jobs">
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back to Jobs
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Link href="/admin/jobs">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Back to Jobs
          </Button>
        </Link>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Job
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update the job details below
        </Typography>
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Job updated successfully! Redirecting...
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ mr: 1 }} />
                Basic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                required
                variant="outlined"
                placeholder="e.g. Senior Frontend Developer"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Slug"
                value={formData.slug}
                onChange={handleInputChange('slug')}
                required
                variant="outlined"
                placeholder="e.g. senior-frontend-developer"
                helperText="URL-friendly version of the job title"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company ID"
                value={formData.companyId}
                onChange={handleInputChange('companyId')}
                required
                variant="outlined"
                placeholder="uuid-company-id"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                value={formData.description}
                onChange={handleInputChange('description')}
                required
                multiline
                rows={6}
                variant="outlined"
                placeholder="Describe the role, responsibilities, requirements..."
              />
            </Grid>

            {/* Location Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                <LocationIcon sx={{ mr: 1 }} />
                Location & Work Type
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={handleInputChange('location')}
                required
                variant="outlined"
                placeholder="e.g. New York, NY or Remote"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            {/* Media Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                <ImageIcon sx={{ mr: 1 }} />
                Media & Links
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Logo URL"
                value={formData.logoUrl}
                onChange={handleInputChange('logoUrl')}
                variant="outlined"
                placeholder="https://example.com/logo.png"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <ImageIcon />
                                    </InputAdornment>
                                  ),
                }}
                helperText="URL to company logo image"
              />
            </Grid>

            {/* Expiration Date */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                <CalendarIcon sx={{ mr: 1 }} />
                Job Expiration
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Expiration Date"
                type="date"
                value={formData.expireAt}
                onChange={handleInputChange('expireAt')}
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="Date when this job posting will expire"
              />
            </Grid>

            {/* Current Job Info Card */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mt: 2, bgcolor: 'grey.50' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Job Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Posted:</strong> {new Date(job.postedAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Company:</strong> {job.companyName || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Salary Range:</strong> {job.salaryMin && job.salaryMax ? `$${job.salaryMin} - $${job.salaryMax}` : 'Not specified'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Remote:</strong> {job.isRemote ? 'Yes' : 'No'}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                <Link href="/admin/jobs">
                  <Button variant="outlined" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={isSubmitting}
                  sx={{ minWidth: 120 }}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}