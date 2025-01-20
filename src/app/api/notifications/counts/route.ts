import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import Message from '@/lib/models/Message';
import Notification from '@/lib/models/Notification';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get active trades count
    const activeTrades = await Trade.countDocuments({
      $or: [
        { buyer: session.user.id, status: 'in_progress' },
        { seller: session.user.id, status: 'in_progress' },
      ],
    });

    // Get unread messages count
    const unreadMessages = await Message.countDocuments({
      recipient: session.user.id,
      read: false,
    });

    // Get unread notifications count
    const notifications = await Notification.countDocuments({
      user: session.user.id,
      read: false,
    });

    return NextResponse.json({
      activeTrades,
      unreadMessages,
      notifications,
    });
  } catch (error) {
    console.error('Error fetching notification counts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification counts' },
      { status: 500 }
    );
  }
}
