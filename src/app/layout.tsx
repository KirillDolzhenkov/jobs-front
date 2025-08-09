import type { Metadata } from 'next';
import { Inter }         from 'next/font/google';
import React             from 'react';

import { Providers } from '@/features/providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:       'Job Platform',
  description: 'A platform for discovering and managing tech jobs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={false}>
    <body className={inter.className}>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}