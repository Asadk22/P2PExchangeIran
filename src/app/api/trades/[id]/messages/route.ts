import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';
import Message from '@/lib/models/Message';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { getIO } from '@/lib/socket';

export const runtime = 'nodejs';

export async function GET(
  // req: Request,
  req: any,
  // context: { params: { id: string } }
) {
  const  context : any   = req.nextUrl.pathname.split('/').pop();
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to view messages' },
        { status: 401 }
      );
    }

    await connectDB();

    // First verify the user has access to this trade
    const trade = await Trade.findOne({
      _id: new ObjectId(context.params.id),
      $or: [
        { buyer: new ObjectId(session.user.id) },
        { seller: new ObjectId(session.user.id) }
      ]
    });

    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found or access denied' },
        { status: 404 }
      );
    }

    // Fetch messages with user info
    const messages = await Message.aggregate([
      {
        $match: {
          trade: new ObjectId(context.params.id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'senderInfo'
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          senderId: '$sender',
          senderName: { $arrayElemAt: ['$senderInfo.name', 0] }
        }
      },
      {
        $sort: { createdAt: 1 }
      }
    ]).exec();

    // Mark messages as read
    await Message.updateMany(
      {
        trade: new ObjectId(context.params.id),
        sender: { $ne: new ObjectId(session.user.id) },
        readBy: { $ne: new ObjectId(session.user.id) }
      },
      {
        $addToSet: { readBy: new ObjectId(session.user.id) }
      }
    );

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  // req: Request,
  req: any,
  // context: { params: { id: string } }
) {
  const  context : any   = req.nextUrl.pathname.split('/').pop(); 
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to send messages' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify user has access to this trade
    const trade = await Trade.findOne({
      _id: new ObjectId(context.params.id),
      $or: [
        { buyer: new ObjectId(session.user.id) },
        { seller: new ObjectId(session.user.id) }
      ]
    });

    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found or access denied' },
        { status: 404 }
      );
    }

    // Create new message
    const message = await Message.create({
      trade: new ObjectId(context.params.id),
      sender: new ObjectId(session.user.id),
      content: content.trim(),
      readBy: [new ObjectId(session.user.id)]
    });

    // Get sender info for the response
    const messageWithSender = await Message.aggregate([
      {
        $match: {
          _id: message._id
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'senderInfo'
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          senderId: '$sender',
          senderName: { $arrayElemAt: ['$senderInfo.name', 0] }
        }
      }
    ]).exec();

    const formattedMessage = messageWithSender[0];

    // Broadcast the message through Socket.IO
    const io = getIO();
    if (io) {
      const roomName = `trade:${context.params.id}`;
      setTimeout(() => {
        io.to(roomName).emit('new_message', formattedMessage);
      }, 0);
    }

    return NextResponse.json(formattedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
