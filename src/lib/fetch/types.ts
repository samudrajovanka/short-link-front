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
