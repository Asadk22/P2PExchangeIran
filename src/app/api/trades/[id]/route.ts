import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import Trade from '@/lib/models/Trade';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function GET(
  // req: Request,
  req: any,
  // { params }: { params: { id: string } }
) {
  const  params : any  = req.nextUrl.pathname.split('/').pop();
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to view trades' },
        { status: 401 }
      );
    }

    await connectDB();

    const trade = await Trade.aggregate([
      {
        $match: {
          _id: new ObjectId(params.id)
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
        $project: {
          _id: 1,
          amount: 1,
          asset: 1,
          status: 1,
          createdAt: 1,
          buyer: { $arrayElemAt: ['$buyerInfo', 0] },
          seller: { $arrayElemAt: ['$sellerInfo', 0] }
        }
      }
    ]).exec();

    if (!trade || trade.length === 0) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    // Check if user is part of this trade
    const tradeData = trade[0];
    const userId = session.user.id;
    
    if (
      userId !== tradeData.buyer?._id.toString() &&
      userId !== tradeData.seller?._id.toString()
    ) {
      return NextResponse.json(
        { error: 'You do not have permission to view this trade' },
        { status: 403 }
      );
    }

    return NextResponse.json(tradeData);
  } catch (error) {
    console.error('Error fetching trade:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trade' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: any,
  // { params }: { params: { id: string } }
) {
  const  params : any = req.nextUrl.pathname.split('/').pop();
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to update a trade' },
        { status: 401 }
      );
    }

    await connectDB();

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

    // If seller is missing, try to find them
    if (!trade.seller) {
      const seller = await User.findOne({ _id: trade.userId || trade.seller });
      if (seller) {
        trade.seller = seller._id;
      } else {
        return NextResponse.json(
          { error: 'Trade has no valid seller' },
          { status: 404 }
        );
      }
    }

    // Check if the user is the seller
    const sellerId = trade.seller.toString();
    if (sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'You do not have permission to update this trade' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const allowedUpdates = ['status', 'price', 'amount', 'terms'];
    const updates = Object.keys(body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = body[key];
        return obj;
      }, {} as any);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    // Save the updated trade
    Object.assign(trade, updates);
    await trade.save();

    // Populate seller and buyer
    await trade.populate('seller', 'username totalTrades successRate createdAt');
    if (trade.buyer) {
      await trade.populate('buyer', 'username');
    }

    return NextResponse.json({
      _id: trade._id.toString(),
      type: trade.type,
      assetType: trade.assetType || trade.cryptocurrency,
      amount: trade.amount,
      price: trade.price,
      status: trade.status || 'open',
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
    });
  } catch (error) {
    console.error('Error updating trade:', error);
    return NextResponse.json(
      { error: 'Failed to update trade' },
      { status: 500 }
    );
  }
}
