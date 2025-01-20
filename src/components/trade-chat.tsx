'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from './ui/use-toast';
import { wsManager } from '@/lib/websocket-manager';

interface Message {
  _id: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: string;
}

interface TradeChatProps {
  tradeId: string;
}

export default function TradeChat({ tradeId }: TradeChatProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`/api/trades/${tradeId}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to load messages. Please try refreshing the page.',
        variant: 'destructive',
      });
    }
  }, [tradeId, toast, scrollToBottom]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const initChat = async () => {
      try {
        await wsManager.connect(session.user.id);
        setIsConnected(wsManager.isConnected());
        wsManager.joinRoom(`trade:${tradeId}`);

        wsManager.on('new_message', (message: Message) => {
          setMessages(prev => [...prev, message]);
          scrollToBottom();
        });

        wsManager.on('user_joined', ({ userId, timestamp }: { userId: string; timestamp: string }) => {
          toast({
            title: 'User Joined',
            description: 'A new user has joined the chat.',
          });
        });

        wsManager.on('user_left', ({ userId, timestamp }: { userId: string; timestamp: string }) => {
          toast({
            title: 'User Left',
            description: 'A user has left the chat.',
          });
        });

        wsManager.on('connect', () => {
          setIsConnected(true);
        });

        wsManager.on('disconnect', () => {
          setIsConnected(false);
        });

        await fetchMessages();
      } catch (error) {
        console.error('Chat initialization error:', error);
        setIsConnected(false);
        toast({
          title: 'Error',
          description: 'Failed to initialize chat. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    initChat();

    return () => {
      wsManager.off('new_message');
      wsManager.off('user_joined');
      wsManager.off('user_left');
      wsManager.off('connect');
      wsManager.off('disconnect');
      wsManager.leaveRoom(`trade:${tradeId}`);
    };
  }, [tradeId, session?.user?.id, toast, fetchMessages, scrollToBottom]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user?.id || !isConnected) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    try {
      const response = await fetch(`/api/trades/${tradeId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageContent }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      const message = await response.json();

      setMessages(prev => [...prev, message]);
      scrollToBottom();

      wsManager.sendMessage(tradeId, message);
    } catch (error) {
      console.error('Error sending message:', error);
      setNewMessage(messageContent); // Restore the message if sending failed
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!session?.user?.id) {
    return (
      <Card className="flex flex-col h-[600px] items-center justify-center">
        <p className="text-muted-foreground">Please sign in to use the chat.</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex flex-col ${
                  message.senderId === session.user.id ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.senderId === session.user.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm font-medium">{message.senderName}</p>
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!isConnected}
          />
          <Button type="submit" disabled={!isConnected || !newMessage.trim()}>
            Send
          </Button>
        </div>
        {!isConnected && (
          <p className="text-sm text-destructive mt-2">
            Connection lost. Attempting to reconnect...
          </p>
        )}
      </form>
    </Card>
  );
}
