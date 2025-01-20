import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { sendNotification } from '@/lib/services/notifications';

// Get all notifications for the current user
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const notifications = await db.collection('notifications')
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// Create a new notification
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const notification = await req.json();
    
    // Add userId and createdAt to the notification
    const newNotification = {
      ...notification,
      userId: session.user.id,
      createdAt: new Date(),
      read: false
    };

    // Save to database
    await db.collection('notifications').insertOne(newNotification);
    
    // Send real-time notification
    sendNotification(newNotification);

    return NextResponse.json(newNotification);
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
