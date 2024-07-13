import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

export async function GET(request: NextRequest) {
    try {
      // Extract the page number from the query parameters, default to 1 if not provided
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1', 10);
  
      // Calculate the number of items to skip (10 items per page)
      const itemsPerPage = 10;
      const skip = (page - 1) * itemsPerPage;
  
      // Fetch the news items with pagination
      const news = await News.find().sort({ id: -1 }).limit(itemsPerPage).skip(skip);
      return NextResponse.json(news);
    } catch (error: any) {
      return NextResponse.error();
    }
  }
