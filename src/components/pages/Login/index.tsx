'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import Text from '@/components/ui/Text';
import { login } from '@/lib/actions/auth';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Text typography="subheading" className="mb-4">Short Link Login</Text>
      <Button onClick={login}>Login With Google</Button>
    </div>
  );
};

export default Login;