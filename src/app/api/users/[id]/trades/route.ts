import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(`[GET] /api/users/${params.id}/trades - Started`);
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', JSON.stringify(session?.user, null, 2));

    if (!session?.user) {
      console.log('No session found');
      return NextResponse.json(
        { error: 'You must be logged in to view trades' },
        { status: 401 }
      );
    }

    await connectDB();
    console.log('Database connected');

    // Find all trades where the user is either seller or buyer
    const trades = await Trade.find({
      $or: [
        { seller: params.id },
        { buyer: params.id }
      ]
    })
    .populate('seller', 'username')
    .populate('buyer', 'username')
    .sort({ createdAt: -1 })
    .lean();

    console.log(`Found ${trades.length} trades for user ${params.id}`);

    // Format trades to handle deleted users
    const formattedTrades = trades.map(trade => ({
      ...trade,
      seller: trade.seller || {
        _id: 'deleted',
        username: '[Deleted User]'
      },
      buyer: trade.buyer || null
    }));

    return NextResponse.json(formattedTrades);
  } catch (error) {
    console.error('Error fetching user trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}
