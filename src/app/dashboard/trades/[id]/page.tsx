'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import TradeChat from '@/components/trade-chat';

interface Trade {
  _id: string;
  amount: number;
  asset: string;
  status: string;
  buyer: {
    _id: string;
    name: string;
    email: string;
  };
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function TradePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [trade, setTrade] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrade = async () => {
      try {
        const response = await fetch(`/api/trades/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trade');
        }
        const data = await response.json();
        setTrade(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trade');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrade();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !trade) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || 'Trade not found'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSeller = session?.user?.id === trade.seller._id;
  const otherUser = isSeller ? trade.buyer : trade.seller;

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trade Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Trade Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Transaction</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={isSeller ? 'secondary' : 'default'}>
                    {isSeller ? 'Selling' : 'Buying'} {trade.amount} {trade.asset}
                  </Badge>
                  <Badge variant={
                    trade.status === 'completed' ? 'success' :
                    trade.status === 'pending' ? 'warning' :
                    'secondary'
                  }>
                    {trade.status}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Trading With</h3>
                <p className="text-sm">{otherUser.name}</p>
                <p className="text-sm text-muted-foreground">{otherUser.email}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Trade Info</h3>
                <p className="text-sm">
                  Trade ID: #{trade._id.slice(-6)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Created {format(new Date(trade.createdAt), 'PPP')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-8rem)]">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <TradeChat tradeId={trade._id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
