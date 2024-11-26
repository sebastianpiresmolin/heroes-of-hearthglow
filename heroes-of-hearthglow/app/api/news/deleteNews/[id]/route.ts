import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../lib/dbconnect';
import { News } from '../../../../lib/data';

connect();

/**
 * @swagger
 * /api/news/deleteNews/{id}:
 *  delete:
 *    description: Delete a News item by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the news item to delete
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: 'News item deleted successfully'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: 'ID path parameter is missing'
 *      406:
 *        description: Invalid Format
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: 'Invalid ID format'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: 'News item not found or already deleted'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: 'Internal Server Error'
 */

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
      return new Response('Invalid ID format', { status: 406 });
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
