import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/dbconnect';
import { News } from '../../../lib/data';

connect();

/**
 * @swagger
 * /api/news/allNews:
 *  get:
 *    description: Returns every news item, paginated by 8 per page
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                news:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                        example: "67387d4be3e3bf49866874f0"
 *                      id:
 *                        type: integer
 *                        example: 7
 *                      title:
 *                        type: string
 *                        example: "Some news title"
 *                      description:
 *                        type: string
 *                        example: "Some Descriptive News Text"
 *                      image:
 *                        type: string
 *                        example: "https://image.api.playstation.com/vulcan/img/rnd/202102/1922/ajZXwKlWvBPfznci6hSGZoOr.png?w=1920&thumb=false"
 *                      time:
 *                        type: string
 *                        format: date
 *                        example: "2024-11-16"
 *                      __v:
 *                        type: integer
 *                        example: 0
 *      500:
 *        description: Internal Server Error
 */

export async function GET(request: NextRequest) {
  try {

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 8);

    const itemsPerPage = 8;
    const skip = (page - 1) * itemsPerPage;


    const totalCount = await News.countDocuments();


    const news = await News.find()
      .sort({ id: -1 })
      .limit(itemsPerPage)
      .skip(skip);


    return NextResponse.json({ news, totalCount });
  } catch (error: any) {
    return NextResponse.error();
  }
}
