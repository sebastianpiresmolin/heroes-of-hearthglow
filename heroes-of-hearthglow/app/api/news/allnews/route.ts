import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';



export async function GET(request: NextRequest) {
  try {
    await connect(); // Säkerställ att databasen ansluter

    const url = new URL(request.url);

    // Parse page number från query string
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const itemsPerPage = 8;
    const skip = (page - 1) * itemsPerPage;

    // Fetch total count av nyheter
    const totalCount = await News.countDocuments();

    // Fetch news items med paginering
    const news = await News.find()
        .sort({ id: -1 })
        .limit(itemsPerPage)
        .skip(skip);

    // Returnera data
    return NextResponse.json({ news, totalCount });
  } catch (error: any) {
    console.error('Error in GET /api/news/allnews:', error);
    return NextResponse.json(
        { error: 'Error retrieving news data' },
        { status: 500 }
    );
  }
}
