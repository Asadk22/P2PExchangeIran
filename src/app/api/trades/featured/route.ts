import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Get 5 most recent active trades
    const trades = await db.collection('trades')
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Get seller information for each trade
    const sellerIds = trades.map(trade => trade.sellerId);
    const sellers = await db.collection('users')
      .find({ _id: { $in: sellerIds } })
      .toArray()
      .then(sellers => sellers.reduce((acc, seller) => {
        acc[seller._id.toString()] = seller;
        return acc;
      }, {}));

    // Format the trades for display with null checks
    const formattedTrades = trades.map(trade => {
      const seller = sellers[trade.sellerId.toString()] || {};
      return {
        id: trade._id.toString(),
        type: trade.type,
        assetType: trade.assetType,
        amount: trade.amount,
        price: trade.price,
        paymentMethod: trade.paymentMethod,
        location: trade.location,
        seller: {
          username: seller.username || 'Unknown User',
          totalTrades: seller.totalTrades || 0,
          successRate: seller.successRate || 0
        }
      };
    });

    return NextResponse.json(formattedTrades);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured trades', details: error.message },
      { status: 500 }
    );
  }
}
