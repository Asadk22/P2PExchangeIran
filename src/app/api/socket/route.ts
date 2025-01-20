import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Server } from 'socket.io';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let io: Server;

if (!io) {
  io = new Server({
    path: '/api/socket',
    addTrailingSlash: false,
    transports: ['websocket'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('message', (data) => {
      socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Socket server is running' },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
