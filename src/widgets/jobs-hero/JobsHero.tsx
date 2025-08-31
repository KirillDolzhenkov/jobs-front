'use client';

import React                                 from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import Button                                from '@/shared/ui/Button/Button';

const JobsHero = () => {
  return (
    <Box
      sx={{
        /* background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', */
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
            }} spacing={2} justifyContent="center" alignItems="center"
          >
            <Button
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
            </Button>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Starting at $99
            </Typography>
          </Stack>
        </Box>
      </Container>
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
};

export default JobsHero;