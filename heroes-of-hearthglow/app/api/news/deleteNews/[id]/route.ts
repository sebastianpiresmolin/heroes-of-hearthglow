import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../lib/dbconnect';
import { News } from '../../../../lib/data';

connect();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new Response('ID path parameter is missing', { status: 400 });
    }

    const numericId = Number(id);

    if (isNaN(numericId)) {
      return new Response('Invalid ID format', { status: 400 });
    }

    const deleteResult = await News.deleteOne({ id: numericId });

    if (!deleteResult.deletedCount) {
      return new Response('News item not found or already deleted', {
        status: 404,
      });
    }

    return new Response('News item deleted successfully', { status: 200 });
  } catch (error: any) {
    console.error('Error deleting news item:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
