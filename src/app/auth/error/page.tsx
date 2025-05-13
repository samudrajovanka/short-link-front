import React from 'react';

import Text from '@/components/ui/Text';

const AuthErrorPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams;
  let message = 'Authentication Error';

  if (params.error === 'AccessDenied') {
    message = 'Your account is not authorized to access this application.';
  }

  return (
    <div className="h-dvh flex flex-col gap-4 items-center justify-center px-4 text-center">
      <Text resetTypography className="text-2xl md:text-4xl font-bold">{ message }</Text>
      <Text color="subtitle">
        Use another account or contact your administrator for assistance.
      </Text>
    </div>
  );
};

export default AuthErrorPage;