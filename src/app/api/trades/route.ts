import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import Trade from '@/lib/models/Trade';
import Notification from '@/lib/models/Notification';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

const VALID_TRADE_TYPES = ['crypto', 'fiat'];
const VALID_CRYPTO_ASSETS = ['BTC', 'ETH', 'USDT'];
const VALID_FIAT_ASSETS = ['USD', 'EUR', 'GBP'];
const VALID_PAYMENT_METHODS = [
  'shaparak',
  'shetab',
  'paypal',
  'bank_transfer',
  'cash_deposit',
  'card_to_card',
  'perfect_money',
  'wise'
];

export async function GET(req: Request) {
  console.log('[GET] /api/trades - Started');
  try {
    await connectDB();
    console.log('Database connected');

    const { searchParams } = new URL(req.url);
    const query: any = {};

    // Get pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    // Apply filters if they exist
    const tradeType = searchParams.get('tradeType');
    const assetType = searchParams.get('assetType');
    const paymentMethod = searchParams.get('paymentMethod');
    const minAmount = searchParams.get('minAmount');
    const maxAmount = searchParams.get('maxAmount');
    const status = searchParams.get('status');

    // Only filter by status if explicitly provided
    if (status) {
      query.status = status;
    } else {
      // By default, show active trades
      query.status = { $ne: 'cancelled' };
    }

    if (tradeType && tradeType !== 'all') {
      query.type = tradeType;
    }

    if (assetType && assetType !== 'all') {
      query.assetType = assetType;
    }

    if (paymentMethod && paymentMethod !== 'all') {
      query.paymentMethod = paymentMethod;
    }

    if (minAmount) {
      query.amount = { $gte: minAmount };
    }

    if (maxAmount) {
      query.amount = { ...query.amount, $lte: maxAmount };
    }

    // Log all trades count first
    const allTradesCount = await Trade.countDocuments({});
    console.log('Total trades in database (all statuses):', allTradesCount);

    // Log counts by status
    const statusCounts = await Trade.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    console.log('Trades by status:', statusCounts);

    console.log('Applied query filters:', JSON.stringify(query, null, 2));

    // Get total count for pagination with current filters
    const totalTrades = await Trade.countDocuments(query);
    console.log('Total trades matching filters:', totalTrades);

    // Fetch trades with pagination
    const trades = await Trade.find(query)
      .populate('seller', 'username totalTrades successRate')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    console.log(`Fetched ${trades.length} trades for current page`);

    // Map trades and handle missing seller information
    const formattedTrades = trades.map(trade => {
      // If seller is missing, provide default values
      const seller = trade.seller || {
        _id: 'deleted',
        username: '[Deleted User]',
        totalTrades: 0,
        successRate: 0
      };

      return {
        _id: trade._id,
        type: trade.type,
        assetType: trade.assetType,
        amount: trade.amount,
        price: trade.price,
        paymentMethod: trade.paymentMethod,
        location: trade.location,
        terms: trade.terms,
        seller,
        status: trade.status,
        createdAt: trade.createdAt,
      };
    });

    // Return pagination metadata along with trades
    return NextResponse.json({
      trades: formattedTrades,
      pagination: {
        total: totalTrades,
        page,
        limit,
        pages: Math.ceil(totalTrades / limit)
      },
      statusCounts: statusCounts
    });
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to create a trade' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const {
      type,
      assetType,
      amount,
      price,
      paymentMethod,
      location,
      terms
    } = body;

    // Validate required fields
    const requiredFields = {
      type,
      assetType,
      amount,
      price,
      paymentMethod,
      location
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value && value !== 0)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields
        },
        { status: 400 }
      );
    }

    // Validate that seller exists before creating trade
    const sellerExists = await User.findById(session.user.id);
    if (!sellerExists) {
      return NextResponse.json(
        { error: 'Invalid seller account' },
        { status: 400 }
      );
    }

    // Create the trade
    const trade = await Trade.create({
      type,
      assetType,
      amount,
      price,
      paymentMethod,
      location,
      terms,
      seller: session.user.id,
      status: 'active'
    });

    await trade.populate('seller', 'username reputation');

    return NextResponse.json(
      { message: 'Trade created successfully', trade },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating trade:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create trade' },
      { status: 500 }
    );
  }
}
