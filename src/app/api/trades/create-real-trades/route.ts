import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import User from '@/lib/models/User';

const PAYMENT_METHODS = [
  'bank_transfer',
  'perfect_money',
  'cash_deposit',
  'wise',
  'paypal'
];

const LOCATIONS = [
  'tehran',
  'mashhad',
  'isfahan',
  'shiraz',
  'tabriz'
];

const CRYPTO_TYPES = [
  { type: 'BTC', minAmount: 0.001, maxAmount: 2, priceRange: [1200000000, 1400000000] },
  { type: 'ETH', minAmount: 0.01, maxAmount: 20, priceRange: [80000000, 100000000] },
  { type: 'USDT', minAmount: 100, maxAmount: 10000, priceRange: [45000, 47000] }
];

export async function POST() {
  let db;
  try {
    console.log('Connecting to database...');
    db = await connectDB();
    console.log('Database connected:', db.connection.name);

    // Get all users from the database
    console.log('Fetching users...');
    const users = await User.find({}).lean();
    console.log(`Found ${users.length} users:`, users.map(u => ({ id: u._id, email: u.email })));
    
    if (users.length < 2) {
      return NextResponse.json(
        { error: 'Not enough users in the database' },
        { status: 400 }
      );
    }

    const newTrades = [];
    const currentDate = new Date();

    // Create 10 trades
    console.log('Creating trades...');
    for (let i = 0; i < 10; i++) {
      try {
        // Randomly select seller
        const seller = users[Math.floor(Math.random() * users.length)];
        console.log('Selected seller:', { id: seller._id, email: seller.email });
        
        // Select crypto type and calculate amount and price
        const crypto = CRYPTO_TYPES[Math.floor(Math.random() * CRYPTO_TYPES.length)];
        const amount = (Math.random() * (crypto.maxAmount - crypto.minAmount) + crypto.minAmount).toFixed(
          crypto.type === 'USDT' ? 0 : 4
        );
        const price = Math.floor(
          Math.random() * (crypto.priceRange[1] - crypto.priceRange[0]) + crypto.priceRange[0]
        );

        const tradeData = {
          type: Math.random() > 0.5 ? 'buy' : 'sell',
          assetType: crypto.type,
          amount: amount.toString(),
          price: price.toString(),
          paymentMethod: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
          location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
          terms: "Fast and secure trade. Please have payment ready.",
          seller: new mongoose.Types.ObjectId(seller._id),
          createdAt: new Date(currentDate.getTime() - Math.random() * 24 * 60 * 60 * 1000),
          status: 'active'
        };

        console.log('Creating trade with data:', JSON.stringify(tradeData, null, 2));
        
        // Create trade using the model directly
        const trade = new Trade(tradeData);
        const savedTrade = await trade.save();
        console.log('Trade saved:', savedTrade._id);
        
        newTrades.push(savedTrade);
      } catch (error) {
        console.error('Error creating individual trade:', error);
      }
    }

    console.log(`Successfully created ${newTrades.length} trades`);
    return NextResponse.json({
      message: 'Successfully created trades',
      trades: newTrades.map(t => ({
        id: t._id,
        type: t.type,
        assetType: t.assetType,
        amount: t.amount,
        price: t.price,
        seller: t.seller
      }))
    });
  } catch (error) {
    console.error('Error creating trades:', error);
    return NextResponse.json(
      { error: 'Failed to create trades', details: error.message },
      { status: 500 }
    );
  } finally {
    if (db) {
      await db.disconnect();
    }
  }
}
