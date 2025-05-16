import { PaginationUrlParams } from './type';

const parsedUrl = (url: string) => {
  const [rawUrl, searchParams] = url.split('?');

  const parsed = {
    origin: '',
    pathname: '',
    search: searchParams || ''
  };

  
  if (rawUrl.startsWith('/')) {
    parsed.pathname = rawUrl;
  } else if (rawUrl.startsWith('http')) {
    const [protocol, origin, ...pathname] = rawUrl.split('/');

    parsed.origin = `${protocol}//${origin}`;
    parsed.pathname = `/${pathname.join('/')}`;
  }
  
  return parsed;
};

export const setUrlSearchParams = (
  url: string,
  params: Record<string, string>,
  options?: { includeHost?: boolean; isClean?: boolean }
) => {
  const { origin, pathname, search } = parsedUrl(url);
  const urlParams = new URLSearchParams(
    options?.isClean ? '' : search
  );

  Object.entries(params).forEach(([key, value]) => {
    urlParams.set(key, value);
  });

  const newUrl = `${pathname}?${urlParams.toString()}`;

  return options?.includeHost ? `${origin}${newUrl}` : newUrl;
};

export const removeUrlSearchParams = (
  url: string,
  options?: {
    keys?: string[]
    includeHost?: boolean
  }
) => {
  const { origin, pathname, search } = parsedUrl(url);
  let newUrl = '';

  if (options?.keys?.length) {
    const urlParams = new URLSearchParams(search);

    options.keys.forEach((key) => {
      urlParams.delete(key);
    });

    let newUrlParams = '';

    if (urlParams.size > 0) {
      newUrlParams = `?${urlParams.toString()}`;
    }

    newUrl = `${pathname}${newUrlParams}`;
  } else {
    newUrl = pathname;
  }

  return options?.includeHost ? `${origin}${newUrl}` : newUrl;
};

export const mapPaginationParams = (paginationUrl: PaginationUrlParams) => {
  return {
    page: paginationUrl.page ? Number(paginationUrl.page) : 1,
    limit: paginationUrl.limit ? Number(paginationUrl.limit) : 10
  };
};
