'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, CreditCard, User } from 'lucide-react';

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
  price: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface TradeCardProps {
  trade: Trade;
  currentUserId: string;
}

export default function TradeCard({ trade, currentUserId }: TradeCardProps) {
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleTakeOffer = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trades/${trade._id}/take`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to take trade');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error taking trade:', error);
      alert('Failed to take trade. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const statusVariants = {
    open: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
    in_progress: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    completed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    cancelled: 'bg-red-100 text-red-800 hover:bg-red-200',
    disputed: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{trade.seller.username}</p>
            <p className="text-xs text-muted-foreground">
              {trade.buyer ? `Trading with ${trade.buyer.username}` : 'Awaiting buyer'}
            </p>
          </div>
        </div>
        <Badge className={statusVariants[trade.status as keyof typeof statusVariants]}>
          {trade.status.replace('_', ' ')}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{trade.amount} BTC</span>
            </div>
            <div className="text-sm font-medium">
              {trade.price.toLocaleString()} IRR
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t">
            <div className="flex items-center space-x-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>{trade.paymentMethod.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatDate(trade.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Link href={`/trades/${trade._id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        {trade.status === 'open' && trade.seller._id !== currentUserId && (
          <Button
            onClick={handleTakeOffer}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Take Offer'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
