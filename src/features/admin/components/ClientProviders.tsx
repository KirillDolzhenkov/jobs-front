'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/shared/theme';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 минут
        },
    },
});

const emotionCache = createCache({ key: 'mui' });

export default function ClientProviders({ children }: { children: ReactNode }) {
    return (
      <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </ThemeProvider>
      </CacheProvider>
    );
}