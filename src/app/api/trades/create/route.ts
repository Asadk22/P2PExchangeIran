import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { db } = await connectToDatabase();

    const trade = {
      ...data,
      userId: session.user.id,
      createdAt: new Date(),
      status: 'active',
    };

    const result = await db.collection('trades').insertOne(trade);

    return NextResponse.json({
      message: 'Trade created successfully',
      tradeId: result.insertedId,
    });
  } catch (error) {
    console.error('Failed to create trade:', error);
    return NextResponse.json(
      { error: 'Failed to create trade' },
      { status: 500 }
    );
  }
}
