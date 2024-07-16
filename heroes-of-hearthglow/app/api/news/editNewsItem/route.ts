import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';


connect();

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('ID query parameter is missing', { status: 400 });
    }

    const updates = await request.json();

    // Find the news item by ID and update it
    const updatedNewsItem = await News.findOneAndUpdate({ id: id }, updates, {
      new: true,
    });

    if (!updatedNewsItem) {
      return new Response('News item not found or update failed', {
        status: 404,
      });
    }

    return NextResponse.json(updatedNewsItem);
  } catch (error: any) {
    console.error('Error updating news item:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
