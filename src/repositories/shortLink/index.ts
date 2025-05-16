import { z } from 'zod';

import { slFetch } from '@/lib/fetch/slFetch';
import { setUrlSearchParams } from '@/lib/helpers/url';
import { updateShortLinkSchema } from '@/schema/shortLink';

import { GetLinkQuery, ShortLink } from './types';

export const getAccessLink = async (slug: string) => {  
  return slFetch.get(`/short-links/${slug}/access`);
};

export const getLinks = async (query?: GetLinkQuery) => {
  const url = setUrlSearchParams('/short-links', {
    page: query?.page?.toString() || '1',
    limit: query?.limit?.toString() || '10'
  });

  return slFetch.get(url);
};

export const getLink = async (slug: string) => {
  return slFetch.get(`/short-links/${slug}`);
};

export const deleteLink = async (slug: string) => {
  return slFetch.delete(`/short-links/${slug}`);
};

export const createLink = async (payload: Pick<ShortLink, 'originalUrl' | 'slug'>) => {
  return slFetch.post('/short-links', payload);
};

export const updateLink = async (slug: string, payload: z.infer<typeof updateShortLinkSchema>) => {
  return slFetch.patch(`/short-links/${slug}`, payload);
};