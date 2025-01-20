'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/currency';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  TrendingUp, 
  Wallet, 
  BarChart2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  MessageCircle,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Timer,
  BadgeCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CurrencyConverter from '@/components/currency-converter';
import { Badge } from '@/components/ui/badge';

interface Trade {
  _id: string;
  type: 'buy' | 'sell';
  amount: number;
  assetType: string;
  price: number;
  paymentMethod: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'disputed';
  timeRemaining?: number;
  seller?: string;
  buyer?: string;
  latestMessage?: {
    content: string;
    timestamp: string;
    isUnread: boolean;
  } | null;
}

interface UserStats {
  totalTrades: number;
  successRate: number;
  volume30d: number;
  reputation: number;
  verificationLevel: 'none' | 'basic' | 'advanced' | 'full';
  kycStatus: 'none' | 'pending' | 'verified';
  trustScore: number;
  tradingLimit: number;
}

const getStatusColor = (status?: Trade['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'in_progress':
      return 'bg-blue-500/10 text-blue-500';
    case 'completed':
      return 'bg-green-500/10 text-green-500';
    case 'disputed':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

const getStatusIcon = (status?: Trade['status']) => {
  switch (status) {
    case 'pending':
      return Timer;
    case 'in_progress':
      return Clock;
    case 'completed':
      return CheckCircle2;
    case 'disputed':
      return AlertTriangle;
    default:
      return Clock;
  }
};

const formatStatus = (status?: Trade['status']) => {
  if (!status) return 'PENDING';
  return status.replace('_', ' ').toUpperCase();
};

const getVerificationBadge = (level: UserStats['verificationLevel']) => {
  switch (level) {
    case 'none':
      return { color: 'bg-red-500/10 text-red-500', text: 'Not Verified' };
    case 'basic':
      return { color: 'bg-yellow-500/10 text-yellow-500', text: 'Basic' };
    case 'advanced':
      return { color: 'bg-blue-500/10 text-blue-500', text: 'Advanced' };
    case 'full':
      return { color: 'bg-green-500/10 text-green-500', text: 'Fully Verified' };
    default:
      return { color: 'bg-gray-500/10 text-gray-500', text: 'Unknown' };
  }
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats>({
    totalTrades: 0,
    successRate: 0,
    volume30d: 0,
    reputation: 0,
    verificationLevel: 'none',
    kycStatus: 'none',
    trustScore: 0,
    tradingLimit: 0
  });
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [activeTrades, setActiveTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.user) return;

      try {
        const [statsRes, tradesRes, activeTradesRes] = await Promise.all([
          fetch('/api/user/stats'),
          fetch('/api/user/recent-trades'),
          fetch('/api/user/active-trades')
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (tradesRes.ok) {
          const tradesData = await tradesRes.json();
          setRecentTrades(tradesData);
        }

        if (activeTradesRes.ok) {
          const activeTradesData = await activeTradesRes.json();
          setActiveTrades(activeTradesData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const verificationBadge = getVerificationBadge(stats.verificationLevel);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* User Status Banner */}
      <div className="mb-8 bg-[#2A2E39] rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge className={cn("px-3 py-1", verificationBadge.color)}>
            <BadgeCheck className="w-4 h-4 mr-1" />
            {verificationBadge.text}
          </Badge>
          <Badge className={cn("px-3 py-1", stats.kycStatus === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500')}>
            <Shield className="w-4 h-4 mr-1" />
            {stats.kycStatus === 'verified' ? 'KYC Verified' : 'KYC Required'}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Trading Limit: {formatCurrency(stats.tradingLimit, 'IRR')}
          </div>
          <div className="text-sm text-gray-400">
            Trust Score: {stats.trustScore}/100
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#2A2E39] border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Total Trades</p>
                <h3 className="text-2xl font-bold mt-2 text-[#00C853]">{stats.totalTrades}</h3>
              </div>
              <div className="p-3 bg-[#00C853]/10 rounded-full">
                <TrendingUp className="w-5 h-5 text-[#00C853]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2E39] border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Success Rate</p>
                <h3 className="text-2xl font-bold mt-2 text-[#00C853]">{stats.successRate}%</h3>
              </div>
              <div className="p-3 bg-[#00C853]/10 rounded-full">
                <BarChart2 className="w-5 h-5 text-[#00C853]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2E39] border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Volume (30d)</p>
                <h3 className="text-2xl font-bold mt-2 text-[#00C853]">{formatCurrency(stats.volume30d, 'IRR')}</h3>
              </div>
              <div className="p-3 bg-[#00C853]/10 rounded-full">
                <Wallet className="w-5 h-5 text-[#00C853]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2E39] border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Reputation</p>
                <h3 className="text-2xl font-bold mt-2 text-[#00C853]">{stats.reputation}/5</h3>
              </div>
              <div className="p-3 bg-[#00C853]/10 rounded-full">
                <Shield className="w-5 h-5 text-[#00C853]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Currency Converter and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#2A2E39] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Currency Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrencyConverter />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-[#2A2E39] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                variant="white"
                className="w-full h-16 text-lg font-semibold"
                onClick={() => router.push('/trades/create?type=buy')}
              >
                <ArrowDownRight className="mr-2 h-5 w-5 text-[#00C853]" />
                Create Buy Order
              </Button>
              <Button 
                size="lg" 
                variant="white"
                className="w-full h-16 text-lg font-semibold"
                onClick={() => router.push('/trades/create?type=sell')}
              >
                <ArrowUpRight className="mr-2 h-5 w-5 text-[#FF3D57]" />
                Create Sell Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Trades */}
      <Card className="bg-[#2A2E39] border-gray-800 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            Active Trades
            <MessageCircle className="h-5 w-5 text-white" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTrades.length > 0 ? (
              activeTrades.slice(0, 3).map((trade) => (
                <div
                  key={trade._id}
                  className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent/50"
                  onClick={() => router.push(`/trades/${trade._id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      trade.type === 'buy' ? 'bg-[#00C853]/10' : 'bg-[#FF3D57]/10'
                    )}>
                      {trade.type === 'buy' ? (
                        <ArrowDownRight className={cn(
                          "w-4 h-4",
                          trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'
                        )} />
                      ) : (
                        <ArrowUpRight className={cn(
                          "w-4 h-4",
                          trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'
                        )} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">
                          {trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.amount} {trade.assetType}
                        </p>
                        <Badge className={cn("px-2 py-0.5 text-xs", getStatusColor(trade.status))}>
                          {formatStatus(trade.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        with {trade.type === 'buy' ? trade.seller : trade.buyer || 'Not Joined'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {trade.timeRemaining && (
                      <div className="text-sm text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {Math.floor(trade.timeRemaining / 60)}m {trade.timeRemaining % 60}s
                      </div>
                    )}
                    {trade.latestMessage && (
                      <div className="flex items-center text-sm">
                        <MessageCircle className={cn(
                          "h-4 w-4 mr-1",
                          trade.latestMessage.isUnread ? "text-[#00C853]" : "text-white"
                        )} />
                        <span className="text-white">
                          {new Date(trade.latestMessage.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="h-8 w-8 text-white mx-auto mb-3" />
                <p className="text-sm text-white">No active trades</p>
              </div>
            )}
            {activeTrades.length > 3 && (
              <Button 
                variant="ghost" 
                className="w-full text-white"
                onClick={() => router.push('/trades')}
              >
                View All Active Trades
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-[#2A2E39] border-gray-800">
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white text-white"
          >
            Active Trades
          </TabsTrigger>
          <TabsTrigger 
            value="recent"
            className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white text-white"
          >
            Recent Trades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTrades.map((trade) => (
            <Card key={trade._id} className="bg-[#2A2E39] border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      trade.type === 'buy' ? 'bg-[#00C853]/10' : 'bg-[#FF3D57]/10'
                    )}>
                      {trade.type === 'buy' ? (
                        <ArrowDownRight className={cn(
                          "w-4 h-4",
                          trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'
                        )} />
                      ) : (
                        <ArrowUpRight className={cn(
                          "w-4 h-4",
                          trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'
                        )} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">
                          {trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.amount} {trade.assetType}
                        </p>
                        <Badge className={cn("px-2 py-0.5 text-xs", getStatusColor(trade.status))}>
                          {formatStatus(trade.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#00C853]">
                        {formatCurrency(trade.amount * trade.price, 'IRR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(trade.price, 'IRR')}</p>
                    <p className="text-sm text-white">{trade.paymentMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentTrades.map((trade) => (
            <Card key={trade._id} className="bg-[#2A2E39] border-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      trade.type === 'buy' ? 'bg-[#00C853]/10' : 'bg-[#FF3D57]/10'
                    )}>
                      {trade.type === 'buy' ? (
                        <ArrowDownRight className={cn(
                          "w-4 h-4",
                          trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'
                        )} />
                      ) : (
                        <ArrowUpRight className={cn(
                          "w-4 h-4",
                          trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'
                        )} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">
                          {trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.amount} {trade.assetType}
                        </p>
                        <Badge className={cn("px-2 py-0.5 text-xs", getStatusColor(trade.status))}>
                          {formatStatus(trade.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#00C853]">
                        {formatCurrency(trade.amount * trade.price, 'IRR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(trade.price, 'IRR')}</p>
                    <p className="text-sm text-white">{trade.paymentMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
