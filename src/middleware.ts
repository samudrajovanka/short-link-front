import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  const pathname = request.nextUrl.pathname;
  const isSlugRedirect = pathname.split('/').length === 2;

  if (isSlugRedirect) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/app') && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
};