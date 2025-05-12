import { slFetch } from '@/lib/fetch/slFetch';

export const getAccessLink = async (slug: string) => {  
  return slFetch.get(`/short-links/${slug}/access`);
};