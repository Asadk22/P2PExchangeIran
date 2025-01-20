import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../src/lib/models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iran-p2p-exchange';

async function createTestUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing test user if any
    await User.deleteOne({ email: 'test@example.com' });

    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const user = await User.create({
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    });

    console.log('Created test user:', user);
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createTestUser();
