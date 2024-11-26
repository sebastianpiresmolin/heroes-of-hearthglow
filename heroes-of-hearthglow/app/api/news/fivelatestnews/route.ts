import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

/**
 * @swagger
 * /api/news/fivelatestnews:
 *  get:
 *    description: Retrieve the latest 5 news items
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: "67387d4be3e3bf49866874f0"
 *                  title:
 *                    type: string
 *                    example: "example"
 *                  description:
 *                    type: string
 *                    example: "example"
 *                  image:
 *                    type: string
 *                    example: "image url"
 *                  id:
 *                    type: integer
 *                    example: 0
 *                  time:
 *                    type: string
 *                    format: date-time
 *                    example: "2024-11-26T00:00:00Z"
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
    const news = await News.find().sort({ id: -1 }).limit(5); // Fetch 5 latest news items
    return NextResponse.json(news);
  } catch (error: any) {
    return NextResponse.error();
  }
}
