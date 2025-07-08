import { notFound, redirect, RedirectType } from 'next/navigation';

import { getAccessLink } from '@/repositories/shortLink';

const RedirectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  try {
    const accessLinkResponse = await getAccessLink(slug);
  
    const accessLink = await accessLinkResponse.json();
    const { originalUrl } = accessLink.data.shortLink;
  
    if (originalUrl) {
      redirect(originalUrl, RedirectType.replace);
    }
  
    notFound();
  } catch (error) {
    console.log('error', error);

    if ((error as Response).status === 404) {
      notFound();
    }
    
    throw error;
  }
};

export default RedirectPage;
