import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    console.log('Starting signup process...');
    const { username, email, password } = await req.json();
    console.log('Received signup data:', { username, email, passwordLength: password?.length });

    // Validate input
    if (!username || !email || !password) {
      console.log('Missing required fields:', { username: !!username, email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database successfully');

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }]
    });

    if (existingUser) {
      console.log('User already exists:', { email: existingUser.email, username: existingUser.username });
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Password hashed successfully');

    // Create user
    console.log('Creating new user...');
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      totalTrades: 0,
      successRate: 0,
      reputation: 0,
      successfulTrades: 0,
    });
    console.log('User created successfully:', user._id.toString());

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/auth/signup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
