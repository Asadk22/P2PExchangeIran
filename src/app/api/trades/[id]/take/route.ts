import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Trade from '@/lib/models/Trade';
import connectDB from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const trade = await Trade.findById(params.id);
    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    if (trade.status !== 'open') {
      return NextResponse.json(
        { error: 'Trade is not available' },
        { status: 400 }
      );
    }

    if (trade.seller.toString() === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot take your own trade' },
        { status: 400 }
      );
    }

    trade.buyer = session.user.id;
    trade.status = 'in_progress';
    await trade.save();

    return NextResponse.json(trade);
  } catch (error) {
    console.error('Take trade error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
