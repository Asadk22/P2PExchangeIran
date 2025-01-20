'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MessageSquare, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface ChatPreview {
  _id: string;
  tradeId: string;
  lastMessage: {
    content: string;
    timestamp: string;
    sender: {
      _id: string;
      username: string;
    };
  };
  unreadCount: number;
  otherUser: {
    _id: string;
    username: string;
  };
  type: 'buy' | 'sell';
  amount: number;
  assetType: string;
}

interface TradeNotification {
  _id: string;
  tradeId: string;
  type: 'new_offer' | 'trade_update' | 'new_message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function ChatSidebar() {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'chats' | 'notifications'>('chats');
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [notifications, setNotifications] = useState<TradeNotification[]>([]);
  const [unreadChats, setUnreadChats] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchChats();
      fetchNotifications();
    }
  }, [session?.user?.id]);

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/chats');
      if (response.ok) {
        const data = await response.json();
        setChats(data);
        setUnreadChats(data.reduce((acc: number, chat: ChatPreview) => acc + chat.unreadCount, 0));
      } else {
        throw new Error('Failed to fetch chats');
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      setError('Failed to load chats');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setUnreadNotifications(data.filter((n: TradeNotification) => !n.read).length);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications');
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
      setNotifications(prev =>
        prev.map(n =>
          n._id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadNotifications(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 bg-background border-r transition-all duration-300 z-50",
        isExpanded ? "w-80" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0"
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        {isExpanded && (
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'chats' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('chats')}
              className="relative"
            >
              <MessageSquare className="h-4 w-4" />
              {unreadChats > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadChats}
                </span>
              )}
            </Button>
            <Button
              variant={activeTab === 'notifications' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('notifications')}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>
        )}
      </div>

      {isExpanded && (
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {error ? (
            <div className="flex items-center justify-center h-full p-4">
              <div className="text-center text-red-500">
                <p className="text-sm">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setError(null);
                    fetchChats();
                    fetchNotifications();
                  }}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center h-full p-4">
              <div className="animate-pulse space-y-4 w-full">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'chats' ? (
            chats.length > 0 ? (
              <div className="p-4 space-y-4">
                {chats.map((chat) => (
                  <Link
                    key={chat._id}
                    href={`/trades/${chat.tradeId}`}
                    className="block"
                  >
                    <div className={cn(
                      "p-3 rounded-lg hover:bg-muted transition-colors",
                      chat.unreadCount > 0 && "bg-muted/50"
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{chat.otherUser.username}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(chat.lastMessage.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {chat.type === 'buy' ? 'Buying' : 'Selling'} {chat.amount} {chat.assetType}
                      </div>
                      {chat.unreadCount > 0 && (
                        <span className="float-right bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <Separator className="my-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
                <div className="mb-2">
                  <MessageSquare className="h-8 w-8 mb-2" />
                </div>
                <p className="text-sm">
                  No active chats yet. Start a trade to begin chatting!
                </p>
                <Link href="/dashboard/trades" className="mt-4">
                  <Button variant="outline" size="sm">
                    Browse Trades
                  </Button>
                </Link>
              </div>
            )
          ) : notifications.length > 0 ? (
            <div className="p-4 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={cn(
                    "p-3 rounded-lg transition-colors",
                    !notification.read && "bg-muted/50 hover:bg-muted",
                    notification.read && "hover:bg-muted/30"
                  )}
                  onClick={() => {
                    if (!notification.read) {
                      markNotificationAsRead(notification._id);
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  {notification.tradeId && (
                    <Link
                      href={`/trades/${notification.tradeId}`}
                      className="text-xs text-primary hover:underline mt-1 block"
                    >
                      View Trade
                    </Link>
                  )}
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
              <div className="mb-2">
                <Bell className="h-8 w-8 mb-2" />
              </div>
              <p className="text-sm">
                No notifications yet. You'll see updates here when something happens!
              </p>
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
