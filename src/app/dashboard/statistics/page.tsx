'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bitcoin,
  DollarSign,
  Timer,
  Users,
  Star,
  AlertCircle,
  CheckCircle2,
  XCircle,
  CreditCard,
  UserCheck
} from 'lucide-react';

interface TradeStatistics {
  monthlyStats: {
    btc: {
      amount: number;
      trades: number;
    };
    usdt: {
      amount: number;
      trades: number;
    };
    eth: {
      amount: number;
      trades: number;
    };
    usdc: {
      amount: number;
      trades: number;
    };
  };
  successfulTrades: {
    btc: number;
    usdt: number;
    eth: number;
    usdc: number;
  };
  topOffers: Array<{
    id: string;
    type: 'buy' | 'sell';
    asset: string;
    successRate: number;
  }>;
  expiredOffers: Array<{
    id: string;
    type: 'buy' | 'sell';
    asset: string;
    expiredAt: string;
  }>;
  cancelledTrades: Array<{
    id: string;
    type: 'buy' | 'sell';
    asset: string;
    cancelledAt: string;
  }>;
  paymentMethods: Array<{
    method: string;
    usageCount: number;
  }>;
  lastSuccessfulTrades: Array<{
    id: string;
    type: 'buy' | 'sell';
    asset: string;
    amount: number;
    completedAt: string;
  }>;
  trustedUsers: Array<{
    id: string;
    username: string;
    tradesCount: number;
    lastTrade: string;
  }>;
}

export default function StatisticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<TradeStatistics>({
    monthlyStats: {
      btc: { amount: 0, trades: 0 },
      usdt: { amount: 0, trades: 0 },
      eth: { amount: 0, trades: 0 },
      usdc: { amount: 0, trades: 0 }
    },
    successfulTrades: {
      btc: 0,
      usdt: 0,
      eth: 0,
      usdc: 0
    },
    topOffers: [],
    expiredOffers: [],
    cancelledTrades: [],
    paymentMethods: [],
    lastSuccessfulTrades: [],
    trustedUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch('/api/user/statistics');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-8 text-white">Trade Statistics</h1>

      {/* Balance Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Balance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#2A2E39] border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Monthly traded Bitcoin</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Bitcoin className="h-5 w-5 text-[#F7931A]" />
                    <h3 className="text-2xl font-bold text-white">{stats.monthlyStats.btc.amount} BTC</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{stats.monthlyStats.btc.trades} trades</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2E39] border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Monthly traded USDT</p>
                  <div className="flex items-center gap-2 mt-2">
                    <DollarSign className="h-5 w-5 text-[#26A17B]" />
                    <h3 className="text-2xl font-bold text-white">{stats.monthlyStats.usdt.amount} USDT</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{stats.monthlyStats.usdt.trades} trades</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2E39] border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Monthly traded Ethereum</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-5 w-5 text-[#627EEA]">Ξ</div>
                    <h3 className="text-2xl font-bold text-white">{stats.monthlyStats.eth.amount} ETH</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{stats.monthlyStats.eth.trades} trades</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2E39] border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Monthly traded USDC</p>
                  <div className="flex items-center gap-2 mt-2">
                    <DollarSign className="h-5 w-5 text-[#2775CA]" />
                    <h3 className="text-2xl font-bold text-white">{stats.monthlyStats.usdc.amount} USDC</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{stats.monthlyStats.usdc.trades} trades</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trade Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-[#2A2E39] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Successful Offers</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topOffers.length > 0 ? (
              <div className="space-y-4">
                {stats.topOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {offer.type === 'buy' ? 'Buy' : 'Sell'} {offer.asset}
                        </p>
                        <p className="text-xs text-gray-400">Success rate: {offer.successRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-4">No successful offers yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#2A2E39] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Expired Offers</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.expiredOffers.length > 0 ? (
              <div className="space-y-4">
                {stats.expiredOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Timer className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {offer.type === 'buy' ? 'Buy' : 'Sell'} {offer.asset}
                        </p>
                        <p className="text-xs text-gray-400">
                          Expired: {new Date(offer.expiredAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-4">No expired offers</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#2A2E39] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {stats.paymentMethods.map((method) => (
                  <div key={method.method} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-white">{method.method}</p>
                        <p className="text-xs text-gray-400">Used {method.usageCount} times</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-4">No payment methods added</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#2A2E39] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recently Trusted Users</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.trustedUsers.length > 0 ? (
              <div className="space-y-4">
                {stats.trustedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-white">{user.username}</p>
                        <p className="text-xs text-gray-400">{user.tradesCount} trades</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      Last trade: {new Date(user.lastTrade).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-4">No trusted users yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Last Successful Trades */}
      <Card className="bg-[#2A2E39] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Last 5 Successful Trades</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.lastSuccessfulTrades.length > 0 ? (
            <div className="space-y-4">
              {stats.lastSuccessfulTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount} {trade.asset}
                      </p>
                      <p className="text-xs text-gray-400">
                        Completed: {new Date(trade.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-4">No completed trades yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
