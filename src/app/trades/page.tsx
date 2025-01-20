'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { debounce } from 'lodash';
import { cn } from '@/lib/utils';
import { TestTrade } from "@/components/test-trade";
import { TradeFilter } from '@/components/trade/TradeFilter';

const TRADE_TYPES = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
];

const CRYPTO_ASSETS = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'USDT', label: 'Tether (USDT)' },
];

const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash_deposit', label: 'Cash Deposit' },
  { value: 'card_to_card', label: 'Card to Card' },
  { value: 'perfect_money', label: 'Perfect Money' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'wise', label: 'Wise (TransferWise)' },
];

interface Trade {
  _id: string;
  type: 'buy' | 'sell';
  assetType: string;
  amount: string;
  price: string;
  paymentMethod: string;
  location: string;
  terms: string;
  seller: {
    _id: string;
    username: string;
    reputation: number;
  };
  status: string;
  createdAt: string;
}

export default function TradesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    pages: 0
  });
  const [filters, setFilters] = useState({
    tradeType: searchParams.get('tradeType') || 'all',
    assetType: searchParams.get('assetType') || 'all',
    paymentMethod: searchParams.get('paymentMethod') || 'all',
    minAmount: searchParams.get('minAmount') || '',
    maxAmount: searchParams.get('maxAmount') || '',
    page: searchParams.get('page') || '1'
  });

  const fetchTrades = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const res = await fetch(`/api/trades?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch trades');
      
      const data = await res.json();
      setTrades(data.trades || []);
      setPagination(data.pagination || {
        total: 0,
        page: 1,
        limit: 50,
        pages: 0
      });
    } catch (error) {
      console.error('Error fetching trades:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch trades',
        variant: 'destructive',
      });
      setTrades([]);
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  // Debounced version of fetchTrades
  const debouncedFetchTrades = useCallback(
    debounce(fetchTrades, 500),
    [fetchTrades]
  );

  useEffect(() => {
    debouncedFetchTrades();
    return () => debouncedFetchTrades.cancel();
  }, [debouncedFetchTrades]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/trades?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage.toString() }));
  };

  return (
    <main className="flex min-h-screen bg-[#1a1a1a]">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#2a2a2a] bg-[#1f1f1f] p-4">
        <TradeFilter
          onFilterChange={(newFilters) => {
            // Update filters and trigger search
            setFilters(prev => ({
              ...prev,
              ...newFilters,
              page: '1' // Reset to first page when filters change
            }));
          }}
          initialFilters={filters}
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 bg-[#1a1a1a]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <p>Loading trades...</p>
          ) : trades.length === 0 ? (
            <p>No trades found</p>
          ) : (
            trades.map((trade) => (
              <Card key={trade._id} className="bg-[#242424] border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors group-hover:shadow-lg">
                {/* Header */}
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        trade.type === 'buy' 
                          ? 'bg-[#00C853]/10 text-[#00C853]' 
                          : 'bg-[#FF3D57]/10 text-[#FF3D57]'
                      )}>
                        {trade.type === 'buy' ? 'BUY' : 'SELL'}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {trade.assetType}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#E4E4E7] text-sm">by</span>
                          <span className="text-[#00C853] text-sm font-medium">
                            {trade.seller?.username || 'Unknown'}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-400">
                            {'★'.repeat(trade.seller?.reputation || 0)}
                            {'☆'.repeat(5 - (trade.seller?.reputation || 0))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        trade.status === 'active' 
                          ? 'bg-[#00C853]/10 text-[#00C853]' 
                          : 'bg-gray-200/10 text-gray-400'
                      )}
                    >
                      {trade.status}
                    </Badge>
                  </div>
                </CardHeader>

                {/* Content */}
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[#E4E4E7] text-sm">Amount</span>
                      <div className="text-white font-semibold">
                        {trade.amount} {trade.assetType}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#E4E4E7] text-sm">Price</span>
                      <div className="text-white font-semibold">
                        {trade.price} IRR
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#E4E4E7] text-sm">Payment Method</span>
                      <div className="text-white font-medium">
                        {trade.paymentMethod}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#E4E4E7] text-sm">Location</span>
                      <div className="text-white font-medium">
                        {trade.location}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="text-[#E4E4E7] text-sm mb-2">Terms</div>
                    <p className="text-white text-sm line-clamp-2">
                      {trade.terms || 'No specific terms provided'}
                    </p>
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter>
                  <Button 
                    className="w-full bg-[#00C853] hover:bg-[#00C853]/90 text-white font-medium py-6 rounded-lg transition-colors group-hover:shadow-lg"
                    onClick={() => router.push(`/trades/${trade._id}`)}
                  >
                    View Trade Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="bg-[#2A2E39] text-white border-[#1E222D] hover:bg-[#1E222D] hover:text-[#00C853]"
            >
              Previous
            </Button>
            <div className="flex items-center px-4 text-white">
              Page {pagination.page} of {pagination.pages}
            </div>
            <Button
              variant="outline"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="bg-[#2A2E39] text-white border-[#1E222D] hover:bg-[#1E222D] hover:text-[#00C853]"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
