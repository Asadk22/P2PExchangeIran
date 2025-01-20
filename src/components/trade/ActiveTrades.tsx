'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Clock, AlertTriangle, CheckCircle2, Timer } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TradeTimeline } from './TradeTimeline';
import { useToast } from '@/components/ui/use-toast';

interface Trade {
  _id: string;
  seller: {
    _id: string;
    username: string;
  };
  buyer?: {
    _id: string;
    username: string;
  };
  amount: number;
  assetType: string;
  pricePerUnit: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  escrowStatus: string;
  paymentTimeLimit: number;
  createdAt: string;
  events: Array<{
    status: string;
    timestamp: string;
    description: string;
  }>;
}

export function ActiveTrades() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3008');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade_update') {
        updateTrade(data.trade);
      }
    };

    return () => ws.close();
  }, []);

  const fetchTrades = async () => {
    try {
      const res = await fetch('/api/trades/active');
      if (!res.ok) throw new Error('Failed to fetch trades');
      const data = await res.json();
      setTrades(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load active trades',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTrade = (updatedTrade: Trade) => {
    setTrades(current =>
      current.map(trade =>
        trade._id === updatedTrade._id ? updatedTrade : trade
      )
    );
  };

  const getTimeRemaining = (trade: Trade) => {
    const startTime = new Date(trade.createdAt).getTime();
    const timeLimit = trade.paymentTimeLimit * 60 * 1000; // Convert minutes to milliseconds
    const endTime = startTime + timeLimit;
    const now = Date.now();
    const remaining = endTime - now;

    return {
      expired: remaining <= 0,
      minutes: Math.max(0, Math.floor(remaining / (1000 * 60))),
      progress: Math.max(0, Math.min(100, (remaining / timeLimit) * 100)),
    };
  };

  const getTradeActions = (trade: Trade) => {
    const isUserSeller = trade.seller._id === session?.user?.id;
    const actions = [];

    switch (trade.status) {
      case 'open':
        if (!isUserSeller) {
          actions.push(
            <Button key="buy" onClick={() => handleBuy(trade._id)}>
              Buy Now
            </Button>
          );
        }
        break;
      case 'in_progress':
        if (isUserSeller && trade.escrowStatus === 'pending') {
          actions.push(
            <Button key="fund" onClick={() => handleFundEscrow(trade._id)}>
              Fund Escrow
            </Button>
          );
        }
        if (!isUserSeller && trade.escrowStatus === 'funded') {
          actions.push(
            <Button key="confirm" onClick={() => handleConfirmPayment(trade._id)}>
              Confirm Payment
            </Button>
          );
        }
        if (isUserSeller && trade.escrowStatus === 'funded') {
          actions.push(
            <Button key="release" onClick={() => handleReleaseFunds(trade._id)}>
              Release Funds
            </Button>
          );
        }
        break;
    }

    // Add dispute option for both parties if trade is in progress
    if (trade.status === 'in_progress') {
      actions.push(
        <Button
          key="dispute"
          variant="destructive"
          onClick={() => handleDispute(trade._id)}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Raise Dispute
        </Button>
      );
    }

    return actions;
  };

  const handleBuy = async (tradeId: string) => {
    // Implementation
  };

  const handleFundEscrow = async (tradeId: string) => {
    // Implementation
  };

  const handleConfirmPayment = async (tradeId: string) => {
    // Implementation
  };

  const handleReleaseFunds = async (tradeId: string) => {
    // Implementation
  };

  const handleDispute = async (tradeId: string) => {
    // Implementation
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (trades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Trades</CardTitle>
          <CardDescription>
            You don't have any active trades at the moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Link href="/trades/create">
            <Button>Create New Trade</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {trades.map((trade) => {
        const { expired, minutes, progress } = getTimeRemaining(trade);
        const actions = getTradeActions(trade);

        return (
          <Card key={trade._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {trade.amount} {trade.assetType}
                  </CardTitle>
                  <CardDescription>
                    Trade ID: #{trade._id.slice(-6)}
                  </CardDescription>
                </div>
                <Badge
                  variant={trade.status === 'disputed' ? 'destructive' : 'default'}
                >
                  {trade.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <TradeTimeline
                events={trade.events}
                currentStatus={trade.status}
              />

              {trade.status === 'in_progress' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Timer className="mr-2 h-4 w-4" />
                      Time Remaining
                    </div>
                    <span className={expired ? 'text-red-500' : undefined}>
                      {expired ? 'Expired' : `${minutes} minutes`}
                    </span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </CardContent>
            {actions.length > 0 && (
              <CardFooter className="flex justify-end space-x-2">
                {actions}
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
