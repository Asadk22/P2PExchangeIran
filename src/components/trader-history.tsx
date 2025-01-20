'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TradeHistory {
  id: string;
  type: 'buy' | 'sell';
  assetType: string;
  amount: string;
  price: string;
  status: 'completed' | 'cancelled';
  completedAt: string;
}

export default function TraderHistory({ userId }: { userId?: string }) {
  const [history, setHistory] = useState<TradeHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/users/${userId}/trades`, {
          credentials: 'include'
        });
        
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (error) {
        console.error('Error fetching trade history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">Loading history...</div>;
  }

  if (!userId) {
    return <div className="text-center py-4 text-muted-foreground">No user selected</div>;
  }

  if (!history.length) {
    return <div className="text-center py-4 text-muted-foreground">No trade history available</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell>
              <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'}>
                {trade.type}
              </Badge>
            </TableCell>
            <TableCell>{trade.assetType}</TableCell>
            <TableCell>{trade.amount}</TableCell>
            <TableCell>{trade.price}</TableCell>
            <TableCell>
              <Badge variant={trade.status === 'completed' ? 'success' : 'destructive'}>
                {trade.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(trade.completedAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
