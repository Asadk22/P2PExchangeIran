'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { TradeFilter } from '@/components/trade/TradeFilter';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const TRADE_TYPES = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
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

function TradesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    tradeType: 'all',
    assetType: 'all',
    paymentMethod: 'all',
    minAmount: '',
    maxAmount: '',
    page: '1',
  });

  // Update filters based on URL search parameters
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters((prev) => ({
      ...prev,
      ...params,
      page: params.page || '1',
    }));
  }, [searchParams]);

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
      setPagination(
        data.pagination || {
          total: 0,
          page: 1,
          limit: 50,
          pages: 0,
        }
      );
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

  const debouncedFetchTrades = useCallback(debounce(fetchTrades, 500), [fetchTrades]);

  useEffect(() => {
    debouncedFetchTrades();
    return () => debouncedFetchTrades.cancel();
  }, [debouncedFetchTrades]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/trades?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage.toString() }));
  };

  return (
    <main className="flex min-h-screen bg-[#1a1a1a]">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#2a2a2a] bg-[#1f1f1f] p-4">
        <TradeFilter
          onFilterChange={(newFilters) => {
            setFilters((prev) => ({
              ...prev,
              ...newFilters,
              page: '1',
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
              <Card key={trade._id} className="bg-[#242424] hover:bg-[#2a2a2a] transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-full',
                          trade.type === 'buy'
                            ? 'bg-[#00C853]/10 text-[#00C853]'
                            : 'bg-[#FF3D57]/10 text-[#FF3D57]'
                        )}
                      >
                        {trade.type === 'buy' ? 'BUY' : 'SELL'}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{trade.assetType}</h3>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span>Amount: {trade.amount}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => router.push(`/trades/${trade._id}`)}>View</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {pagination.pages > 1 && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1}>
              Previous
            </Button>
            <span>Page {pagination.page}</span>
            <Button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

// Wrap the component in Suspense
export function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TradesPage />
    </Suspense>
  );
}
