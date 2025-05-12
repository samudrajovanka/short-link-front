import React from 'react';

import Text from '@/components/elements/Text';

const NotFoundPage = () => {
  return (
    <div className="h-dvh flex flex-col gap-4 items-center justify-center px-4 text-center">
      <Text resetTypography className="text-2xl md:text-4xl font-bold">Oops! We couldn’t find that link 😕</Text>
      <Text color="subtitle">
        The link may have expired, been deleted, or never existed.
      </Text>
    </div>
  );
};

export default NotFoundPage;