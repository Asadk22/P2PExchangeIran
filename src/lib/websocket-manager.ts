import { io, Socket } from 'socket.io-client';

class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private rooms: Set<string> = new Set();
  private connectionPromise: Promise<void> | null = null;
  private userId: string | null = null;

  private constructor() {}

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  async connect(userId: string): Promise<void> {
    this.userId = userId;

    // If we're already connecting, return the existing promise
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // If we're already connected with the same user, resolve immediately
    if (this.socket?.connected && this.userId === userId) {
      return Promise.resolve();
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        // Clean up existing socket if any
        if (this.socket) {
          this.socket.removeAllListeners();
          this.socket.disconnect();
          this.socket = null;
        }

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        const wsUrl = `${protocol}//${host}`;

        this.socket = io(wsUrl, {
          path: '/api/socket',
          addTrailingSlash: false,
          transports: ['websocket', 'polling'],
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          randomizationFactor: 0.5,
          timeout: 20000,
          auth: { token: userId },
          withCredentials: true,
        });

        this.setupEventListeners();

        // Resolve the promise when connected
        this.socket.on('connect', () => {
          console.log('WebSocket connected:', this.socket?.id);
          this.reconnectAttempts = 0;
          this.connectionPromise = null;
          resolve();

          // Rejoin all rooms after reconnection
          this.rooms.forEach(room => {
            this.socket?.emit('join_trade', { tradeId: room.split(':')[1] });
          });
        });

        // Reject the promise on connection error
        this.socket.on('connect_error', (error) => {
          console.error('WebSocket connect error:', error);
          this.handleReconnect();
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.connectionPromise = null;
            reject(error);
          }
        });

      } catch (error) {
        this.connectionPromise = null;
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        // Don't reconnect for intentional disconnects
        return;
      }
      this.handleReconnect();
    });

    // Set up event forwarding
    this.socket.onAny((event, ...args) => {
      const listeners = this.listeners.get(event);
      if (listeners) {
        listeners.forEach(listener => listener(...args));
      }
    });
  }

  private handleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts && this.userId) {
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      this.reconnectTimeout = setTimeout(() => {
        this.reconnectAttempts++;
        this.connect(this.userId!).catch(console.error);
      }, delay);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // If we're already connected, set up the socket listener
    if (this.socket?.connected) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (callback) {
      this.listeners.get(event)?.delete(callback);
    } else {
      this.listeners.delete(event);
    }

    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }

  emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected, cannot emit event:', event);
      return;
    }
    this.socket.emit(event, data);
  }

  sendMessage(roomId: string, message: any) {
    if (!this.socket?.connected) return false;
    
    this.socket.emit('send_message', {
      tradeId: roomId,
      message,
    });
    return true;
  }

  joinRoom(room: string) {
    this.rooms.add(room);
    if (this.socket?.connected) {
      this.socket.emit('join_trade', { tradeId: room.split(':')[1] });
    }
  }

  leaveRoom(room: string) {
    this.rooms.delete(room);
    if (this.socket?.connected) {
      this.socket.emit('leave_trade', { tradeId: room.split(':')[1] });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.userId = null;
    this.rooms.clear();
    this.listeners.clear();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}

export const wsManager = WebSocketManager.getInstance();
