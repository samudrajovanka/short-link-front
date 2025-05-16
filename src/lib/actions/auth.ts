'use server';

import { signIn, signOut } from '@/lib/auth';

export const login = async () => {
  await signIn('google', { redirectTo: '/app/dashboard' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/auth/login' });
};