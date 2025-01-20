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

    const { action } = await req.json();
    await connectDB();

    const trade = await Trade.findById(params.id)
      .populate('seller', 'username')
      .populate('buyer', 'username');

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    const isUserSeller = session.user.id === trade.seller._id.toString();
    const isUserBuyer = trade.buyer && session.user.id === trade.buyer._id.toString();

    switch (action) {
      case 'buy':
        if (isUserSeller) {
          return NextResponse.json(
            { error: 'Cannot buy your own trade' },
            { status: 400 }
          );
        }
        if (trade.status !== 'open') {
          return NextResponse.json(
            { error: 'Trade is not open' },
            { status: 400 }
          );
        }

        trade.buyer = session.user.id;
        trade.status = 'in_progress';
        break;

      case 'fund-escrow':
        if (!isUserSeller) {
          return NextResponse.json(
            { error: 'Only seller can fund escrow' },
            { status: 403 }
          );
        }
        if (trade.status !== 'open') {
          return NextResponse.json(
            { error: 'Trade must be open to fund escrow' },
            { status: 400 }
          );
        }

        trade.escrowStatus = 'funded';
        break;

      case 'confirm-payment':
        if (!isUserBuyer) {
          return NextResponse.json(
            { error: 'Only buyer can confirm payment' },
            { status: 403 }
          );
        }
        if (trade.status !== 'in_progress') {
          return NextResponse.json(
            { error: 'Trade must be in progress' },
            { status: 400 }
          );
        }

        trade.status = 'payment_confirmed';
        break;

      case 'release':
        if (!isUserSeller) {
          return NextResponse.json(
            { error: 'Only seller can release funds' },
            { status: 403 }
          );
        }
        if (trade.status !== 'in_progress' || trade.escrowStatus !== 'funded') {
          return NextResponse.json(
            { error: 'Trade must be in progress and funded' },
            { status: 400 }
          );
        }

        trade.status = 'completed';
        trade.escrowStatus = 'released';
        break;

      case 'dispute':
        if (!isUserBuyer && !isUserSeller) {
          return NextResponse.json(
            { error: 'Only trade participants can raise disputes' },
            { status: 403 }
          );
        }
        if (!['in_progress', 'completed'].includes(trade.status)) {
          return NextResponse.json(
            { error: 'Cannot dispute trade in current status' },
            { status: 400 }
          );
        }

        trade.status = 'disputed';
        break;

      case 'cancel':
        if (!isUserSeller) {
          return NextResponse.json(
            { error: 'Only seller can cancel trade' },
            { status: 403 }
          );
        }
        if (trade.status !== 'open') {
          return NextResponse.json(
            { error: 'Can only cancel open trades' },
            { status: 400 }
          );
        }

        trade.status = 'cancelled';
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    trade.lastStatusUpdate = new Date();
    await trade.save();

    // Emit trade update via WebSocket
    if (req.socket?.server?.io) {
      req.socket.server.io.to(`trade-${trade._id}`).emit('trade-updated', trade);
    }

    return NextResponse.json(trade);
  } catch (error) {
    console.error('Trade action error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
