import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const trades = await Trade.find({
      $or: [
        { seller: session.user.id },
        { buyer: session.user.id }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

    const formattedTrades = trades.map(trade => ({
      _id: trade._id.toString(),
      type: trade.seller.toString() === session.user.id ? 'sell' : 'buy',
      amount: trade.amount,
      assetType: trade.assetType,
      price: trade.price,
      paymentMethod: trade.paymentMethod,
      createdAt: trade.createdAt.toISOString()
    }));

    return NextResponse.json(formattedTrades);
  } catch (error) {
    console.error('Error fetching recent trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent trades' },
      { status: 500 }
    );
  }
}
