import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import connectDB from '@/lib/db';
import Trade from '@/lib/models/Trade';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await connectDB();

  const trade = await Trade.findById(params.id);
  if (!trade) {
    return new NextResponse('Trade not found', { status: 404 });
  }

  // Verify user is part of the trade
  const userId = session.user.id;
  const sellerId = trade.seller?.toString() || trade.userId?.toString();
  const buyerId = trade.buyer?.toString();
  const isAuthorized = (sellerId && userId === sellerId) || (buyerId && userId === buyerId);

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  // Set up SSE headers
  const response = new NextResponse(new ReadableStream({
    start(controller) {
      // Send initial messages
      const initialData = JSON.stringify({
        type: 'initial',
        messages: trade.messages || []
      });
      controller.enqueue(`data: ${initialData}\n\n`);

      // Keep connection alive
      const keepAlive = setInterval(() => {
        controller.enqueue(':\n\n');
      }, 30000);

      // Clean up on close
      req.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
      });
    }
  }), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });

  return response;
}
