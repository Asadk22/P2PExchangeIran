import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Trade from '@/lib/models/Trade';
import Dispute from '@/lib/models/Dispute';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get all completed trades
    const trades = await Trade.find({
      status: 'completed',
    }).sort({ createdAt: -1 });

    // Calculate total trading volume
    const tradingVolume = trades.reduce((sum: any, trade) => sum + trade.amount, 0);

    // Get successful trades
    const successfulTrades = trades.filter(
      (trade) => trade.status === 'completed'
    ).length;

    // Get disputed trades
    const disputes = await Dispute.countDocuments();
    const disputeRate = (disputes / trades.length) * 100;

    // Get recent prices for chart
    const recentPrices = await Trade.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          price: { $avg: '$pricePerUnit' },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          date: '$_id',
          price: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json({
      totalTrades: trades.length,
      successfulTrades,
      tradingVolume,
      disputeRate,
      recentPrices,
    });
  } catch (error) {
    console.error('Trading stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
