import { SuccessResponseWithData } from '@/lib/fetch/types';

export type ShortLink = {
  id:          string;
  originalUrl: string;
  created_at:   string;
  updated_at:   string;
  slug:        string;
  totalAccess: number;
}

export type AccessShortLinkResponse = SuccessResponseWithData<{
  shortLink: Pick<ShortLink, 'id' | 'originalUrl'>;
}>

export type GetLinkQuery = {
  page?: number;
  limit?: number;
}