import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth';

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center gap-2 py-3 px-4 border rounded-lg sticky top-2 bg-white z-40"
    >
      <Link href="/app/dashboard" className="font-bold text-base md:text-lg">
        Short Link
      </Link>

      <Button onClick={logout} variant="outline">Logout</Button>
    </nav>
  );
};

export default Navbar;