import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/auth/logout:
 *  get:
 *    description: Logout a user by clearing the JWT token cookie
 *    responses:
 *      200:
 *        description: Logout successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Logout successful"
 *                success:
 *                  type: boolean
 *                  example: true
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *              example:
 *                error: "Internal Server Error"
 */

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) }); // Clear token cookie effectively logging out

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
