import { Server as SocketIOServer } from 'socket.io';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

declare global {
  var io: SocketIOServer | undefined;
}

export function getIO(): SocketIOServer | null {
  return global.io || null;
}

export function initSocket(server: any) {
  if (global.io) {
    console.log('Reusing existing socket.io instance');
    return global.io;
  }

  console.log('Initializing new socket.io instance');
  global.io = new SocketIOServer(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket'],
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 45000,
    allowEIO3: true,
    maxHttpBufferSize: 1e6, // 1 MB
    perMessageDeflate: {
      threshold: 1024, // Only compress data above 1KB
    },
  });

  const io = global.io;

  // Track connected clients and their rooms
  const connectedClients = new Map<string, Set<string>>();

  io.use(async (socket, next) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return next(new Error('Unauthorized'));
      }
      socket.data.userId = session.user.id;
      connectedClients.set(socket.id, new Set());
      next();
    } catch (error) {
      console.error('Socket middleware error:', error);
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const clientRooms = connectedClients.get(socket.id) || new Set();
    console.log(`Client connected: ${socket.id} (User: ${socket.data.userId})`);

    // Handle joining trade rooms
    socket.on('join_trade', ({ tradeId }) => {
      if (!tradeId) {
        console.warn(`Invalid join attempt for socket ${socket.id}: Missing tradeId`);
        return;
      }

      const roomName = `trade:${tradeId}`;
      
      // Check if already in room
      if (clientRooms.has(roomName)) {
        console.log(`Client ${socket.id} already in room ${roomName}`);
        return;
      }

      socket.join(roomName);
      clientRooms.add(roomName);
      console.log(`Client ${socket.id} joined room ${roomName}`);

      // Notify room of new participant
      socket.to(roomName).emit('user_joined', {
        userId: socket.data.userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle leaving trade rooms
    socket.on('leave_trade', ({ tradeId }) => {
      if (!tradeId) {
        console.warn(`Invalid leave attempt for socket ${socket.id}: Missing tradeId`);
        return;
      }

      const roomName = `trade:${tradeId}`;
      
      if (!clientRooms.has(roomName)) {
        console.log(`Client ${socket.id} not in room ${roomName}`);
        return;
      }

      socket.leave(roomName);
      clientRooms.delete(roomName);
      console.log(`Client ${socket.id} left room ${roomName}`);

      // Notify room of participant leaving
      socket.to(roomName).emit('user_left', {
        userId: socket.data.userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle sending messages
    socket.on('send_message', ({ tradeId, message }) => {
      if (!tradeId || !message) {
        console.warn(`Invalid message from socket ${socket.id}: Missing tradeId or message`);
        return;
      }

      const roomName = `trade:${tradeId}`;
      
      if (!clientRooms.has(roomName)) {
        console.warn(`Client ${socket.id} attempted to send message to room ${roomName} without joining`);
        return;
      }

      io.to(roomName).emit('new_message', {
        ...message,
        timestamp: new Date().toISOString()
      });
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      
      // Notify all rooms this client was in
      clientRooms.forEach(room => {
        socket.to(room).emit('user_left', {
          userId: socket.data.userId,
          timestamp: new Date().toISOString()
        });
      });

      // Clean up client's room memberships
      connectedClients.delete(socket.id);
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`Socket ${socket.id} error:`, error);
      
      // Attempt to reconnect on transport errors
      if (error.message === 'transport error') {
        socket.connect();
      }
    });

    // Send initial connection acknowledgment
    socket.emit('connection_established', {
      socketId: socket.id,
      userId: socket.data.userId,
      timestamp: new Date().toISOString()
    });
  });

  return io;
}
