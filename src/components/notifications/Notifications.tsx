'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export function Notifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();

    // Set up WebSocket connection for real-time notifications
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3008');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        addNotification(data.notification);
      }
    };

    return () => ws.close();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load notifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications(current => [notification, ...current]);
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to mark notification as read');

      setNotifications(current =>
        current.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notification',
        variant: 'destructive',
      });
    }
  };

  const removeNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete notification');

      setNotifications(current =>
        current.filter(notif => notif.id !== id)
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete notification',
        variant: 'destructive',
      });
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Stay updated on your trading activity
            </CardDescription>
          </div>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                notifications.forEach(n => !n.read && markAsRead(n.id));
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="mx-auto h-8 w-8 mb-2" />
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative flex items-start space-x-3 rounded-lg border p-4 ${
                  notification.read ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">
                    {notification.title}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.message}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {format(new Date(notification.timestamp), 'PP')}
                    </div>
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {notification.actionLabel || 'View Details'}
                      </a>
                    )}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
