import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'https://heroes-of-hearthglow.vercel.app',
  'http://localhost:3000',
];

export function corsMiddleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    const headers = new Headers({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    });
    if (request.method === 'OPTIONS') {
      // Handle preflight requests
      return new NextResponse(null, { headers });
    }
    return headers; // Return headers for other requests
  }
  return null; // No headers for disallowed origins
}
