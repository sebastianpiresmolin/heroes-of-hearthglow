// SEPERATE THIS INTO MULTIPLE FUNCTIONS

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware executing for path: ${path}`);

  // Define paths that are considered public
  const isPublicPath = path === '/login' || path === '/';

  // Get the token from the cookies
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;
  console.log(`Token: ${token}`);

  // Ensure the TOKEN_SECRET is loaded
  const tokenSecret = process.env.TOKEN_SECRET;
  console.log(`Token Secret: ${tokenSecret}`);

  if (!tokenSecret) {
    throw new Error('TOKEN_SECRET is not defined in the environment variables');
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    console.log('Redirecting to login: No token');
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // If the token is present, verify it
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(tokenSecret));
      console.log('Token verified successfully');
    } catch (error) {
      if (error instanceof Error) {
        console.log('Redirecting to login: Invalid token', error.message);
      } else {
        console.log('Redirecting to login: Invalid token');
      }
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
    '/api/news/editNewsItem',
    '/api/news/deleteNews/:path*',
  ],
};
