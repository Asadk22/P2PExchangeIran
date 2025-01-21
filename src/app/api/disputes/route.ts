import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Dispute from '@/lib/models/Dispute';
import Trade from '@/lib/models/Trade';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';
import { AutoDisputeResolver } from '@/lib/services/AutoDisputeResolver';

export async function POST(req: any) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tradeId, reason } = await req.json();

    if (!tradeId || !reason) {
      return NextResponse.json(
        { error: 'Trade ID and reason are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const trade = await Trade.findById(tradeId)
      .populate('buyer', 'username')
      .populate('seller', 'username');

    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    // Check if user is part of the trade
    if (
      trade.buyer._id.toString() !== session.user.id &&
      trade.seller._id.toString() !== session.user.id
    ) {
      return NextResponse.json(
        { error: 'Not authorized to raise dispute for this trade' },
        { status: 403 }
      );
    }

    // Check if dispute already exists
    const existingDispute = await Dispute.findOne({ trade: tradeId });
    if (existingDispute) {
      return NextResponse.json(
        { error: 'Dispute already exists for this trade' },
        { status: 400 }
      );
    }

    const initiator: any = await User.findById(session.user.id);
    const respondent: any = await User.findById(
      trade.buyer._id.toString() === session.user.id
        ? trade.seller._id
        : trade.buyer._id
    );

    // Create dispute
    const dispute = new Dispute({
      trade: tradeId,
      initiator: session.user.id,
      respondent: respondent._id,
      reason,
    });

    // Update user statistics
    initiator.disputesInitiated = (initiator.disputesInitiated || 0) + 1;
    respondent.disputesReceived = (respondent.disputesReceived || 0) + 1;

    // Update trade status
    trade.status = 'disputed';

    // Try automated resolution
    const autoResolution = await AutoDisputeResolver.analyzeAndResolve(dispute);
    
    if (autoResolution.canAutoResolve) {
      dispute.status = 'resolved';
      dispute.resolution = autoResolution.resolution;
      dispute.adminNotes.push({
        note: `Auto-resolved: ${autoResolution.reason}`,
        timestamp: new Date(),
      });
    }

    // Save all changes
    await Promise.all([
      dispute.save(),
      trade.save(),
      initiator.save(),
      respondent.save(),
    ]);

    // Notify users via WebSocket
    if (req.socket?.server?.io) {
      req.socket.server.io.to(`user-${respondent._id}`).emit('dispute-created', {
        tradeId,
        disputeId: dispute._id,
      });
    }

    return NextResponse.json(dispute);
  } catch (error) {
    console.error('Create dispute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
