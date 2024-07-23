import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware executing for path: ${path}`);

  // Define paths that are considered public
  const isPublicPath = path === '/login' || path === '/';

  // Get the token from the cookies
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;
  console.log(`Token: ${token}`);

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    console.log('Redirecting to login: No token');
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // If the token is present, verify it
  if (token) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET!);
    } catch (error) {
      console.log('Redirecting to login: Invalid token');
      // If token verification fails, redirect to login
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  // Allow the request to proceed
  console.log('Request is allowed to proceed');
  return NextResponse.next();
}

// Specify the paths for which this middleware should be executed
export const config = {
  matcher: [
    '/dashboard',
    '/api/news/createNews',
    '/api/news/editNews',
    '/api/news/deleteNews',
  ],
};
