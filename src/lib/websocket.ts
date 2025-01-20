import { useEffect, useRef, useState } from 'react';

const WS_RECONNECT_DELAY = 2000; // 2 seconds
const WS_MAX_RETRIES = 5;

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = () => {
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        return;
      }

      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event);
        setIsConnected(false);

        // Attempt to reconnect if not closed cleanly
        if (!event.wasClean && reconnectAttemptsRef.current < WS_MAX_RETRIES) {
          const delay = WS_RECONNECT_DELAY * Math.pow(2, reconnectAttemptsRef.current);
          console.log(`Attempting to reconnect in ${delay}ms...`);
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, delay);
        } else if (reconnectAttemptsRef.current >= WS_MAX_RETRIES) {
          setError(new Error('Failed to connect after maximum retries'));
        }
      };

      wsRef.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError(new Error('WebSocket connection error'));
      };

    } catch (error) {
      console.error('WebSocket connection error:', error);
      setError(error instanceof Error ? error : new Error('Failed to connect to WebSocket'));
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  const send = (data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  const subscribe = (event: string, callback: (data: any) => void) => {
    if (!wsRef.current) return;

    const handler = (message: MessageEvent) => {
      try {
        const data = JSON.parse(message.data);
        if (data.event === event) {
          callback(data.payload);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    wsRef.current.addEventListener('message', handler);

    return () => {
      wsRef.current?.removeEventListener('message', handler);
    };
  };

  return {
    isConnected,
    error,
    send,
    subscribe,
  };
}
