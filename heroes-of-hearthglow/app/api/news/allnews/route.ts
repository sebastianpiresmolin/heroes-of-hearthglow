import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 8); // Parse page number from query string, 8 is the radix

    const itemsPerPage = 8;
    const skip = (page - 1) * itemsPerPage;

    // Fetch the total count of news items
    const totalCount = await News.countDocuments();

    // Fetch the news items with pagination
    const news = await News.find()
      .sort({ id: -1 })
      .limit(itemsPerPage)
      .skip(skip);

    // Return news items and total count
    return NextResponse.json({ news, totalCount });
  } catch (error: any) {
    return NextResponse.error();
  }
}
