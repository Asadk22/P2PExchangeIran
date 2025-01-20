'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface NotificationCounts {
  activeTrades: number;
  unreadMessages: number;
  notifications: number;
}

export function useNotificationCounts() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState<NotificationCounts>({
    activeTrades: 0,
    unreadMessages: 0,
    notifications: 0,
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    // Initial fetch of counts
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/notifications/counts');
        if (!response.ok) throw new Error('Failed to fetch counts');
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error('Failed to fetch notification counts:', error);
      }
    };

    fetchCounts();

    // Setup WebSocket connection
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//${window.location.host}/api/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'counts_update') {
          setCounts(data.counts);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    return () => {
      ws.close();
    };
  }, [session?.user?.id]);

  return counts;
}
