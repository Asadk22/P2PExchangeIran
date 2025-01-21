import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import User from '@/lib/models/User';

export async function POST(
  // request: Request,
  request: NextRequest,
  // { params }: { params: { id: string } }
) {
  const  params : any   = request.nextUrl.pathname.split('/').pop(); 
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to join a trade' },
        { status: 401 }
      );
    }

    await connectDB();
    console.log('Database connected');

    const trade:any = await Trade.findById(params.id);
    
    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    // Convert old schema to new schema
    if (trade.cryptocurrency) {
      trade.assetType = trade.cryptocurrency;
      delete trade.cryptocurrency;
    }

    if (trade.userId) {
      trade.seller = trade.userId;
      delete trade.userId;
    }

    // Check if user is not the seller
    if (trade.seller.toString() === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot join your own trade' },
        { status: 400 }
      );
    }

    // Check if trade is open
    if (trade.status !== 'open' && trade.status !== 'active') {
      return NextResponse.json(
        { error: 'This trade is no longer open' },
        { status: 400 }
      );
    }

    // Update trade with buyer and change status
    trade.buyer = session.user.id;
    trade.status = 'in_progress';
    await trade.save();

    // Populate seller and buyer
    await trade.populate('seller', 'username totalTrades successRate createdAt');
    await trade.populate('buyer', 'username');

    // Format the trade data
    const formattedTrade = {
      _id: trade._id.toString(),
      type: trade.type,
      assetType: trade.assetType || trade.cryptocurrency,
      amount: trade.amount,
      price: trade.price,
      status: trade.status,
      paymentMethod: trade.paymentMethod,
      location: trade.location,
      terms: trade.terms || '',
      seller: trade.seller ? {
        _id: trade.seller._id.toString(),
        username: trade.seller.username,
        totalTrades: trade.seller.totalTrades || 0,
        successRate: trade.seller.successRate || 100,
        createdAt: trade.seller.createdAt,
      } : {
        _id: 'deleted',
        username: 'Deleted User',
        totalTrades: 0,
        successRate: 0,
        createdAt: new Date(),
      },
      buyer: trade.buyer ? {
        _id: trade.buyer._id.toString(),
        username: trade.buyer.username,
      } : undefined,
    };

    return NextResponse.json(formattedTrade);
  } catch (error) {
    console.error('Error joining trade:', error);
    return NextResponse.json(
      { error: 'Failed to join trade' },
      { status: 500 }
    );
  }
}
