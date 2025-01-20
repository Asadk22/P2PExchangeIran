'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Notification {
  _id: string;
  type: 'new_trade' | 'new_message' | 'trade_update';
  title: string;
  message: string;
  tradeId: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    // Connect to WebSocket
    const ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/ws`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        setNotifications(prev => [data.notification, ...prev]);
        setHasUnread(true);
        // Play notification sound
        new Audio('/notification.mp3').play().catch(() => {});
      }
    };

    // Fetch existing notifications
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/notifications', {
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error('Expected array of notifications but got:', data);
          throw new Error('Invalid response format');
        }

        setNotifications(data);
        setHasUnread(data.some((n: Notification) => !n.read));
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    return () => {
      ws.close();
    };
  }, [session]);

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark as read
      if (!notification.read) {
        const res = await fetch(`/api/notifications/${notification._id}/read`, {
          method: 'POST',
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to mark notification as read');
        }

        setNotifications(notifications.map(n => 
          n._id === notification._id ? { ...n, read: true } : n
        ));

        // Update unread status
        const remainingUnread = notifications.some(n => n._id !== notification._id && !n.read);
        setHasUnread(remainingUnread);
      }

      // Navigate to the trade
      router.push(`/trades/${notification.tradeId}`);
    } catch (err) {
      console.error('Error handling notification:', err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative",
            hasUnread && "after:absolute after:top-2 after:right-2 after:h-2 after:w-2 after:rounded-full after:bg-red-500"
          )}
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">
              {error}
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={cn(
                  "flex flex-col gap-1 p-4 text-left hover:bg-accent",
                  !notification.read && "bg-accent/50"
                )}
              >
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-muted-foreground">{notification.message}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
