import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import rateLimit from 'express-rate-limit';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  keyGenerator: (req: any) => req.ip,
});

function createMockReqRes(request: NextRequest) {
  const headers = new Map(request.headers.entries());

  return {
    req: {
      headers: Object.fromEntries(request.headers),
      ip: request.ip ?? headers.get('x-forwarded-for')?.split(',').shift() ?? '127.0.0.1',
      method: request.method,
      path: request.nextUrl.pathname,
      protocol: request.nextUrl.protocol,
      query: Object.fromEntries(request.nextUrl.searchParams),
      url: request.url,
    },
    res: () => {
      const responseHeaders = new Map<string, string>();
      let statusCode = 200;
      let body = '';
      let finished = false;

      return {
        status(code: number) {
          statusCode = code;
          return this;
        },
        setHeader(key: string, value: string) {
          responseHeaders.set(key, value);
        },
        getHeader(key: string) {
          return responseHeaders.get(key);
        },
        send(payload: string) {
          body = payload;
          finished = true;
        },
        end(payload: string) {
          body = payload;
          finished = true;
        },
        get finished() {
          return finished;
        },
        get statusCode() {
          return statusCode;
        },
        get body() {
          return body;
        },
        get _headers() {
          return responseHeaders;
        }
      };
    }
  };
}

async function applyRateLimit(request: NextRequest) {
  const { req, res } = createMockReqRes(request);
  const response = res();

  return new Promise<void>((resolve, reject) => {
    limiter(req as any, response as any, (err: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  }).then(() => {
    if (response.finished) {
      const responseHeaders = new Headers(Object.fromEntries(response._headers));
      return new NextResponse(response.body, {
        status: response.statusCode,
        headers: responseHeaders,
      });
    }
  });
}

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

  // Apply rate limiting to all paths
  try {
    const rateLimitResponse = await applyRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 429 });
  }

  const isPublicPath = path === '/login' || path === '/';
  const isProtectedPath = !isPublicPath && [
    '/dashboard/(.*)',
    '/api/news/createNews',
    '/api/news/editNewsItem',
    '/api/news/deleteNews/:path*'
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
    '/dashboard/(.*)',  // Using a wildcard to match all nested paths
    '/api/news/createNews',
    '/api/news/editNewsItem',
    '/api/news/deleteNews/:path*',
    '/api/login',
    '/login',  // Explicitly include the `/login` route for rate limiting
    '/',       // Include the root for rate limiting
  ],
};