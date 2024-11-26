import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

/**
 * @swagger
 * /api/news/editNewsItem:
 *  patch:
 *    description: Update a News item by ID
 *    parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the news item to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: 'example'
 *              description:
 *                type: string
 *                example: 'example'
 *              image:
 *                type: string
 *                example: ''
 *              id:
 *                type: integer
 *                example: 0
 *              time:
 *                type: string
 *                format: date-time
 *                example: '2024-11-26'
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                id:
 *                  type: integer
 *                time:
 *                  type: string
 *                  format: date-time
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
 *                message: 'ID query parameter is missing'
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
 *                message: 'News item not found or update failed'
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
