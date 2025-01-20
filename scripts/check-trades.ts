import connectDB from '../src/lib/db';
import Trade from '../src/lib/models/Trade';

async function checkTrades() {
  try {
    await connectDB();
    const trades = await Trade.find({}).exec();
    console.log('Total trades:', trades.length);
    console.log('Trades:', JSON.stringify(trades, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

checkTrades();
