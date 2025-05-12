const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || 'secret'
};

export default env;