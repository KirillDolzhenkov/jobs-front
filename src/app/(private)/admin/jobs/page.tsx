'use client';

import AdminJobsList  from '@/widgets/admin-jobs-list/index';
import AdminJobsStats from '@/widgets/admin-jobs-list/ui/AdminJobsStats/AdminJobsStats';
import React          from 'react';
import AdminJobsHeader from '@/widgets/admin-jobs-list/ui/AdminJobsHeader/AdminJobsHeader';

export default function AdminJobsPage() {
  return (
    <>
      <AdminJobsHeader />
      <AdminJobsStats />
      <AdminJobsList />
    </>
  );
}