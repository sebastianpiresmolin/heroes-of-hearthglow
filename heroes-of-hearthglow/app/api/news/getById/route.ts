import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

export async function GET(request: NextRequest) {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');

      if (!id) {
        return new Response('ID query parameter is missing', { status: 400 });
      }
  
      const newsItem = await News.findOne({ id: id });
      if (!newsItem) {
        return new Response('News item not found', { status: 404 });
      }
      return NextResponse.json(newsItem);
    } catch (error: any) {
      return NextResponse.error();
    }
  }
