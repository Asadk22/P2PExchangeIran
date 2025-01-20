'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  ArrowRight, 
  Clock,
  ArrowLeftRight,
  User
} from 'lucide-react';

interface ChatPreview {
  id: string;
  tradeId: string;
  lastMessage: {
    content: string;
    timestamp: string;
  } | null;
  unreadCount: number;
  participants: {
    id: string;
    name: string;
  }[];
  trade: {
    type: 'buy' | 'sell';
    amount: number;
    asset: string;
    status: string;
  };
  timestamp: string;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats');
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Messages</CardTitle>
            <CardDescription>
              You don't have any active chats. Start a trade to begin chatting!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/trades">
              <Button>
                View Active Trades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Link href="/dashboard/trades">
          <Button variant="outline">View All Trades</Button>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-4">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/dashboard/trades/${chat.tradeId}`}>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={chat.trade.type === 'buy' ? 'default' : 'secondary'}>
                          {chat.trade.type === 'buy' ? 'Buying' : 'Selling'} {chat.trade.amount} {chat.trade.asset}
                        </Badge>
                        <Badge variant={
                          chat.trade.status === 'completed' ? 'success' :
                          chat.trade.status === 'pending' ? 'warning' :
                          'secondary'
                        }>
                          {chat.trade.status}
                        </Badge>
                        {chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {chat.unreadCount} new
                          </Badge>
                        )}
                      </div>
                      
                      {chat.lastMessage ? (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {chat.lastMessage.content}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic mb-2">
                          No messages yet
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>
                            with {chat.participants.find(p => p.id !== session?.user?.id)?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(chat.timestamp), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowLeftRight className="h-4 w-4" />
                          <span>Trade #{chat.tradeId.slice(-6)}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground mt-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
