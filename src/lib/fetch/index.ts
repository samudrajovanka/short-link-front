import { FetchOptions } from './types';

export default class Fetch {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected setGeneralHeaders() {
    return {};
  }

  private generateUrl(url: string) {
    if (url.startsWith('http') || url.startsWith('https')) {
      return url;
    }

    return `${this.baseUrl}${url}`;
  }

  get(path: string, options?: FetchOptions) {
    const { signal } = new AbortController();

    return fetch(this.generateUrl(path), {
      signal,
      headers: {
        ...this.setGeneralHeaders(),
        ...(options?.headers || {})
      },
      ...options
    });
  }

  post(path: string, body: object, options?: FetchOptions) {
    const { signal } = new AbortController();

    return fetch(this.generateUrl(path), {
      method: 'POST',
      signal,
      headers: {
        ...this.setGeneralHeaders(),
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      body: JSON.stringify(body),
      ...options
    });
  }

  patch(path: string, body: object, options?: FetchOptions) {
    const { signal } = new AbortController();

    return fetch(this.generateUrl(path), {
      method: 'PATCH',
      signal,
      headers: {
        ...this.setGeneralHeaders(),
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      body: JSON.stringify(body),
      ...options
    });
  }

  delete(path: string, options?: FetchOptions) {
    const { signal } = new AbortController();

    return fetch(this.generateUrl(path), {
      method: 'DELETE',
      signal,
      headers: {
        ...this.setGeneralHeaders(),
        ...(options?.headers || {})
      },
      ...options
    });
  }
}
