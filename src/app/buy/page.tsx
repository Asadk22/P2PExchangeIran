'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  ChevronDown, 
  Globe2, 
  Timer, 
  Shield, 
  Users,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Banknote,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

// Mock exchange rate data
const MOCK_RATES = {
  EUR: { buy: 47800, sell: 47500 },
  USD: { buy: 43500, sell: 43200 },
  GBP: { buy: 55200, sell: 54900 },
};

const MOCK_RECENT_TRADES = [
  { amount: '5,000', from: 'EUR', to: 'IRR', rate: '47,650', time: '2 min ago' },
  { amount: '10,000', from: 'USD', to: 'IRR', rate: '43,400', time: '5 min ago' },
  { amount: '3,000', from: 'GBP', to: 'IRR', rate: '55,100', time: '7 min ago' },
];

// Advanced market data types
interface MarketDepth {
  bids: { price: number; volume: number }[];
  asks: { price: number; volume: number }[];
}

interface PriceAlert {
  currency: string;
  threshold: number;
  direction: 'above' | 'below';
}

interface OrderBook {
  price: number;
  volume: number;
  orders: number;
}

// Mock data for advanced features
const MOCK_MARKET_DEPTH: MarketDepth = {
  bids: [
    { price: 47800, volume: 50000 },
    { price: 47750, volume: 75000 },
    { price: 47700, volume: 100000 },
  ],
  asks: [
    { price: 47850, volume: 45000 },
    { price: 47900, volume: 65000 },
    { price: 47950, volume: 85000 },
  ],
};

const MOCK_ORDER_BOOK: OrderBook[] = [
  { price: 47800, volume: 50000, orders: 12 },
  { price: 47750, volume: 75000, orders: 8 },
  { price: 47700, volume: 100000, orders: 15 },
];

const MOCK_24H_STATS = {
  high: 48200,
  low: 47400,
  volume: 2500000,
  change: 2.3,
};

