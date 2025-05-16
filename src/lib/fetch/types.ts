export type FetchOptions = {
  cache?: RequestCache,
  headers?: HeadersInit,
}

export type ResponseTemplate = {
  success: boolean;
  message: string;
}

export type SuccessResponseWithData<TData> = ResponseTemplate & {
  success: true;
  data:    TData;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type SuccessResponseWithPagination<TData> = SuccessResponseWithData<TData> & {
  meta: {
    pagination: Pagination
  }
};
