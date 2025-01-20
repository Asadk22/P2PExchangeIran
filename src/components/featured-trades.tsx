'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  assetType: string;
  amount: string;
  price: string;
  paymentMethod: string;
  location: string;
  seller: {
    username: string;
    totalTrades: number;
    successRate: number;
  };
}

interface FeaturedTradesProps {
  trades: Trade[];
}

export function FeaturedTrades({ trades }: FeaturedTradesProps) {
  if (!trades.length) {
    return (
      <p className="text-center text-muted-foreground">
        No featured offers available at the moment
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trades.map((trade) => (
        <Link key={trade.id} href={`/trades/${trade.id}`}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  trade.type === 'sell' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {trade.type === 'sell' ? 'Sell' : 'Buy'} {trade.assetType}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{trade.paymentMethod}</p>
                <p className="text-sm text-muted-foreground">{trade.location}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {Number(trade.amount).toLocaleString()} {trade.assetType}
              </p>
              <p className="text-xl">
                {Number(trade.price).toLocaleString()} IRR
              </p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{trade.seller.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {trade.seller.totalTrades} trades • {trade.seller.successRate}% completion
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Offer →
                </Button>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
