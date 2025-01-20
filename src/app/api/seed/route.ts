import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Trade.deleteMany({});
    await User.deleteMany({});

    // Create test sellers
    const hashedPassword = await bcrypt.hash('testpassword123', 10);
    const sellers = await User.create([
      {
        username: 'testSeller',
        email: 'test@example.com',
        password: hashedPassword,
        totalTrades: 50,
        successRate: 98
      }
    ]);

    // Create sample trades
    const sampleTrades = [
      {
        type: 'sell',
        assetType: 'BTC',
        amount: '0.5',
        price: '1500000000',
        paymentMethod: 'Bank Transfer',
        location: 'Tehran',
        status: 'active',
        seller: sellers[0]._id
      },
      {
        type: 'buy',
        assetType: 'ETH',
        amount: '5',
        price: '900000000',
        paymentMethod: 'Cash',
        location: 'Isfahan',
        status: 'active',
        seller: sellers[0]._id
      },
      {
        type: 'sell',
        assetType: 'USDT',
        amount: '1000',
        price: '45000000',
        paymentMethod: 'Online Payment',
        location: 'Shiraz',
        status: 'active',
        seller: sellers[0]._id
      }
    ];

    const trades = await Trade.create(sampleTrades);
    console.log('Created trades:', trades);

    return NextResponse.json({ 
      message: 'Sample data created successfully',
      trades: trades.map(t => t._id),
      sellers: sellers.map(s => s._id)
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed data', details: error.message },
      { status: 500 }
    );
  }
}
