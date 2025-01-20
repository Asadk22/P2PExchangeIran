'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface PriceData {
  date: string;
  price: number;
  volume: number;
}

interface MarketStats {
  totalVolume: number;
  trades24h: number;
  priceChange24h: number;
  averagePrice: number;
}

export function MarketTrends() {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState('7d');
  const [asset, setAsset] = useState('BTC');
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [stats, setStats] = useState<MarketStats>({
    totalVolume: 0,
    trades24h: 0,
    priceChange24h: 0,
    averagePrice: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, [timeframe, asset]);

  const fetchMarketData = async () => {
    try {
      const query = new URLSearchParams({
        timeframe,
        asset,
      });
      
      const [priceRes, statsRes] = await Promise.all([
        fetch(`/api/market/prices?${query}`),
        fetch(`/api/market/stats?${query}`),
      ]);

      if (!priceRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch market data');
      }

      const [priceData, statsData] = await Promise.all([
        priceRes.json(),
        statsRes.json(),
      ]);

      setPriceData(priceData);
      setStats(statsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load market data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM d');
  };

  const getPercentageChange = (value: number) => {
    const isPositive = value >= 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '+' : ''}
        {value.toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Market Trends</h2>
          <p className="text-sm text-gray-500">
            Track market prices and trading activity
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={asset} onValueChange={setAsset}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin</SelectItem>
              <SelectItem value="ETH">Ethereum</SelectItem>
              <SelectItem value="USDT">Tether</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Current Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(priceData[priceData.length - 1]?.price || 0)}
            </div>
            <p className="text-xs text-gray-500">
              {getPercentageChange(stats.priceChange24h)} (24h)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(stats.totalVolume)}
            </div>
            <p className="text-xs text-gray-500">
              {stats.trades24h} trades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(stats.averagePrice)}
            </div>
            <p className="text-xs text-gray-500">
              Last {timeframe}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Price Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(
                Math.min(...priceData.map((d) => d.price))
              )}
              {' - '}
              {formatPrice(
                Math.max(...priceData.map((d) => d.price))
              )}
            </div>
            <p className="text-xs text-gray-500">
              Last {timeframe}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <CardDescription>
            {asset}/IRR price movements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  minTickGap={30}
                />
                <YAxis
                  tickFormatter={formatPrice}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  formatter={(value: number) => [
                    formatPrice(value),
                    'Price',
                  ]}
                  labelFormatter={formatDate}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
