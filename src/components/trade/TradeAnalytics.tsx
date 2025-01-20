'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TradeMetrics {
  date: string;
  volume: number;
  avgPrice: number;
}

export function TradeAnalytics() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<TradeMetrics[]>([]);
  const [timeframe, setTimeframe] = useState('7d');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/trades/metrics?timeframe=${timeframe}`);
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error('Failed to fetch trade metrics:', error);
      }
    };

    fetchMetrics();
  }, [timeframe]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="volume"
                stroke="#8884d8"
                name="Trade Volume"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgPrice"
                stroke="#82ca9d"
                name="Average Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
