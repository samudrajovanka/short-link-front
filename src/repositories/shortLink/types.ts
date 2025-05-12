import { SuccessResponseWithData } from '@/lib/fetch/types';

export type ShortLink = {
  id:          string;
  originalUrl: string;
}

export type AccessShortLinkResponse = SuccessResponseWithData<{
  shortLink: Pick<ShortLink, 'id' | 'originalUrl'>;
}>