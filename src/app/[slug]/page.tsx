import React from 'react';

import { notFound, redirect } from 'next/navigation';

import Text from '@/components/ui/Text';
import { getAccessLink } from '@/repositories/shortLink';

const RedirectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  try {
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
  } catch (error) {
    notFound();
  }
};

export default RedirectPage;
