import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    return new NextResponse('Authenticated', { status: 200 });
  } catch (error) {
    console.error('WebSocket error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
