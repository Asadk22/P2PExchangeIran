import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Trade from '@/lib/models/Trade';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectDB();

    // Create a sample user if not exists
    let user: any = await User.findOne({ email: 'demo@example.com' });
    if (!user) {
      const hashedPassword = await bcrypt.hash('demo123', 10);
      user = await User.create({
        username: 'demo_seller',
        email: 'demo@example.com',
        password: hashedPassword,
        reputation: 4.5,
        totalTrades: 10,
        successfulTrades: 8,
        tradingVolume: 1000000000, // 1B IRR
        disputesInitiated: 1,
        disputesReceived: 1,
      });
    }

    // Create a sample trade
    const trade = await Trade.create({
      seller: user._id,
      tradeType: 'crypto',
      assetType: 'BTC',
      amount: 0.5,
      pricePerUnit: 1000000000, // 1 billion IRR
      totalPrice: 500000000, // 500 million IRR
      currency: 'IRR',
      status: 'open',
      paymentMethod: 'bank_transfer',
      paymentWindow: 30,
      termsAndConditions: 'Sample terms and conditions',
      location: 'Tehran',
    });

    // Add trade to user's trades
    await User.findByIdAndUpdate(user._id, {
      $push: { trades: trade._id }
    });

    return NextResponse.json({
      message: 'Sample data created successfully',
      trade,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        reputation: user.reputation,
        totalTrades: user.totalTrades,
      },
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}
