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
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    // Connect to WebSocket
    const ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/ws`);
    setSocket(ws);

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
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setHasUnread(data.some((n: Notification) => !n.read));
      });

    return () => {
      ws.close();
    };
  }, [session]);

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      await fetch(`/api/notifications/${notification._id}/read`, { method: 'POST' });
      setNotifications(notifications.map(n => 
        n._id === notification._id ? { ...n, read: true } : n
      ));
    }

    // Navigate to the trade
    router.push(`/trades/${notification.tradeId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="max-h-96 overflow-y-auto p-4">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer hover:bg-accent",
                    !notification.read && "bg-accent/50"
                  )}
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">{notification.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
