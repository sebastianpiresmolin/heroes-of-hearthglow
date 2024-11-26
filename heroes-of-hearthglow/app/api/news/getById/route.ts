import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

/**
 * @swagger
 * /api/news/getById:
 *  get:
 *    description: Retrieve a news item by ID
 *    parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the news item to retrieve
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                    type: string
 *                    example: "67387d4be3e3bf49866874f0"
 *                id:
 *                  type: integer
 *                  example: 0
 *                title:
 *                  type: string
 *                  example: "example"
 *                description:
 *                  type: string
 *                  example: "example"
 *                image:
 *                  type: string
 *                  example: "image url"
 *                time:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-11-26T00:00:00Z"
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
 *                message: 'News item not found'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: 'Internal Server Error'
 */

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
