import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';

export async function GET() {
  try {
    await connectDB();
    
    const trades = await Trade.find()
      .populate('seller', 'username reputation totalTrades')
      .populate('buyer', 'username reputation totalTrades')
      .lean();
    
    return NextResponse.json(trades);
  } catch (error) {
    console.error('Error listing trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}
