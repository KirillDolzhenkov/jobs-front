'use client';

import theme                                from '@/app/theme';
import { ThemeProvider }                    from '@mui/material';
import { ReactNode }                        from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}