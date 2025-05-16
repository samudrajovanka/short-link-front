import React from 'react';

import Navbar from '@/components/parts/Navbar';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />

      <main className="mt-10">
        { children }
      </main>
    </>
  );
};

export default Layout;