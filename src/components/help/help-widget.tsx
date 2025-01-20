'use client';

import { useState } from 'react';
import { HelpCircle, X, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const suggestedArticles = [
  {
    title: 'How to Start Trading',
    slug: 'start-trading',
    icon: '📈'
  },
  {
    title: 'Payment Methods',
    slug: 'payment-methods',
    icon: '💳'
  },
  {
    title: 'Account Verification',
    slug: 'verification',
    icon: '✅'
  },
  {
    title: 'Transaction Limits',
    slug: 'limits',
    icon: '💰'
  },
  {
    title: 'Escrow Service',
    slug: 'escrow',
    icon: '🔒'
  }
];

export function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'support', text: string}>>([
    {
      type: 'support',
      text: 'Hello! How can I help you today?'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowChat(false);
    }
  };

  const startChat = () => {
    setShowChat(true);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, { type: 'user', text: newMessage }]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'support',
        text: 'Thank you for your message. Our support team will respond shortly.'
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Help Button */}
      <Button
        onClick={toggleWidget}
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <HelpCircle className="h-6 w-6" />}
      </Button>

      {/* Help Widget Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[380px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {!showChat ? (
            <>
              {/* Header */}
              <div className="bg-[#D1F879] p-4">
                <h2 className="text-lg font-semibold text-gray-900">Welcome to Support</h2>
                <p className="text-sm text-gray-700">How can we help you today?</p>
              </div>

              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for help..."
                    className="pl-9 bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Suggested Articles */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Suggested articles</h3>
                <div className="space-y-2">
                  {suggestedArticles.map((article) => (
                    <a
                      key={article.slug}
                      href={`/help/article/${article.slug}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <span className="text-lg">{article.icon}</span>
                      <span className="text-sm text-gray-600">{article.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Start Chat Button */}
              <div className="p-4 bg-gray-50 mt-2">
                <Button
                  onClick={startChat}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Start Live Chat
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Chat Header */}
              <div className="bg-[#D1F879] p-4">
                <h2 className="text-lg font-semibold text-gray-900">Live Chat</h2>
                <p className="text-sm text-gray-700">We typically reply in a few minutes</p>
              </div>

              {/* Chat Messages */}
              <div className="h-[300px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={sendMessage} className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
