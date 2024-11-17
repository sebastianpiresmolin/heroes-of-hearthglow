import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
  keyGenerator: (req: any) => req.ip,
  handler: (req, res) => {
    console.log(`Rate limit reached for IP: ${req.ip}`);
    res.status(429).send('Too many requests, please try again later.');
  },
});

async function verifyToken(request: NextRequest): Promise<boolean> {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;
  if (!token) return false;

  const tokenSecret = process.env.TOKEN_SECRET;
  if (!tokenSecret) {
    throw new Error('TOKEN_SECRET is not defined in the environment variables');
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(tokenSecret));
    console.log('Token verified successfully');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Invalid token', error.message);
    } else {
      console.log('Invalid token');
    }
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware executing for path: ${path}`);

  // mock-req res for express-rate-limit
  const mockReq = {
    headers: Object.fromEntries(request.headers),
    ip: request.ip ?? '127.0.0.1',
    method: request.method,
    path: request.nextUrl.pathname,
    protocol: request.nextUrl.protocol,
    query: Object.fromEntries(request.nextUrl.searchParams),
    url: request.url,
  };

  const mockRes = {
    status(code: number) {
      mockRes.statusCode = code;
      return mockRes;
    },
    setHeader(key: string, value: string) {
      mockRes.headers.set(key, value);
    },
    getHeader(key: string) {
      return mockRes.headers.get(key);
    },
    json(payload: Record<string, any>) {
      mockRes.body = JSON.stringify(payload);
      mockRes.finished = true;
    },
    send(payload: string) {
      mockRes.body = payload;
      mockRes.finished = true;
    },
    end(payload: string) {
      mockRes.body = payload;
      mockRes.finished = true;
    },
    statusCode: 200,
    headers: new Map<string, string>(),
    body: '',
    finished: false,
  };

  console.log('Applying rate limiting for IP:', mockReq.ip);
  let rateLimitExceeded = false;

  await new Promise<void>((resolve, reject) => {
    apiLimiter(mockReq as any, mockRes as any, (err: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  }).catch(() => {
    rateLimitExceeded = true;
  });

  if (rateLimitExceeded) {
    const responseHeaders = Object.fromEntries(mockRes.headers);
    console.log(`Rate limit response headers: ${JSON.stringify(responseHeaders)}`);
    return new NextResponse(mockRes.body, {
      status: mockRes.statusCode || 429,
      headers: {
        'Content-Type': 'application/json',
        ...responseHeaders,
      },
    });
  }

  const isPublicPath = ['/login', '/'].includes(path);
  const isProtectedPath = !isPublicPath && [
    '/dashboard/(.*)',
    '/api/news/createNews',
    '/api/news/editNewsItem',
    '/api/news/deleteNews/:path*',
  ].some(route => new RegExp(route).test(path));

  if (isProtectedPath && !(await verifyToken(request))) {
    console.log('Redirecting to login: No valid token');
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  console.log('Request is allowed to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/(.*)',
    '/api/news/createNews',
    '/api/news/editNews',
    '/api/news/deleteNews/(.*)',
    '/api/login',
    '/login',
    '/',
  ],
};