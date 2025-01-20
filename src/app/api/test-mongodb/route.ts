import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Trade from '@/lib/models/Trade';

export async function GET() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('Counting users...');
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users`);

    console.log('Counting trades...');
    const tradeCount = await Trade.countDocuments();
    console.log(`Found ${tradeCount} trades`);

    return NextResponse.json({
      success: true,
      counts: {
        users: userCount,
        trades: tradeCount
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { error: 'Database test failed', details: error.message },
      { status: 500 }
    );
  }
}
