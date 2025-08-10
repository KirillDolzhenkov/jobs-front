'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
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
  Description as DescriptionIcon,
  WorkOutline as WorkIcon,
  /* RemoteWork as RemoteIcon, */
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import Button from '@/shared/ui/Button';

interface CreateJobFormData {
  title: string;
  description: string;
  logoUrl: string;
  location: string;
  slug: string;
  salaryMin: number;
  salaryMax: number;
  isRemote: boolean;
  expireAt: string;
  applyUrl: string;
  companyId: string;
  companyName: string;
  requirements: string[];
  benefits: string[];
  jobType: string;
  experienceLevel: string;
  tags: string[];
}

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
  'Temporary'
];

const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Lead/Principal',
  'Executive'
];

const popularTags = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'Java', 'Go', 'Rust', 'PHP', 'Ruby', 'C++', 'C#',
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
  'Machine Learning', 'DevOps', 'Frontend', 'Backend', 'Full Stack'
];

const steps = ['Basic Information', 'Job Details', 'Requirements & Benefits', 'Review & Publish'];

export default function CreateJobPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<CreateJobFormData>({
    title: '',
    description: '',
    logoUrl: '',
    location: '',
    slug: '',
    salaryMin: 50000,
    salaryMax: 100000,
    isRemote: false,
    expireAt: '',
    applyUrl: '',
    companyId: '',
    companyName: '',
    requirements: [''],
    benefits: [''],
    jobType: 'Full-time',
    experienceLevel: 'Mid Level',
    tags: [],
  });

  const handleInputChange = (field: keyof CreateJobFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setSubmitError(null);

    // Auto-generate slug from title
    if (field === 'title' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFormData(prev => ({
      ...prev,
      salaryMin: min,
      salaryMax: max,
    }));
  };

  const handleArrayChange = (field: 'requirements' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Filter out empty requirements and benefits
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
        expireAt: new Date(formData.expireAt + 'T23:59:59.999Z').toISOString(),
      };

      const response = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }

      router.push('/admin/jobs');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon sx={{ mr: 1 }} />
                Basic Job Information
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
                placeholder="e.g. Senior Frontend Developer"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <WorkIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Slug"
                value={formData.slug}
                onChange={handleInputChange('slug')}
                required
                helperText="URL-friendly version (auto-generated from title)"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LinkIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={handleInputChange('companyName')}
                required
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <BusinessIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Logo URL"
                value={formData.logoUrl}
                onChange={handleInputChange('logoUrl')}
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
              {formData.logoUrl && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2">Preview:</Typography>
                  <Avatar src={formData.logoUrl} sx={{ width: 40, height: 40 }}>
                    <BusinessIcon />
                  </Avatar>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={handleInputChange('location')}
                required
                placeholder="e.g. San Francisco, CA or Remote"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isRemote}
                    onChange={handleInputChange('isRemote')}
                    color="success"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* <RemoteIcon /> */}
                    Remote Work
                  </Box>
                }
                sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon sx={{ mr: 1 }} />
                Job Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                value={formData.description}
                onChange={handleInputChange('description')}
                required
                multiline
                rows={8}
                placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={formData.jobType}
                  label="Job Type"
                  onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Experience Level</InputLabel>
                <Select
                  value={formData.experienceLevel}
                  label="Experience Level"
                  onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                >
                  {experienceLevels.map((level) => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MoneyIcon />
                Salary Range (USD)
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={[formData.salaryMin, formData.salaryMax]}
                  onChange={handleSalaryChange}
                  valueLabelDisplay="auto"
                  min={30000}
                  max={300000}
                  step={5000}
                  marks={[
                    { value: 30000, label: '$30K' },
                    { value: 100000, label: '$100K' },
                    { value: 200000, label: '$200K' },
                    { value: 300000, label: '$300K' },
                  ]}
                  valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">
                    Min: ${formData.salaryMin.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Max: ${formData.salaryMax.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Application URL"
                value={formData.applyUrl}
                onChange={handleInputChange('applyUrl')}
                placeholder="https://company.com/apply/job-id"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LinkIcon />
                                    </InputAdornment>
                                  ),
                }}
                helperText="Where candidates should apply"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                type="date"
                value={formData.expireAt}
                onChange={handleInputChange('expireAt')}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarIcon />
                                    </InputAdornment>
                                  ),
                }}
                helperText="When this job posting expires"
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={popularTags}
                value={formData.tags}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, tags: newValue }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skills & Technologies"
                    placeholder="Select relevant skills and technologies"
                    helperText="Choose tags that best describe this role"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Requirements
                    <Tooltip title="Add requirement">
                      <IconButton
                        size="small"
                        onClick={() => addArrayItem('requirements')}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Stack spacing={2}>
                    {formData.requirements.map((req, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <TextField
                          fullWidth
                          size="small"
                          label={`Requirement ${index + 1}`}
                          value={req}
                          onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                          placeholder="e.g. 3+ years of React experience"
                        />
                        {formData.requirements.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => removeArrayItem('requirements', index)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Benefits & Perks
                    <Tooltip title="Add benefit">
                      <IconButton
                        size="small"
                        onClick={() => addArrayItem('benefits')}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Stack spacing={2}>
                    {formData.benefits.map((benefit, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <TextField
                          fullWidth
                          size="small"
                          label={`Benefit ${index + 1}`}
                          value={benefit}
                          onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                          placeholder="e.g. Health insurance, Remote work, Flexible hours"
                        />
                        {formData.benefits.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => removeArrayItem('benefits', index)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company ID"
                value={formData.companyId}
                onChange={handleInputChange('companyId')}
                required
                placeholder="uuid-company-id"
                helperText="The ID of the company this job belongs to"
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PreviewIcon />
                Review & Publish
                <Button
                  size="small"
                  variant={previewMode ? "contained" : "outlined"}
                  onClick={() => setPreviewMode(!previewMode)}
                  sx={{ ml: 2 }}
                >
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </Button>
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            {previewMode ? (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Avatar src={formData.logoUrl} sx={{ width: 64, height: 64 }}>
                      <BusinessIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {formData.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {formData.companyName}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip icon={<LocationIcon />} label={formData.location} size="small" />
                        {formData.isRemote && <Chip icon={<RemoteIcon />} label="Remote" color="success" size="small" />}
                        <Chip label={formData.jobType} size="small" />
                        <Chip label={formData.experienceLevel} size="small" />
                      </Stack>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {formData.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Salary: ${formData.salaryMin.toLocaleString()} - ${formData.salaryMax.toLocaleString()}
                  </Typography>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Job Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><strong>Title:</strong> {formData.title}</Grid>
                    <Grid item xs={6}><strong>Company:</strong> {formData.companyName}</Grid>
                    <Grid item xs={6}><strong>Location:</strong> {formData.location}</Grid>
                    <Grid item xs={6}><strong>Type:</strong> {formData.jobType}</Grid>
                    <Grid item xs={6}><strong>Level:</strong> {formData.experienceLevel}</Grid>
                    <Grid item xs={6}><strong>Remote:</strong> {formData.isRemote ? 'Yes' : 'No'}</Grid>
                    <Grid item xs={6}><strong>Salary:</strong> ${formData.salaryMin.toLocaleString()} - ${formData.salaryMax.toLocaleString()}</Grid>
                    <Grid item xs={6}><strong>Expires:</strong> {formData.expireAt}</Grid>
                    <Grid item xs={12}><strong>Tags:</strong> {formData.tags.join(', ') || 'None'}</Grid>
                    <Grid item xs={12}><strong>Requirements:</strong> {formData.requirements.filter(r => r.trim()).length} items</Grid>
                    <Grid item xs={12}><strong>Benefits:</strong> {formData.benefits.filter(b => b.trim()).length} items</Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
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
          Create New Job
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details below to create a new job posting
        </Typography>
      </Box>

      {/* Stepper */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Error Alert */}
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      {/* Form Content */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        {renderStepContent()}
      </Paper>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
              sx={{ minWidth: 140 }}
            >
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}