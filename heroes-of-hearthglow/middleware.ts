import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware executing for path: ${path}`);

  const isPublicPath = path === '/login' || path === '/';

  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;
  console.log(`Token: ${token}`);


  const tokenSecret = process.env.TOKEN_SECRET;
  console.log(`Token Secret: ${tokenSecret}`);

  if (!tokenSecret) {
    throw new Error('TOKEN_SECRET is not defined in the environment variables');
  }


  if (!isPublicPath && !token) {
    console.log('Redirecting to login: No token');
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }


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

      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }
  console.log('Request is allowed to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/news/createNews',
    '/api/news/editNewsItem',
    '/api/news/deleteNews/:path*',
  ],
};
