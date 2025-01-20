const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO
  const io = new Server(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    transports: ['websocket'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join_trade', ({ tradeId }) => {
      const roomName = `trade:${tradeId}`;
      socket.join(roomName);
      console.log(`Client ${socket.id} joined room ${roomName}`);
    });

    socket.on('leave_trade', ({ tradeId }) => {
      const roomName = `trade:${tradeId}`;
      socket.leave(roomName);
      console.log(`Client ${socket.id} left room ${roomName}`);
    });

    socket.on('send_message', ({ tradeId, message }) => {
      const roomName = `trade:${tradeId}`;
      io.to(roomName).emit('new_message', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Store io instance globally
  global.io = io;

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
