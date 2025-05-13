const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || 'secret',
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID as string,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET as string,
  LOGIN_EMAIL: process.env.LOGIN_EMAIL as string
};

export default env;