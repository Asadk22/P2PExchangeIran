'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { wsManager } from '@/lib/websocket-manager';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  type: 'trade' | 'system' | 'alert';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  isConnected: boolean;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const connectWebSocket = async () => {
      try {
        await wsManager.connect(session.user.id);
        setIsConnected(true);

        wsManager.on('notification', (data) => {
          const newNotification: Notification = {
            id: data.id,
            type: data.type,
            title: data.title,
            message: data.message,
            createdAt: new Date().toISOString(),
            read: false,
          };

          setNotifications((prev) => [newNotification, ...prev]);

          toast({
            title: data.title,
            description: data.message,
          });
        });

        wsManager.on('disconnect', () => {
          setIsConnected(false);
        });

        wsManager.on('connect', () => {
          setIsConnected(true);
        });

      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        setIsConnected(false);
      }
    };

    // Fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    connectWebSocket();
    fetchNotifications();

    return () => {
      wsManager.off('notification');
      wsManager.off('disconnect');
      wsManager.off('connect');
    };
  }, [session, toast]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to mark notification as read');

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch('/api/notifications/read-all', {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to mark all notifications as read');

      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isConnected,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
