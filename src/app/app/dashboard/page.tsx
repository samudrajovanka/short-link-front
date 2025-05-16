import React from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Dashboard from '@/components/pages/Dashboard';
import { getQueryClient } from '@/lib/queryClient';
import { linksOptions } from '@/query/shortLink';

const DashboardPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams;
  const queryClient = getQueryClient();

  const page = params.page ? Number(params.page) : 1;
  const limit = params.limit ? Number(params.limit) : 10;

  queryClient.prefetchQuery(linksOptions({
    page,
    limit
  }));
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
};

export default DashboardPage;
