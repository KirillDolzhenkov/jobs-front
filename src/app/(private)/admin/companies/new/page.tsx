'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  Domain as DomainIcon,
  Email as EmailIcon,
  Image as ImageIcon,
  Language as LanguageIcon,
  Link as LinkIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Phone as PhoneIcon,
  Preview as PreviewIcon,
  Public as PublicIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import Button from '@/shared/ui/Button';

import { useCreateCompany } from '@/features/admin/lib/use-create-company';

interface CreateCompanyFormData {
  name: string;
  description: string;
  logoUrl: string;
  slug: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  companySize: string;
  founded: string;
  isPublic: boolean;
  socialLinks: string[];
  benefits: string[];
  technologies: string[];
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Manufacturing',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Non-profit',
  'Government',
  'Other'
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const popularTechnologies = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'Java', 'Go', 'Rust', 'PHP', 'Ruby', 'C++', 'C#',
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
  'Machine Learning', 'DevOps', 'Frontend', 'Backend', 'Full Stack'
];

const steps = ['Basic Information', 'Company Details', 'Additional Info', 'Review & Create'];

export default function CreateCompanyPage() {
  const router = useRouter();
  const createCompany = useCreateCompany();
  const [activeStep, setActiveStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const [formData, setFormData] = useState<CreateCompanyFormData>({
    name: '',
    description: '',
    logoUrl: '',
    slug: '',
    website: '',
    email: '',
    phone: '',
    location: '',
    industry: 'Technology',
    companySize: '11-50 employees',
    founded: '',
    isPublic: false,
    socialLinks: [''],
    benefits: [''],
    technologies: [],
  });

  // Logo preview handling
  useEffect(() => {
    if (formData.logoUrl) {
      const img = new Image();
      img.onload = () => setLogoPreview(formData.logoUrl);
      img.onerror = () => setLogoPreview('');
      img.src = formData.logoUrl;
    } else {
      setLogoPreview('');
    }
  }, [formData.logoUrl]);

  const handleInputChange = (field: keyof CreateCompanyFormData) => (
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

    // Auto-generate slug from name
    if (field === 'name' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleArrayChange = (field: 'socialLinks' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const addArrayItem = (field: 'socialLinks' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'socialLinks' | 'benefits', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const clearLogo = () => {
    setFormData(prev => ({ ...prev, logoUrl: '' }));
    setLogoPreview('');
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
    setSubmitError(null);

    try {
      // Filter out empty arrays
      const cleanedData = {
        name: formData.name,
        description: formData.description,
        logoUrl: formData.logoUrl,
        slug: formData.slug,
        // Add other fields as needed by your API
        socialLinks: formData.socialLinks.filter(link => link.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      };

      createCompany.mutate(cleanedData, {
        onSuccess: () => {
          router.push('/admin/companies');
        },
        onError: (error) => {
          setSubmitError(error instanceof Error ? error.message : 'An error occurred');
        },
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ mr: 1 }} />
                Basic Company Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                placeholder="e.g. Tech Innovations Inc."
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <BusinessIcon />
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
                helperText="URL-friendly version (auto-generated from name)"
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
                label="Website"
                value={formData.website}
                onChange={handleInputChange('website')}
                placeholder="https://company.com"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LanguageIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2} alignItems="flex-start">
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
                    endAdornment: formData.logoUrl && (
                      <InputAdornment position="end">
                        <IconButton onClick={clearLogo} size="small">
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText="URL to company logo image"
                />

                {logoPreview && (
                  <Card sx={{
                    minWidth: 100,
                    minHeight: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'primary.light',
                  }}>
                    <Avatar src={logoPreview} sx={{ width: 64, height: 64 }}>
                      <BusinessIcon />
                    </Avatar>
                  </Card>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Description"
                value={formData.description}
                onChange={handleInputChange('description')}
                multiline
                rows={4}
                placeholder="Tell us about your company, mission, and what makes it unique..."
                helperText={`${formData.description.length}/500 characters`}
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                                      <DescriptionIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DomainIcon sx={{ mr: 1 }} />
                Company Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="contact@company.com"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EmailIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                placeholder="+1 (555) 123-4567"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <PhoneIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={handleInputChange('location')}
                placeholder="San Francisco, CA, USA"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationIcon />
                                    </InputAdornment>
                                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={formData.industry}
                  label="Industry"
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Company Size</InputLabel>
                <Select
                  value={formData.companySize}
                  label="Company Size"
                  onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                >
                  {companySizes.map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Founded Year"
                type="number"
                value={formData.founded}
                onChange={handleInputChange('founded')}
                placeholder="2020"
                InputProps={{
                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarIcon />
                                    </InputAdornment>
                                  ),
                }}
                helperText="Year the company was founded"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublic}
                    onChange={handleInputChange('isPublic')}
                    color="success"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PublicIcon />
                    Public Company
                  </Box>
                }
                sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={popularTechnologies}
                value={formData.technologies}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, technologies: newValue }));
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
                    label="Technologies Used"
                    placeholder="Select technologies your company uses"
                    helperText="Choose technologies that best describe your tech stack"
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
                    <LinkIcon />
                    Social Links
                    <Tooltip title="Add social link">
                      <IconButton
                        size="small"
                        onClick={() => addArrayItem('socialLinks')}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Stack spacing={2}>
                    {formData.socialLinks.map((link, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <TextField
                          fullWidth
                          size="small"
                          label={`Social Link ${index + 1}`}
                          value={link}
                          onChange={(e) => handleArrayChange('socialLinks', index, e.target.value)}
                          placeholder="https://twitter.com/company"
                        />
                        {formData.socialLinks.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => removeArrayItem('socialLinks', index)}
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
                    <PeopleIcon />
                    Employee Benefits
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
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PreviewIcon />
                Review & Create Company
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
                    <Avatar src={logoPreview} sx={{ width: 80, height: 80 }}>
                      <BusinessIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {formData.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        {formData.industry} • {formData.companySize}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip icon={<LocationIcon />} label={formData.location} size="small" />
                        {formData.founded && <Chip icon={<CalendarIcon />} label={`Founded ${formData.founded}`} size="small" />}
                        {formData.isPublic && <Chip icon={<PublicIcon />} label="Public Company" color="success" size="small" />}
                      </Stack>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {formData.description}
                  </Typography>
                  {formData.technologies.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" gutterBottom>Technologies:</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {formData.technologies.map((tech) => (
                          <Chip key={tech} label={tech} variant="outlined" size="small" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Company Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><strong>Name:</strong> {formData.name}</Grid>
                    <Grid item xs={6}><strong>Slug:</strong> {formData.slug}</Grid>
                    <Grid item xs={6}><strong>Industry:</strong> {formData.industry}</Grid>
                    <Grid item xs={6}><strong>Size:</strong> {formData.companySize}</Grid>
                    <Grid item xs={6}><strong>Location:</strong> {formData.location || 'Not specified'}</Grid>
                    <Grid item xs={6}><strong>Founded:</strong> {formData.founded || 'Not specified'}</Grid>
                    <Grid item xs={6}><strong>Website:</strong> {formData.website || 'Not specified'}</Grid>
                    <Grid item xs={6}><strong>Public:</strong> {formData.isPublic ? 'Yes' : 'No'}</Grid>
                    <Grid item xs={12}><strong>Technologies:</strong> {formData.technologies.join(', ') || 'None selected'}</Grid>
                    <Grid item xs={12}><strong>Social Links:</strong> {formData.socialLinks.filter(l => l.trim()).length} links</Grid>
                    <Grid item xs={12}><strong>Benefits:</strong> {formData.benefits.filter(b => b.trim()).length} benefits</Grid>
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
        <Link href="/admin/companies">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Back to Companies
          </Button>
        </Link>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Company
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details below to create a new company profile
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
              disabled={createCompany.isPending}
              startIcon={createCompany.isPending ? <CircularProgress size={20} /> : <SaveIcon />}
              sx={{ minWidth: 140 }}
            >
              {createCompany.isPending ? 'Creating...' : 'Create Company'}
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