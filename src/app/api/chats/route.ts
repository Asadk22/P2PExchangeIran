import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to view chats' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find all trades where the user is either buyer or seller
    const trades = await Trade.aggregate([
      {
        $match: {
          $or: [
            { buyer: new ObjectId(session.user.id) },
            { seller: new ObjectId(session.user.id) }
          ]
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyerInfo'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'seller',
          foreignField: '_id',
          as: 'sellerInfo'
        }
      },
      {
        $lookup: {
          from: 'messages',
          let: { tradeId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$tradeId', '$$tradeId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 }
          ],
          as: 'lastMessage'
        }
      },
      {
        $lookup: {
          from: 'messages',
          let: { tradeId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$tradeId', '$$tradeId'] },
                senderId: { $ne: new ObjectId(session.user.id) },
                readBy: { $nin: [new ObjectId(session.user.id)] }
              }
            },
            { $count: 'unreadCount' }
          ],
          as: 'unreadMessages'
        }
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          asset: 1,
          status: 1,
          createdAt: 1,
          buyerInfo: { $arrayElemAt: ['$buyerInfo', 0] },
          sellerInfo: { $arrayElemAt: ['$sellerInfo', 0] },
          lastMessage: { $arrayElemAt: ['$lastMessage', 0] },
          unreadCount: {
            $ifNull: [
              { $arrayElemAt: ['$unreadMessages.unreadCount', 0] },
              0
            ]
          }
        }
      }
    ]).exec();

    // Transform trades into chat previews
    const chatPreviews = trades
      .filter(trade => trade.buyerInfo && trade.sellerInfo) // Filter out trades with missing user info
      .map(trade => {
        const isSeller = trade.sellerInfo._id.toString() === session.user.id;
        const otherUser = isSeller ? trade.buyerInfo : trade.sellerInfo;

        return {
          id: trade._id.toString(),
          tradeId: trade._id.toString(),
          lastMessage: trade.lastMessage ? {
            content: trade.lastMessage.content,
            timestamp: trade.lastMessage.createdAt
          } : null,
          unreadCount: trade.unreadCount || 0,
          participants: [
            {
              id: session.user.id,
              name: session.user.name || 'You'
            },
            {
              id: otherUser._id.toString(),
              name: otherUser.name || 'User'
            }
          ],
          trade: {
            type: isSeller ? 'sell' : 'buy',
            amount: trade.amount,
            asset: trade.asset,
            status: trade.status
          },
          timestamp: trade.lastMessage?.createdAt || trade.createdAt
        };
      });

    // Sort by most recent activity
    chatPreviews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(chatPreviews);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}