export default function BuyIranianRial() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1000');
  const [rateProgress, setRateProgress] = useState(0);
  const [showRateAlert, setShowRateAlert] = useState(false);
  const [marketTrend, setMarketTrend] = useState({ trend: 'up', percentage: '2.3' });
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [showDepthChart, setShowDepthChart] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [showAdvancedTrading, setShowAdvancedTrading] = useState(false);

  // Enhanced rate update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRateProgress((prev) => {
        if (prev >= 100) {
          // Simulate rate update
          const variation = (Math.random() - 0.5) * 100;
          const newRate = MOCK_RATES[selectedCurrency].buy + variation;
          MOCK_RATES[selectedCurrency].buy = Math.round(newRate);
          return 0;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCurrency]);

  // Price alert monitoring
  useEffect(() => {
    const checkPriceAlerts = () => {
      const currentPrice = MOCK_RATES[selectedCurrency].buy;
      priceAlerts.forEach(alert => {
        if (
          (alert.direction === 'above' && currentPrice > alert.threshold) ||
          (alert.direction === 'below' && currentPrice < alert.threshold)
        ) {
          setShowRateAlert(true);
        }
      });
    };

    const alertInterval = setInterval(checkPriceAlerts, 5000);
    return () => clearInterval(alertInterval);
  }, [priceAlerts, selectedCurrency]);

  // Calculate IRR amount based on selected currency and amount
  const calculateIRR = () => {
    const rate = MOCK_RATES[selectedCurrency]?.buy || 0;
    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    return new Intl.NumberFormat('en-US').format(rate * numAmount);
  };

  return (
    <div className="min-h-screen bg-[#1C1F26]">
      {/* Enhanced Market Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#2A2F3A] border-b border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {Object.entries(MOCK_RATES).map(([currency, rates]) => (
                <motion.div 
                  key={currency} 
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#363B47] cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-400">{currency}/IRR</span>
                  <span className="text-white font-medium">{rates.buy}</span>
                  <motion.span 
                    className={marketTrend.trend === 'up' ? 'text-green-500' : 'text-red-500'}
                    animate={{ y: marketTrend.trend === 'up' ? -2 : 2 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <TrendingUp className="h-4 w-4" />
                  </motion.span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-24 bg-transparent border-gray-700">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1H</SelectItem>
                  <SelectItem value="24h">24H</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 text-gray-400">
                <Timer className="h-4 w-4" />
                <span>Update in:</span>
                <Progress value={rateProgress} className="w-20 h-2" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Advanced Exchange Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Exchange Calculator</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedTrading(!showAdvancedTrading)}
                  className="text-[#c5f82a] hover:text-[#d4ff33]"
                >
                  {showAdvancedTrading ? 'Simple View' : 'Advanced Trading'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm text-gray-400">You Send</label>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 bg-[#1C1F26] border-gray-700"
                    />
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger className="w-32 bg-[#1C1F26] border-gray-700">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm text-gray-400">You Receive (IRR)</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={calculateIRR()}
                      readOnly
                      className="w-full bg-[#1C1F26] border-gray-700"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      IRR
                    </div>
                  </div>
                </div>
              </div>

              {showAdvancedTrading && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 pt-6 border-t border-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-white">Market Depth</h3>
                      <div className="space-y-2">
                        {MOCK_MARKET_DEPTH.asks.map((ask, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-red-400">{ask.price}</span>
                            <span className="text-gray-400">{ask.volume.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="h-px bg-gray-800 my-2" />
                        {MOCK_MARKET_DEPTH.bids.map((bid, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-green-400">{bid.price}</span>
                            <span className="text-gray-400">{bid.volume.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-white">24h Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-400">24h High</span>
                          <p className="text-white font-medium">{MOCK_24H_STATS.high}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">24h Low</span>
                          <p className="text-white font-medium">{MOCK_24H_STATS.low}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">24h Volume</span>
                          <p className="text-white font-medium">{MOCK_24H_STATS.volume.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">24h Change</span>
                          <p className={`font-medium ${MOCK_24H_STATS.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {MOCK_24H_STATS.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span>Rate: 1 {selectedCurrency} = </span>
                  <span className="text-white font-medium">{MOCK_RATES[selectedCurrency].buy} IRR</span>
                </div>
                <Button className="bg-[#c5f82a] text-black hover:bg-[#d4ff33]">
                  Continue to Buy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Recent Trades Feed */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Recent Trades</h3>
              <div className="space-y-4">
                {MOCK_RECENT_TRADES.map((trade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1C1F26]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#363B47] flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-[#c5f82a]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {trade.amount} {trade.from}
                        </p>
                        <p className="text-sm text-gray-400">Rate: {trade.rate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{trade.time}</p>
                      <div className="flex items-center gap-1 text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs">Completed</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Market Analysis & Tools */}
          <div className="space-y-6">
            {/* Price Alerts */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Price Alerts</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Alert price"
                    className="flex-1 bg-[#1C1F26] border-gray-700"
                  />
                  <Select defaultValue="above">
                    <SelectTrigger className="w-32 bg-[#1C1F26] border-gray-700">
                      <SelectValue placeholder="Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-[#363B47] hover:bg-[#424957]">
                  Add Alert
                  <AlertCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Market Sentiment */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Market Sentiment</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Buyers</span>
                  <span className="text-green-400">65%</span>
                </div>
                <Progress value={65} className="h-2 bg-[#1C1F26]" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sellers</span>
                  <span className="text-red-400">35%</span>
                </div>
                <Progress value={35} className="h-2 bg-[#1C1F26]" />
              </div>
            </Card>

            {/* Trust Indicators */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Trust & Security</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                    <Shield className="h-4 w-4 text-[#c5f82a]" />
                  </div>
                  <div>
                    <p className="text-white">Escrow Protection</p>
                    <p className="text-sm text-gray-400">Your funds are secure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                    <Users className="h-4 w-4 text-[#c5f82a]" />
                  </div>
                  <div>
                    <p className="text-white">Verified Traders</p>
                    <p className="text-sm text-gray-400">KYC verified community</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                    <Globe2 className="h-4 w-4 text-[#c5f82a]" />
                  </div>
                  <div>
                    <p className="text-white">Global Coverage</p>
                    <p className="text-sm text-gray-400">24/7 trading support</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Rate Alert Modal */}
      <AnimatePresence>
        {showRateAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#2A2F3A] p-6 rounded-lg max-w-md w-full mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-[#c5f82a]" />
                <h3 className="text-lg font-medium text-white">Price Alert</h3>
              </div>
              <p className="text-gray-400 mb-6">
                The price has reached your target of {MOCK_RATES[selectedCurrency].buy} IRR
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowRateAlert(false)}
                >
                  Dismiss
                </Button>
                <Button
                  className="bg-[#c5f82a] text-black hover:bg-[#d4ff33]"
                  onClick={() => setShowRateAlert(false)}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
