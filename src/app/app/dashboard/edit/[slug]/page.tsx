import React from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import EditShortLink from '@/components/pages/EditShortLink';
import { getQueryClient } from '@/lib/queryClient';
import { linkOptions } from '@/query/shortLink';

const EditShortLinkPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  
  queryClient.prefetchQuery(linkOptions(slug));
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditShortLink />
    </HydrationBoundary>
  );
};

export default EditShortLinkPage;