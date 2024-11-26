import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';
import { corsMiddleware } from '@/corsMiddleware';

/**
 * @swagger
 * /api/news/createNews:
 *  post:
 *    description: Create a new News item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "title"
 *              description:
 *                type: string
 *                example: "description"
 *              image:
 *                type: string
 *                example: "image url"
 *              id:
 *                type: integer
 *                example: 0
 *              time:
 *                type: string
 *                format: date-time
 *                example: "2024-11-16T00:00:00Z"
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'News item saved successfully'
 *                status:
 *                  type: integer
 *                  example: 200
 *      403:
 *        description: CORS policy violation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: 'CORS policy violation'
 *                status:
 *                  type: integer
 *                  example: 403
 *      500:
 *        description: Failed to save news item
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: 'Failed to save news item'
 *                status:
 *                  type: integer
 *                  example: 500
 */
export async function POST(request: NextRequest) {
    const corsHeaders = corsMiddleware(request);
    if (!corsHeaders) {
      return NextResponse.json(
        { error: 'CORS policy violation' },
        { status: 403 }
      );
    }
  
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers: corsHeaders as Headers });
    }
  
    try {
      await connect();
      console.log('Database connected successfully');
      const reqBody = await request.json();
      const newsItem = new News(reqBody);
  
      await newsItem.save();
      console.log('News item saved successfully');
  
      return NextResponse.json(
        { message: 'News item saved successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Failed to save news item:', error);
      return NextResponse.json(
        { error: 'Failed to save news item' },
        { status: 500 }
      );
    }
  }