'use client';

import React                                           from 'react';
import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import Button                                          from '@/shared/ui/Button/Button';

const JobsHero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        backdropFilter: 'blur(20px)',
        color: 'white',
        py: {
          xs: 8,
          md: 12,
        },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        // Добавляем тонкий градиент сверху для глубины
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Анимированные стеклянные элементы в стиле Apple */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '12%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'float 5s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          animation: 'float 4s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'float 7s ease-in-out infinite reverse',
        }}
      />

      {/* Большие декоративные элементы */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}20 0%, transparent 70%)`,
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}15 0%, transparent 70%)`,
          animation: 'pulse 10s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Небольшой бейдж над заголовком */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              px: 3,
              py: 1,
              mb: 3,
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              animation: 'slideDown 1s ease-out',
            }}
          >
            ✨ New Remote Opportunities Daily
          </Box>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: {
                xs: '2.5rem',
                sm: '3.5rem',
                md: '4rem',
                lg: '4.5rem',
              },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              // Стеклянный градиентный текст в стиле Apple
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(255, 255, 255, 0.9) 50%,
                rgba(255, 255, 255, 0.8) 100%
              )`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 4px 20px rgba(0,0,0,0.3)',
              animation: 'slideUp 1s ease-out 0.2s both',
            }}
          >
            Remote Tech Jobs
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 5,
              opacity: 0.9,
              fontWeight: 400,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.5,
              fontSize: {
                xs: '1.1rem',
                md: '1.3rem',
              },
              color: 'rgba(255, 255, 255, 0.95)',
              animation: 'slideUp 1s ease-out 0.4s both',
            }}
          >
            Discover top-tier remote opportunities from leading tech companies worldwide.
            Join the future of work today.
          </Typography>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{
              animation: 'slideUp 1s ease-out 0.6s both',
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                color: theme.palette.primary.dark,
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)',
                  scale: '1.05',
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.02)',
                },
              }}
            >
              Post a Job
            </Button>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                Starting at
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 1)',
                  fontSize: '1.2rem',
                }}
              >
                $99
              </Typography>
            </Box>
          </Stack>

          {/* Дополнительная информация снизу */}
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              flexWrap: 'wrap',
              animation: 'slideUp 1s ease-out 0.8s both',
            }}
          >
            {[
              { number: '10k+', label: 'Active Jobs' },
              { number: '500+', label: 'Companies' },
              { number: '50k+', label: 'Developers' },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  opacity: 0.9,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '1.1rem',
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default JobsHero;