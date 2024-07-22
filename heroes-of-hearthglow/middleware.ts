import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// Admittedly, I find this a bit confusing. But the idea is that this middleware
// will check if the user is authenticated before allowing access to the API.
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApiPath = path.startsWith('/api');
  const isPublicPath =
    path === '/login' || path === '/' || path === '/api/auth/login';
  const token = request.cookies.get('token');

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (isApiPath && !token) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

 
  return NextResponse.next();
}


export const config = {
  matcher: ['/login', '/dashboard', '/api/:path*'],
};
