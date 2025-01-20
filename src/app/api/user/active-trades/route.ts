import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find trades where the user is either seller or buyer
    const trades = await Trade.find({
      $or: [
        { seller: session.user.id },
        { userId: session.user.id },
        { buyer: session.user.id }
      ],
      status: { $in: ['active', 'in_progress'] }
    })
    .populate('seller', 'username')
    .populate('userId', 'username')
    .populate('buyer', 'username')
    .sort({ updatedAt: -1 });

    // Format trades with latest message
    const formattedTrades = trades.map(trade => {
      const latestMessage = trade.messages?.[trade.messages.length - 1];
      return {
        _id: trade._id,
        type: trade.type,
        amount: trade.amount,
        assetType: trade.assetType || trade.cryptocurrency,
        price: trade.price,
        status: trade.status,
        seller: trade.seller?.username || trade.userId?.username || 'Unknown User',
        buyer: trade.buyer?.username || 'Not Joined',
        latestMessage: latestMessage ? {
          content: latestMessage.content,
          timestamp: latestMessage.timestamp,
          isUnread: false // TODO: Implement message read status
        } : null,
        updatedAt: trade.updatedAt
      };
    });

    return NextResponse.json(formattedTrades);
  } catch (error) {
    console.error('Error fetching active trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active trades' },
      { status: 500 }
    );
  }
}
