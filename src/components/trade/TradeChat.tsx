'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  sender: {
    id: string;
    username: string;
  };
  content: string;
  timestamp: Date;
}

interface TradeChatProps {
  tradeId: string;
  messages: Message[];
}

export default function TradeChat({ tradeId, messages: initialMessages }: TradeChatProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '', {
      path: '/api/socket',
    });

    socketInstance.emit('join-trade', tradeId);

    socketInstance.on('new-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.emit('leave-trade', tradeId);
      socketInstance.disconnect();
    };
  }, [tradeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeId,
          content: newMessage,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const message = await response.json();
      socket?.emit('send-message', {
        tradeId,
        message: message.content,
        sender: {
          id: session.user.id,
          username: session.user.username,
        },
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Trade Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex ${
                  message.sender.id === session?.user?.id
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender.id === session?.user?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {message.sender.username}
                  </div>
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  );
}
