import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('appSession')?.value; // Replace with your actual session cookie name
  const { pathname } = req.nextUrl;

  console.log('Pathname:', pathname);
  if (
    pathname.startsWith('/_next') || // Next.js assets
    pathname.startsWith('/static') || // Static files
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/users') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Redirect to /home if no token and not already on /home
  if (!token) {
    if (!pathname.startsWith('/home')) {
      console.log('Redirecting to /home because no token is present.');
      return NextResponse.redirect(new URL('/home', req.url));
    }
    return NextResponse.next(); // Allow access to /home
  }

  if (token && pathname.startsWith('/settings')) {
    return NextResponse.next();
  }

  // Redirect to /dashboard if a token exists and not already on /dashboard
  if (token && !pathname.startsWith('/dashboard')) {
    console.log('Redirecting to /dashboard because token is present.');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow request to continue
  return NextResponse.next();
}
