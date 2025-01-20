import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';

export async function GET() {
  try {
    await connectDB();
    
    // Try to count trades
    const tradeCount = await Trade.countDocuments();
    
    return NextResponse.json({
      status: 'Connected to MongoDB successfully',
      tradeCount,
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: error.message },
      { status: 500 }
    );
  }
}
