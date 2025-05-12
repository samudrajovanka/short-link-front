import React from 'react';

import { notFound, redirect } from 'next/navigation';

import Text from '@/components/elements/Text';
import { getAccessLink } from '@/repositories/shortLink';

const RedirectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const accessLinkResponse = await getAccessLink(slug);

  if (accessLinkResponse.status === 404) {
    notFound();
  }

  const accessLink = await accessLinkResponse.json();
  const { originalUrl } = accessLink.data.shortLink;

  if (originalUrl) {
    redirect(originalUrl);
  }

  return (
    <Text>Welcome to redirect page</Text>
  );
};

export default RedirectPage;
