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

    // Get total trades
    const totalTrades = await Trade.countDocuments({
      $or: [
        { seller: session.user.id },
        { buyer: session.user.id }
      ]
    });

    // Get completed trades for success rate
    const completedTrades = await Trade.countDocuments({
      $or: [
        { seller: session.user.id },
        { buyer: session.user.id }
      ],
      status: 'completed'
    });

    // Calculate success rate
    const successRate = totalTrades > 0 
      ? Math.round((completedTrades / totalTrades) * 100)
      : 100;

    // Get 30-day volume
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trades = await Trade.find({
      $or: [
        { seller: session.user.id },
        { buyer: session.user.id }
      ],
      status: 'completed',
      completedAt: { $gte: thirtyDaysAgo }
    });

    const volume30d = trades.reduce((sum, trade) => sum + trade.price, 0);

    // Get reputation (placeholder - implement your own logic)
    const reputation = 4.9; // Placeholder value

    return NextResponse.json({
      totalTrades,
      successRate,
      volume30d,
      reputation
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
