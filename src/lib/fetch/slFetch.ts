import env from '@/config/env';

import Fetch from '.';

class SlFetch extends Fetch {
  constructor() {
    super(env.API_URL);
  }

  protected setGeneralHeaders() {
    return {
      'X-API-KEY': env.API_KEY
    };
  }
}

export const slFetch = new SlFetch();