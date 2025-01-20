'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Stats {
  totalTrades: number;
  successfulTrades: number;
  tradingVolume: number;
  disputeRate: number;
  recentPrices: {
    date: string;
    price: number;
  }[];
}

export function TradingStats() {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stats>({
    totalTrades: 0,
    successfulTrades: 0,
    tradingVolume: 0,
    disputeRate: 0,
    recentPrices: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats/trading');
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load trading statistics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-32 bg-gray-100 rounded animate-pulse mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Trades</CardTitle>
          <CardDescription>All-time completed trades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTrades}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
          <CardDescription>Successful trades percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalTrades > 0
              ? ((stats.successfulTrades / stats.totalTrades) * 100).toFixed(1)
              : '0.0'}%
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trading Volume</CardTitle>
          <CardDescription>Total volume in USD</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.tradingVolume.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispute Rate</CardTitle>
          <CardDescription>Percentage of disputed trades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.disputeRate?.toFixed(1) ?? '0.0'}%
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Price Trend</CardTitle>
          <CardDescription>Recent price movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.recentPrices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [`$${value}`, 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
