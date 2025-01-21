import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { connectDB } from '@/lib/db';
import Dispute from '@/lib/models/Dispute';
import Trade from '@/lib/models/Trade';
import mongoose from 'mongoose';

export async function POST(
  // req: Request,
  req: any,
  // { params }: { params: { id: string } }
) {
  const  params : any   = req.nextUrl.pathname.split('/').pop(); 
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!session.user.isAdmin) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await connectDB();

    // Convert string ID to ObjectId
    const disputeId = new mongoose.Types.ObjectId(params.id);
    // const disputeId = new mongoose.Schema.ObjectId(params.id);
    const dispute: any = await Dispute.findById(disputeId)
      .populate('trade')
      .populate('initiator')
      .populate('respondent')
      .lean()
      .exec();

    if (!dispute) {
      return new NextResponse('Dispute not found', { status: 404 });
    }

    const { resolution } = await req.json();

    // Update dispute
    await Dispute.findByIdAndUpdate(disputeId, {
      status: 'resolved',
      resolution,
      resolvedBy: session.user.id,
      resolvedAt: new Date(),
    });

    // Update trade status
    // const tradeId = new mongoose.Types.ObjectId(dispute?.trade._id);
    // await Trade.findByIdAndUpdate(tradeId, {
    //   status: resolution === 'buyer' ? 'completed' : 'cancelled',
    // });

    return new NextResponse('Dispute resolved', { status: 200 });
  } catch (error) {
    console.error('Error resolving dispute:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
