import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Dispute from '@/lib/models/Dispute';
import connectDB from '@/lib/db';

export async function GET(req: any) {
  try {
    const session = await getServerSession();
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const query = status ? { status } : {};

    const disputes = await Dispute.find(query)
      .populate('trade', 'amount assetType status')
      .populate('initiator', 'username')
      .populate('respondent', 'username')
      .sort({ createdAt: -1 });

    return NextResponse.json(disputes);
  } catch (error) {
    console.error('Fetch disputes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
