'use client';

import { useGetJobBySlug }                   from '@/features/public/lib/use-get-job-by-slug';
import CustomButton                          from '@/shared/ui/CustomButton/CustomButton';
import { Box, CircularProgress, Typography } from '@mui/material';
import Link                                  from 'next/link';
import { useParams }                         from 'next/navigation';

import styles from './job-detail.module.css';

export default function JobDetailPage() {
  const { slug } = useParams();
  const {
          data: job,
          isLoading,
          error,
        }        = useGetJobBySlug(slug as string);

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress size={40} />
        <Typography variant="body1" className={styles.loadingText}>
          Loading job details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error" className={styles.errorText}>
          {error.message}
        </Typography>
        <Link href="/">
          <CustomButton variant="outlined" sx={{ mt: 2 }}>
            Back to Jobs
          </CustomButton>
        </Link>
      </Box>
    );
  }

  if (!job) {
    return (
      <Box>
        <Typography color="error" className={styles.errorText}>Job not found</Typography>
        <Link href="/">
          <CustomButton variant="outlined" sx={{ mt: 2 }}>
            Back to Jobs
          </CustomButton>
        </Link>
      </Box>
    );
  }

  return (
    <Box className={styles.jobDetail}>
      <Typography variant="h4" className={styles.jobTitle}>
        {job.title}
      </Typography>
      <Typography variant="body1" className={styles.jobLocation}>
        {job.location} {job.isRemote && '(Remote)'}
      </Typography>
      <Typography variant="body2" className={styles.jobSalary}>
        Salary: ${job.salaryMin} - ${job.salaryMax}
      </Typography>
      <Typography variant="body1" className={styles.jobDescription}>
        {job.description}
      </Typography>
      <Typography variant="body2" className={styles.jobDetails}>
        Posted: {new Date(job.postedAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body2" className={styles.jobDetails}>
        Expires: {new Date(job.expireAt).toLocaleDateString()}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className={styles.applyButton}>
          Apply Now
        </a>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
        <Link href="/">
          <CustomButton variant="outlined" >
            Back
          </CustomButton>
        </Link>
      </Box>
    </Box>
  );
}