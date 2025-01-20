'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Message {
  sender: {
    _id: string;
    username: string;
  };
  content: string;
  timestamp: string;
  isAdminMessage: boolean;
}

interface DisputeChatProps {
  disputeId: string;
  messages: Message[];
  onMessageSent: () => void;
}

export function DisputeChat({
  disputeId,
  messages,
  onMessageSent,
}: DisputeChatProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(`/api/disputes/${disputeId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage.trim() }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send message');
      }

      setNewMessage('');
      onMessageSent();
      
      // Focus back on textarea after sending
      textareaRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-grow pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col max-w-[80%] space-y-1',
                message.sender._id === session?.user?.id
                  ? 'ml-auto items-end'
                  : 'mr-auto items-start'
              )}
            >
              <div
                className={cn(
                  'rounded-lg px-4 py-2 text-sm',
                  message.isAdminMessage && 'bg-yellow-100 text-yellow-900',
                  !message.isAdminMessage &&
                    message.sender._id === session?.user?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted',
                )}
              >
                {message.content}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{message.sender.username}</span>
                <span>•</span>
                <span>{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="mt-4 flex items-end space-x-2">
        <Textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="min-h-[80px] resize-none"
          disabled={sending}
        />
        <Button
          onClick={handleSend}
          disabled={!newMessage.trim() || sending}
          className="mb-1"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
