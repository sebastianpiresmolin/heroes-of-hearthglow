import { connect } from '@/app/lib/dbconnect';
import { User } from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connect();
    console.log('Database connected successfully');
    const reqBody = await request.json();
    const { username, password } = reqBody;

    console.log(`Attempting to find user: ${username}`);
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, 'i'),
    }); // Case-insensitive search

    if (!user) {
      console.log('User does not exist');
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    console.log(`User found: ${user.username}`);
    const validPassword = await bcryptjs.compare(password, user.password); // Compare hashed password
    if (!validPassword) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const tokenData = { id: user._id, username: user.username }; // Token payload
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d', // Token expires in 1 day
    });

    console.log('Token generated:', token);

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    response.cookies.set('token', token, { httpOnly: true }); // Set token in cookie

    return response;
  } catch (error: any) {
    console.error(`Error during login: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
