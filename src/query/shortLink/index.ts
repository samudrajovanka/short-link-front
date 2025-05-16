import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { SuccessResponseWithData, SuccessResponseWithPagination } from '@/lib/fetch/types';
import { getLink, getLinks } from '@/repositories/shortLink';
import { GetLinkQuery, ShortLink } from '@/repositories/shortLink/types';

export const getLinksKeyQuery = (query?: GetLinkQuery) => {
  if (!query) {
    return ['shortLinks'];
  }

  return ['shortLinks', query];
};

export const linksOptions = (query?: GetLinkQuery) => queryOptions({
  queryKey: getLinksKeyQuery(query),
  queryFn: () => getLinks(query)
    .then(res => res.json() as Promise<SuccessResponseWithPagination<{ shortLinks: ShortLink[] }>>)
});

export const useLinks = (query?: GetLinkQuery) => {
  const result = useSuspenseQuery(linksOptions(query));
  return result;
};

export const getLinkKeyQuery = (slug: string) => {
  return ['shortLink', slug];
};

export const linkOptions = (slug: string) => queryOptions({
  queryKey: getLinkKeyQuery(slug),
  queryFn: () => getLink(slug)
    .then(res => res.json() as Promise<SuccessResponseWithData<{ shortLink: ShortLink }>>)
});

export const useLink = (slug: string) => {
  const result = useSuspenseQuery(linkOptions(slug));
  return result;
};
