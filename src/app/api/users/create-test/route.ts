import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

const TEST_USERS = [
  {
    username: 'CryptoTrader',
    email: 'trader1@example.com',
    password: 'test123',
    totalTrades: 45,
    successRate: 98
  },
  {
    username: 'IranBTC',
    email: 'iranbtc@example.com',
    password: 'test123',
    totalTrades: 156,
    successRate: 99
  },
  {
    username: 'TehranCrypto',
    email: 'tehran@example.com',
    password: 'test123',
    totalTrades: 89,
    successRate: 97
  },
  {
    username: 'FastTrade',
    email: 'fast@example.com',
    password: 'test123',
    totalTrades: 67,
    successRate: 96
  },
  {
    username: 'CryptoMaster',
    email: 'master@example.com',
    password: 'test123',
    totalTrades: 234,
    successRate: 99
  }
];

export async function POST() {
  try {
    await connectDB();

    const createdUsers = [];

    for (const userData of TEST_USERS) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // Create user
        const newUser = await User.create({
          ...userData,
          password: hashedPassword,
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        createdUsers.push(newUser);
      }
    }

    return NextResponse.json({
      message: `Successfully created ${createdUsers.length} users`,
      users: createdUsers.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email
      }))
    });
  } catch (error) {
    console.error('Error creating test users:', error);
    return NextResponse.json(
      { error: 'Failed to create test users' },
      { status: 500 }
    );
  }
}
