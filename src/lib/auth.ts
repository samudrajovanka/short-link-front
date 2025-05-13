import NextAuth from 'next-auth';
import Google, { GoogleProfile } from 'next-auth/providers/google';

import env from '@/config/env';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!account || !profile) return false;

      if (account.provider === 'google') {
        const googleProfile = profile as GoogleProfile;
        return googleProfile.email_verified && googleProfile.email === env.LOGIN_EMAIL;
      }

      return false;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  }
});