import { connect } from '@/app/lib/dbconnect';
import { User } from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { corsMiddleware } from '@/corsMiddleware';

export async function POST(request: NextRequest) {
  const corsHeaders = corsMiddleware(request);
  if (corsHeaders instanceof NextResponse) {
    return corsHeaders;
  } else if (corsHeaders) {
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers: corsHeaders });
    }
  } else {
    return NextResponse.json(
      { error: 'CORS policy violation' },
      { status: 403 }
    );
  }

  try {
    await connect();
    console.log('Database connected successfully');
    const reqBody = await request.json();
    const { username, password } = reqBody;

    console.log(`Attempting to find user: ${username}`);
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, 'i'),
    });

    if (!user) {
      console.log('User does not exist');
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const tokenData = { id: user._id, username: user.username };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error(`Error during login: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
