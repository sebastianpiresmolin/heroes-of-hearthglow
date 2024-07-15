import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';
import { corsMiddleware } from '@/corsMiddleware';

export async function POST(request: NextRequest) {
    const corsHeaders = corsMiddleware(request);
    if (!corsHeaders) {
      return NextResponse.json(
        { error: 'CORS policy violation' },
        { status: 403 }
      );
    }
  
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers: corsHeaders as Headers });
    }
  
    try {
      await connect();
      console.log('Database connected successfully');
      const reqBody = await request.json();
      const newsItem = new News(reqBody);
  
      await newsItem.save();
      console.log('News item saved successfully');
  
      return NextResponse.json(
        { message: 'News item saved successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Failed to save news item:', error);
      return NextResponse.json(
        { error: 'Failed to save news item' },
        { status: 500 }
      );
    }
  }