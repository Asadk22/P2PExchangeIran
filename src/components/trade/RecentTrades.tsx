'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReputationBadge } from '@/components/user/ReputationBadge';
import { useToast } from '@/components/ui/use-toast';

interface Trade {
  _id: string;
  seller: {
    _id: string;
    username: string;
    reputation: number;
    totalTrades: number;
    successRate: number;
    verificationLevel: string;
  };
  buyer?: {
    _id: string;
    username: string;
    reputation: number;
    totalTrades: number;
    successRate: number;
    verificationLevel: string;
  };
  amount: number;
  assetType: string;
  pricePerUnit: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface RecentTradesProps {
  showAll?: boolean;
  limit?: number;
}

export function RecentTrades({ showAll = false, limit = 5 }: RecentTradesProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
  }, [showAll, limit]);

  const fetchTrades = async () => {
    try {
      const query = new URLSearchParams();
      if (!showAll) query.set('limit', limit.toString());
      if (session?.user?.id) query.set('userId', session.user.id);
      
      const res = await fetch(`/api/trades?${query}`);
      if (!res.ok) throw new Error('Failed to fetch trades');
      
      const data = await res.json();
      setTrades(data.trades || []); 
    } catch (error) {
      console.error('Error fetching trades:', error);
      toast({
        title: 'Error',
        description: 'Failed to load trades',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
          <CardDescription>Loading your trades...</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!trades.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
          <CardDescription>No trades found</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">You haven't made any trades yet.</p>
          <Button asChild>
            <Link href="/trades/create">Create Trade</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
        <CardDescription>
          {showAll ? 'All trades' : 'Your most recent trades'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => {
              const isUserSeller = trade.seller._id === session?.user?.id;
              const counterparty = isUserSeller ? trade.buyer : trade.seller;

              return (
                <TableRow key={trade._id}>
                  <TableCell>
                    {format(new Date(trade.createdAt), 'PPp')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={isUserSeller ? 'default' : 'secondary'}>
                      {isUserSeller ? 'Sell' : 'Buy'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {trade.amount} {trade.assetType}
                  </TableCell>
                  <TableCell>
                    ${trade.pricePerUnit.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{counterparty?.username}</span>
                      {counterparty && (
                        <ReputationBadge
                          score={counterparty.reputation}
                          totalTrades={counterparty.totalTrades}
                          successRate={counterparty.successRate}
                          verificationLevel={counterparty.verificationLevel as any}
                          size="sm"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(trade.status)}
                    >
                      {trade.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/trades/${trade._id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {!showAll && trades.length > 0 && (
          <div className="mt-4 text-center">
            <Link href="/trades">
              <Button variant="outline">View All Trades</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
