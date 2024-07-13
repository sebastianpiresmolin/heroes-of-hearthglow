import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

export async function GET(request: NextRequest) {
  try {
    const news = await News.find().sort({ id: -1 }).limit(5); // Fetch 5 latest news items
    return NextResponse.json(news);
  } catch (error: any) {
    return NextResponse.error();
  }
}
