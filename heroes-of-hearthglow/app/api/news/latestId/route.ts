import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

/**
 * @swagger
 * /api/news/latestId:
 *  get:
 *    description: Retrieve the latest news item's ID
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
 *                  id:
 *                    type: integer
 *                    example: 0
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example: 'Internal Server Error'
 */

export async function GET(request: NextRequest) {
  try {
    const news = await News.find().sort({ id: -1 }).limit(1).select('id');
    return NextResponse.json(news);
  } catch (error: any) {
    return NextResponse.error();
  }
}
