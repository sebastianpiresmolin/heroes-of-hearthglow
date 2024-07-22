import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Correctly define paths that are considered public
  const isPublicPath = path === '/login' || path === '/';
  // Get the token from the cookies
  const token = request.cookies.get('token');

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// It specifies the paths for which this middleware should be executed.
export const config = {
  matcher: ['/login', '/dashboard'],
};
