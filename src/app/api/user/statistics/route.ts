import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const client = await clientPromise;
    const db = client.db();

    // Get current month's start and end dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get monthly statistics
    const monthlyTrades = await db.collection('trades').find({
      $or: [
        { buyerId: new ObjectId(session.user.id) },
        { sellerId: new ObjectId(session.user.id) }
      ],
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    }).toArray();

    // Calculate monthly stats
    const monthlyStats = {
      btc: { amount: 0, trades: 0 },
      usdt: { amount: 0, trades: 0 },
      eth: { amount: 0, trades: 0 },
      usdc: { amount: 0, trades: 0 }
    };

    monthlyTrades.forEach(trade => {
      const asset = trade.assetType.toLowerCase();
      if (monthlyStats[asset]) {
        monthlyStats[asset].amount += trade.amount;
        monthlyStats[asset].trades += 1;
      }
    });

    // Get successful trades count
    const successfulTrades = {
      btc: await db.collection('trades').countDocuments({
        $or: [
          { buyerId: new ObjectId(session.user.id) },
          { sellerId: new ObjectId(session.user.id) }
        ],
        status: 'completed',
        assetType: 'BTC'
      }),
      usdt: await db.collection('trades').countDocuments({
        $or: [
          { buyerId: new ObjectId(session.user.id) },
          { sellerId: new ObjectId(session.user.id) }
        ],
        status: 'completed',
        assetType: 'USDT'
      }),
      eth: await db.collection('trades').countDocuments({
        $or: [
          { buyerId: new ObjectId(session.user.id) },
          { sellerId: new ObjectId(session.user.id) }
        ],
        status: 'completed',
        assetType: 'ETH'
      }),
      usdc: await db.collection('trades').countDocuments({
        $or: [
          { buyerId: new ObjectId(session.user.id) },
          { sellerId: new ObjectId(session.user.id) }
        ],
        status: 'completed',
        assetType: 'USDC'
      })
    };

    // Get last 5 successful trades
    const lastSuccessfulTrades = await db.collection('trades')
      .find({
        $or: [
          { buyerId: new ObjectId(session.user.id) },
          { sellerId: new ObjectId(session.user.id) }
        ],
        status: 'completed'
      })
      .sort({ updatedAt: -1 })
      .limit(5)
      .toArray();

    // Get top offers by success rate
    const topOffers = await db.collection('offers')
      .find({
        userId: new ObjectId(session.user.id),
        status: 'active'
      })
      .sort({ successRate: -1 })
      .limit(5)
      .toArray();

    // Get expired offers
    const expiredOffers = await db.collection('offers')
      .find({
        userId: new ObjectId(session.user.id),
        status: 'expired'
      })
      .sort({ updatedAt: -1 })
      .limit(5)
      .toArray();

    // Get payment methods usage
    const paymentMethods = await db.collection('paymentMethods')
      .aggregate([
        {
          $match: {
            userId: new ObjectId(session.user.id)
          }
        },
        {
          $lookup: {
            from: 'trades',
            localField: '_id',
            foreignField: 'paymentMethodId',
            as: 'trades'
          }
        },
        {
          $project: {
            method: 1,
            usageCount: { $size: '$trades' }
          }
        }
      ]).toArray();

    // Get recently trusted users
    const trustedUsers = await db.collection('users')
      .aggregate([
        {
          $match: {
            'trustedBy': new ObjectId(session.user.id)
          }
        },
        {
          $lookup: {
            from: 'trades',
            let: { userId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ['$buyerId', '$$userId'] },
                      { $eq: ['$sellerId', '$$userId'] }
                    ]
                  }
                }
              }
            ],
            as: 'trades'
          }
        },
        {
          $project: {
            id: '$_id',
            username: 1,
            tradesCount: { $size: '$trades' },
            lastTrade: { $max: '$trades.createdAt' }
          }
        },
        {
          $sort: { tradesCount: -1 }
        },
        {
          $limit: 5
        }
      ]).toArray();

    return NextResponse.json({
      monthlyStats,
      successfulTrades,
      topOffers: topOffers.map(offer => ({
        id: offer._id.toString(),
        type: offer.type,
        assetType: offer.assetType,
        successRate: offer.successRate
      })),
      expiredOffers: expiredOffers.map(offer => ({
        id: offer._id.toString(),
        type: offer.type,
        assetType: offer.assetType,
        expiredAt: offer.updatedAt
      })),
      paymentMethods: paymentMethods.map(pm => ({
        method: pm.method,
        usageCount: pm.usageCount
      })),
      lastSuccessfulTrades: lastSuccessfulTrades.map(trade => ({
        id: trade._id.toString(),
        type: trade.type,
        assetType: trade.assetType,
        amount: trade.amount,
        completedAt: trade.updatedAt
      })),
      trustedUsers: trustedUsers.map(user => ({
        id: user.id.toString(),
        username: user.username,
        tradesCount: user.tradesCount,
        lastTrade: user.lastTrade
      }))
    });
  } catch (error) {
    console.error('Error in statistics API:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
