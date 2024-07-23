// File path: middleware.ts (or .js)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public
  const isPublicPath = path === '/login' || path === '/' || path.startsWith('/api/auth');

  // Get the token from the cookies
  const token = request.cookies.get('token');

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow the request to proceed if the token is present or the path is public
  return NextResponse.next();
}

// Specify the paths for which this middleware should be executed
export const config = {
  matcher: ['/', '/login', '/dashboard', '/api/:path*'],
};
